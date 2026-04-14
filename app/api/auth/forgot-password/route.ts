import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import crypto from "crypto";
import { getDatabase } from "@/lib/mongodb";

function normalizeEmail(value: string | undefined | null) {
  return (value || "").trim().toLowerCase();
}

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    const requestedEmail = normalizeEmail(email);
    const adminEmail = normalizeEmail(process.env.ADMIN_EMAIL);

    // Validate email
    if (!requestedEmail) {
      return NextResponse.json(
        { message: "Invalid email address" },
        { status: 400 }
      );
    }

    // Check if email is admin email
    if (requestedEmail !== adminEmail) {
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

    await resetTokensCollection.deleteMany({ email: requestedEmail });
    await resetTokensCollection.insertOne({
      tokenHash,
      email: requestedEmail,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      createdAt: new Date(),
    });

    const smtpUser = normalizeEmail(process.env.EMAIL_USER);
    const smtpPassword = (process.env.EMAIL_PASSWORD || "").replace(/\s+/g, "").trim();
    const canSendEmail = Boolean(smtpUser && smtpPassword);
    let emailDelivered = false;

    const resetUrl = `${process.env.NEXTAUTH_URL || "http://localhost:3000"}/admin/reset-password/${resetToken}`;

    if (canSendEmail) {
      try {
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: smtpUser,
            pass: smtpPassword,
          },
        });

        await transporter.verify();

        const mailResult = await transporter.sendMail({
          from: smtpUser,
          to: requestedEmail,
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

        emailDelivered = Boolean(mailResult.messageId);
      } catch (mailError) {
        console.error("[FORGOT-PASSWORD] Email delivery failed:", mailError);
      }
    } else {
      console.warn("[FORGOT-PASSWORD] EMAIL_USER or EMAIL_PASSWORD not configured. Using fallback response.");
    }

    return NextResponse.json(
      {
        message: emailDelivered
          ? "Reset link has been sent to your email"
          : "Reset link generated successfully. Email delivery is not configured, so use the link below.",
        resetUrl: !emailDelivered ? resetUrl : undefined,
        emailDelivered,
      },
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
