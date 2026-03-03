import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { hashPassword } from "@/lib/password";
import { getDatabase } from "@/lib/mongodb";
import { readFile, writeFile } from "fs/promises";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const { token, password } = await req.json();

    // Validate inputs
    if (!token || !password) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    if (typeof password !== "string") {
      return NextResponse.json(
        { message: "Invalid password" },
        { status: 400 }
      );
    }

    // Hash the token to check against stored hash
    const tokenHash = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    const db = await getDatabase();
    const resetTokensCollection = db.collection("password_reset_tokens");
    const tokenData = await resetTokensCollection.findOne({ tokenHash });

    if (!tokenData) {
      return NextResponse.json(
        { message: "Invalid or expired token" },
        { status: 400 }
      );
    }

    // Check if token has expired
    if (new Date(tokenData.expiresAt).getTime() < Date.now()) {
      await resetTokensCollection.deleteOne({ tokenHash });
      return NextResponse.json(
        { message: "Token has expired" },
        { status: 400 }
      );
    }

    // Validate password strength
    if (password.length < 8) {
      return NextResponse.json(
        { message: "Password must be at least 8 characters" },
        { status: 400 }
      );
    }

    if (!/[A-Z]/.test(password)) {
      return NextResponse.json(
        { message: "Password must contain at least one uppercase letter" },
        { status: 400 }
      );
    }

    if (!/[a-z]/.test(password)) {
      return NextResponse.json(
        { message: "Password must contain at least one lowercase letter" },
        { status: 400 }
      );
    }

    if (!/[0-9]/.test(password)) {
      return NextResponse.json(
        { message: "Password must contain at least one number" },
        { status: 400 }
      );
    }

    // Hash the new password
    const hashedPassword = await hashPassword(password);

    // Update runtime environment variable
    process.env.ADMIN_PASSWORD_HASH = hashedPassword;

    // Persist for next server restart (.env.local)
    const envPath = path.join(process.cwd(), ".env.local");
    const envContent = await readFile(envPath, "utf-8");
    const escapedHash = hashedPassword.replace(/\$/g, "\\$");

    const updatedEnv = /^ADMIN_PASSWORD_HASH=.*/m.test(envContent)
      ? envContent.replace(/^ADMIN_PASSWORD_HASH=.*/m, `ADMIN_PASSWORD_HASH=${escapedHash}`)
      : `${envContent.trim()}\nADMIN_PASSWORD_HASH=${escapedHash}\n`;

    await writeFile(envPath, updatedEnv, "utf-8");

    // Delete the used token
    await resetTokensCollection.deleteOne({ tokenHash });

    // Log the action (in production, log to database)
    console.log(`Password reset for ${tokenData.email} at ${new Date().toISOString()}`);

    return NextResponse.json(
      { message: "Password reset successful" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Reset password error:", error);
    return NextResponse.json(
      { message: "Failed to reset password" },
      { status: 500 }
    );
  }
}
