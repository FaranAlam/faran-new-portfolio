import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { getDatabase } from "@/lib/mongodb";

export async function POST(req: NextRequest) {
  try {
    const { subject, message, sendToAll } = await req.json();

    // Validate input
    if (!subject || !message) {
      return NextResponse.json(
        { success: false, message: "Subject and message are required" },
        { status: 400 }
      );
    }

    // Get all active subscribers
    const db = await getDatabase();
    const subscribersCollection = db.collection("newsletter_subscribers");

    const subscribers = await subscribersCollection
      .find({ status: "active" })
      .toArray();

    if (subscribers.length === 0) {
      return NextResponse.json(
        { success: false, message: "No active subscribers found" },
        { status: 404 }
      );
    }

    // Create email transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Prepare email list
    const emailList = subscribers.map(sub => sub.email);

    // Send bulk email
    console.log(`[BULK-EMAIL] Sending to ${emailList.length} subscribers...`);

    const emailPromises = emailList.map((email) => 
      transporter.sendMail({
        from: {
          name: "Faran Alam - Portfolio",
          address: process.env.EMAIL_USER || "noreply@example.com",
        },
        to: email,
        subject: subject,
        html: `
          <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 28px;">Faran Alam</h1>
              <p style="color: rgba(255,255,255,0.9); margin: 5px 0 0 0;">Full Stack Developer</p>
            </div>
            
            <div style="background: white; padding: 40px; border: 1px solid #e5e7eb;">
              <div style="color: #374151; line-height: 1.6;">
                ${message}
              </div>
            </div>
            
            <div style="background: #f9fafb; padding: 20px; text-align: center; border: 1px solid #e5e7eb; border-top: none;">
              <p style="color: #6b7280; font-size: 14px; margin: 0 0 10px 0;">
                You're receiving this because you subscribed to my newsletter.
              </p>
              <p style="color: #9ca3af; font-size: 12px; margin: 0;">
                © 2024 Faran Alam - Full Stack Developer
              </p>
            </div>
          </div>
        `,
      })
    );

    // Wait for all emails to send
    const results = await Promise.allSettled(emailPromises);

    const successCount = results.filter(r => r.status === "fulfilled").length;
    const failedCount = results.filter(r => r.status === "rejected").length;

    console.log(`[BULK-EMAIL] Sent: ${successCount}, Failed: ${failedCount}`);

    // Log campaign in database (optional)
    const campaignsCollection = db.collection("email_campaigns");
    await campaignsCollection.insertOne({
      subject,
      message,
      recipientCount: emailList.length,
      successCount,
      failedCount,
      sentAt: new Date(),
      sentBy: "admin", // You can pass admin email from request
    });

    return NextResponse.json({
      success: true,
      message: `Email sent to ${successCount} subscribers successfully`,
      stats: {
        total: emailList.length,
        sent: successCount,
        failed: failedCount,
      },
    });
  } catch (error) {
    console.error("[BULK-EMAIL] Error:", error);
    return NextResponse.json(
      { 
        success: false, 
        message: "Failed to send bulk email",
        error: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}
