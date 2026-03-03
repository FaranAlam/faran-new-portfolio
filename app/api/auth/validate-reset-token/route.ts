import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { getDatabase } from "@/lib/mongodb";

export async function POST(req: NextRequest) {
  try {
    const { token } = await req.json();

    if (!token || typeof token !== "string") {
      return NextResponse.json(
        { message: "Invalid token" },
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

    return NextResponse.json(
      { message: "Token is valid", email: tokenData.email },
      { status: 200 }
    );
  } catch (error) {
    console.error("Validate token error:", error);
    return NextResponse.json(
      { message: "Failed to validate token" },
      { status: 500 }
    );
  }
}
