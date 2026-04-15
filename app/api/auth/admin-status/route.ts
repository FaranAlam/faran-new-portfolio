import { NextResponse } from "next/server";
import { isAdminSetupComplete } from "@/lib/admin-auth";

export async function GET() {
  try {
    const hasDbAdmin = await isAdminSetupComplete();

    return NextResponse.json(
      {
        success: true,
        hasAdmin: hasDbAdmin,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[ADMIN-STATUS] ERROR:", error);
    return NextResponse.json(
      {
        success: false,
        hasAdmin: false,
        message: "Failed to verify admin status",
      },
      { status: 500 }
    );
  }
}
