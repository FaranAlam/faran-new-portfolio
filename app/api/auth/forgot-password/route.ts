import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import crypto from "crypto";
import { getDatabase } from "@/lib/mongodb";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    // Validate email
    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { message: "Invalid email address" },
        { status: 400 }
      );
    }

    // Check if email is admin email
    const adminEmail = process.env.ADMIN_EMAIL;
    if (email !== adminEmail) {
      // Don't reveal if email exists for security
      return NextResponse.json(
        { message: "If email exists, a reset link has been sent" },
        { status: 200 }
      );
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const tokenHash = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    // Store token with 24 hour expiration in MongoDB
    const db = await getDatabase();
    const resetTokensCollection = db.collection("password_reset_tokens");

    await resetTokensCollection.createIndex({ tokenHash: 1 }, { unique: true });
    await resetTokensCollection.createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 });

    await resetTokensCollection.deleteMany({ email });
    await resetTokensCollection.insertOne({
      tokenHash,
      email,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      createdAt: new Date(),
    });

    // Send email
    console.log("[FORGOT-PASSWORD] Creating email transporter...");
    console.log("[FORGOT-PASSWORD] EMAIL_USER:", process.env.EMAIL_USER);
    console.log("[FORGOT-PASSWORD] EMAIL_PASSWORD present:", !!process.env.EMAIL_PASSWORD);
    console.log("[FORGOT-PASSWORD] NEXTAUTH_URL:", process.env.NEXTAUTH_URL);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Verify connection
    console.log("[FORGOT-PASSWORD] Verifying transporter connection...");
    try {
      await transporter.verify();
      console.log("[FORGOT-PASSWORD] Transporter verified successfully");
    } catch (verifyError) {
      console.error("[FORGOT-PASSWORD] Transporter verification failed:", verifyError);
      throw verifyError;
    }

    const resetUrl = `${process.env.NEXTAUTH_URL || "http://localhost:3000"}/admin/reset-password/${resetToken}`;

    console.log("[FORGOT-PASSWORD] Sending email to:", email);
    console.log("[FORGOT-PASSWORD] Reset URL:", resetUrl);

    const mailResult = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset - Faran Alam Admin Panel",
      html: `
        <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
          <h1 style="color: #2563eb; margin-bottom: 20px;">Password Reset Request</h1>
          
          <p style="color: #374151; margin-bottom: 20px;">
            You requested to reset your password. Click the link below to create a new password:
          </p>
          
          <a href="${resetUrl}" style="display: inline-block; background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin-bottom: 20px;">
            Reset Password
          </a>
          
          <p style="color: #6b7280; font-size: 14px; margin-bottom: 20px;">
            Or copy and paste this link in your browser:
          </p>
          
          <p style="color: #2563eb; word-break: break-all; background-color: #f3f4f6; padding: 10px; border-radius: 4px; margin-bottom: 20px;">
            ${resetUrl}
          </p>
          
          <p style="color: #6b7280; font-size: 14px; margin-bottom: 20px;">
            This link will expire in 24 hours.
          </p>
          
          <p style="color: #6b7280; font-size: 14px;">
            If you didn't request this, you can safely ignore this email.
          </p>
          
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
          
          <p style="color: #9ca3af; font-size: 12px;">
            © 2024 Faran Alam - Admin Panel
          </p>
        </div>
      `,
    });

    console.log("[FORGOT-PASSWORD] Email sent successfully:", mailResult.messageId);

    return NextResponse.json(
      { message: "Reset link has been sent to your email" },
      { status: 200 }
    );
  } catch (error) {
    console.error("[FORGOT-PASSWORD] ERROR:", error);
    if (error instanceof Error) {
      console.error("[FORGOT-PASSWORD] Error message:", error.message);
      console.error("[FORGOT-PASSWORD] Error stack:", error.stack);
    }
    return NextResponse.json(
      { message: "Failed to process reset request", error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
