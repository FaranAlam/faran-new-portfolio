import { NextRequest, NextResponse } from "next/server";
import { getClientIp, rateLimit, RateLimits } from "@/lib/rate-limit";
import { getAdminAuthCollection, getPrimaryAdmin, normalizeEmail } from "@/lib/admin-auth";
import { hashPassword, validatePasswordStrength } from "@/lib/password";

interface SignupBody {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIp(request);
    const limitResult = rateLimit(`admin-signup:${ip}`, RateLimits.AUTH);

    if (!limitResult.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Too many attempts. Please try again later.",
        },
        {
          status: 429,
          headers: {
            "X-RateLimit-Limit": limitResult.limit.toString(),
            "X-RateLimit-Remaining": limitResult.remaining.toString(),
            "X-RateLimit-Reset": limitResult.reset.toString(),
          },
        }
      );
    }

    const body = (await request.json()) as SignupBody;
    const name = (body.name || "Admin").trim();
    const email = normalizeEmail(body.email);
    const password = body.password || "";
    const confirmPassword = body.confirmPassword || "";

    if (!email || !password || !confirmPassword) {
      return NextResponse.json(
        { success: false, message: "All required fields must be provided" },
        { status: 400 }
      );
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        { success: false, message: "Passwords do not match" },
        { status: 400 }
      );
    }

    const passwordCheck = validatePasswordStrength(password);
    if (!passwordCheck.isValid) {
      return NextResponse.json(
        { success: false, message: passwordCheck.errors[0] || "Weak password" },
        { status: 400 }
      );
    }

    const existingAdmin = await getPrimaryAdmin();
    if (existingAdmin) {
      return NextResponse.json(
        { success: false, message: "Admin account already exists" },
        { status: 409 }
      );
    }

    const passwordHash = await hashPassword(password);
    const adminCollection = await getAdminAuthCollection();
    const now = new Date();

    await adminCollection.insertOne({
      name: name || "Admin",
      email,
      passwordHash,
      role: "admin",
      createdAt: now,
      updatedAt: now,
    });

    return NextResponse.json(
      { success: true, message: "Admin account created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("[ADMIN-SIGNUP] ERROR:", error);
    return NextResponse.json(
      { success: false, message: "Failed to create admin account" },
      { status: 500 }
    );
  }
}
