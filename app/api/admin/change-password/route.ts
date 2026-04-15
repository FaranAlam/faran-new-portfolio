import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { auth } from "@/auth";
import { getAdminAuthCollection } from "@/lib/admin-auth";
import { hashPassword, verifyPassword, validatePasswordStrength } from "@/lib/password";

export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id || session.user.role !== "admin") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { currentPassword, newPassword } = await request.json();

    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { message: "Current and new password are required" },
        { status: 400 }
      );
    }

    const passwordCheck = validatePasswordStrength(newPassword);
    if (!passwordCheck.isValid) {
      return NextResponse.json(
        { message: passwordCheck.errors[0] || "Weak password" },
        { status: 400 }
      );
    }

    const adminCollection = await getAdminAuthCollection();
    const adminFilter = ObjectId.isValid(session.user.id)
      ? { _id: new ObjectId(session.user.id) }
      : { email: session.user.email, role: "admin" as const };

    const admin = await adminCollection.findOne(adminFilter);

    if (!admin) {
      return NextResponse.json({ message: "Admin account not found" }, { status: 404 });
    }

    const isCurrentValid = await verifyPassword(currentPassword, admin.passwordHash);

    if (!isCurrentValid) {
      return NextResponse.json({ message: "Current password is incorrect" }, { status: 400 });
    }

    const newHash = await hashPassword(newPassword);

    await adminCollection.updateOne(
      { _id: admin._id },
      {
        $set: {
          passwordHash: newHash,
          updatedAt: new Date(),
        },
      }
    );

    return NextResponse.json({ message: "Password changed successfully" }, { status: 200 });
  } catch (error) {
    console.error("[ADMIN-CHANGE-PASSWORD] ERROR:", error);
    return NextResponse.json({ message: "Failed to change password" }, { status: 500 });
  }
}
