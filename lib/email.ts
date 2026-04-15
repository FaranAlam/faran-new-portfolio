import nodemailer from 'nodemailer';
import { getDatabase } from './db';

/**
 * Email Utility for sending notifications
 * Uses Gmail SMTP (free) or any other email service
 */

// Create reusable transporter
const createTransporter = () => {
  // Check if email configuration exists
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
    console.warn('Email configuration not found in .env.local');
    return null;
  }

  return nodemailer.createTransport({
    service: 'gmail', // You can use 'gmail', 'outlook', 'yahoo', etc.
    auth: {
      user: process.env.EMAIL_USER, // Your email
      pass: process.env.EMAIL_PASSWORD, // App password (not regular password)
    },
  });
};

/**
 * Send email notification when someone submits contact form
 */
export async function sendContactNotification(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
  phone?: string;
}) {
  const transporter = createTransporter();
  
  if (!transporter) {
    console.log('Email not sent - configuration missing');
    return { success: false, error: 'Email configuration missing' };
  }

  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Send to yourself
      subject: `🔔 New Contact Form Submission: ${data.subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">New Contact Form Submission</h2>
          
          <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
            ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ''}
            <p><strong>Subject:</strong> ${data.subject}</p>
          </div>

          <div style="background: white; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
            <h3 style="margin-top: 0;">Message:</h3>
            <p style="white-space: pre-wrap;">${data.message}</p>
          </div>

          <div style="margin-top: 20px; padding: 15px; background: #dbeafe; border-radius: 8px;">
            <p style="margin: 0; font-size: 14px;">
              💡 <strong>Quick Action:</strong> Reply directly to ${data.email}
            </p>
          </div>

          <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
          
          <p style="color: #6b7280; font-size: 12px;">
            This email was sent from your portfolio contact form at ${new Date().toLocaleString()}
          </p>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Contact notification email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Failed to send contact notification:', error);
    return { success: false, error: 'Failed to send email' };
  }
}

/**
 * Send email notification when someone subscribes to newsletter
 */
export async function sendNewsletterNotification(data: {
  email: string;
  source: string;
}) {
  const transporter = createTransporter();
  
  if (!transporter) {
    console.log('Email not sent - configuration missing');
    return { success: false, error: 'Email configuration missing' };
  }

  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Send to yourself
      subject: '📧 New Newsletter Subscription',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">New Newsletter Subscriber! 🎉</h2>
          
          <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
            <p><strong>Source:</strong> ${data.source}</p>
            <p><strong>Subscribed At:</strong> ${new Date().toLocaleString()}</p>
          </div>

          <div style="background: #dbeafe; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0;">
              🎯 <strong>Tip:</strong> You now have a new subscriber to send updates to!
            </p>
          </div>

          <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
          
          <p style="color: #6b7280; font-size: 12px;">
            This notification was sent from your portfolio newsletter subscription form.
          </p>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Newsletter notification email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Failed to send newsletter notification:', error);
    return { success: false, error: 'Failed to send email' };
  }
}

/**
 * Send email notification to admin when a new review is submitted
 */
export async function sendReviewNotification(data: {
  name: string;
  rating: number;
  comment?: string;
  reviewerEmail?: string;
  reviewId: string;
  submittedAt: string;
}) {
  const transporter = createTransporter();

  if (!transporter) {
    console.log('Review notification not sent - email configuration missing');
    return { success: false, error: 'Email configuration missing' };
  }

  let adminEmail = process.env.ADMIN_EMAIL || process.env.EMAIL_USER;

  try {
    const db = await getDatabase();
    const profile = await db.collection('admin_profile').findOne(
      { reviewNotificationEmail: { $exists: true, $ne: '' } },
      { sort: { updatedAt: -1 } }
    );

    if (profile?.reviewNotificationEmail) {
      adminEmail = profile.reviewNotificationEmail;
    }
  } catch (error) {
    console.warn('Review notification email lookup failed, using environment fallback:', error);
  }

  if (!adminEmail) {
    console.log('Review notification not sent - admin email missing');
    return { success: false, error: 'Admin email missing' };
  }

  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const stars = '★'.repeat(Math.max(1, Math.min(5, data.rating)));

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: adminEmail,
      subject: `⭐ New Website Review (${data.rating}/5) - ${data.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 640px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); color: white; padding: 24px; border-radius: 10px 10px 0 0;">
            <h2 style="margin: 0;">New Review Received</h2>
            <p style="margin: 8px 0 0; opacity: 0.95;">A visitor submitted a review on your website.</p>
          </div>

          <div style="background: #f9fafb; padding: 24px; border-radius: 0 0 10px 10px;">
            <div style="background: white; padding: 18px; border-radius: 8px; border-left: 4px solid #2563eb;">
              <p style="margin: 0 0 8px;"><strong>Name:</strong> ${data.name}</p>
              <p style="margin: 0 0 8px;"><strong>Rating:</strong> ${data.rating}/5 (${stars})</p>
              <p style="margin: 0 0 8px;"><strong>Reviewer Email:</strong> ${data.reviewerEmail || 'Not provided'}</p>
              <p style="margin: 0 0 8px;"><strong>Submitted At:</strong> ${new Date(data.submittedAt).toLocaleString('en-US')}</p>
              <p style="margin: 0;"><strong>Review ID:</strong> <span style="font-family: monospace; font-size: 12px;">${data.reviewId}</span></p>
            </div>

            <div style="margin-top: 16px; background: white; padding: 18px; border: 1px solid #e5e7eb; border-radius: 8px;">
              <p style="margin-top: 0;"><strong>Comment:</strong></p>
              <p style="white-space: pre-wrap; color: #374151; margin-bottom: 0;">${data.comment || 'No comment provided.'}</p>
            </div>

            <div style="text-align: center; margin-top: 24px;">
              <a href="${baseUrl}/admin/dashboard/reviews"
                 style="display: inline-block; background: #2563eb; color: white; padding: 12px 26px; text-decoration: none; border-radius: 8px; font-weight: 600;">
                Review in Admin Dashboard
              </a>
            </div>
          </div>
        </div>
      `,
      text: `
NEW REVIEW RECEIVED

Name: ${data.name}
Rating: ${data.rating}/5
Reviewer Email: ${data.reviewerEmail || 'Not provided'}
Submitted At: ${new Date(data.submittedAt).toLocaleString()}
Review ID: ${data.reviewId}

Comment:
${data.comment || 'No comment provided.'}

Moderate now:
${baseUrl}/admin/dashboard/reviews
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Review notification sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Failed to send review notification:', error);
    return { success: false, error };
  }
}

/**
 * Send welcome email to new newsletter subscriber
 */
export async function sendWelcomeEmail(subscriberEmail: string) {
  const transporter = createTransporter();
  
  if (!transporter) {
    console.log('Email not sent - configuration missing');
    return { success: false, error: 'Email configuration missing' };
  }

  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: subscriberEmail, // Send to the subscriber
      subject: '✨ Welcome to My Newsletter!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #2563eb; text-align: center;">Welcome! 🎉</h1>
          
          <p style="font-size: 16px;">Hi there!</p>
          
          <p style="font-size: 16px;">
            Thank you for subscribing to my newsletter! I'm excited to have you here.
          </p>

          <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0;">What to expect:</h3>
            <ul style="line-height: 1.8;">
              <li>📚 Weekly tutorials on web development</li>
              <li>🚀 Updates on my latest projects</li>
              <li>💡 Coding tips and tricks</li>
              <li>🎯 Industry insights and best practices</li>
            </ul>
          </div>

          <p style="font-size: 16px;">
            I'll be sharing valuable content that I think you'll find helpful. 
            Stay tuned for the first newsletter!
          </p>

          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3005'}" 
               style="background: #2563eb; color: white; padding: 12px 30px; 
                      text-decoration: none; border-radius: 6px; display: inline-block;">
              Visit My Portfolio
            </a>
          </div>

          <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
          
          <p style="color: #6b7280; font-size: 12px;">
            You're receiving this because you subscribed to the newsletter. 
            Don't want these emails? You can unsubscribe anytime.
          </p>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Welcome email sent to subscriber:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Failed to send welcome email:', error);
    return { success: false, error: 'Failed to send email' };
  }
}

/**
 * Send email notification to admin when user requests download
 */
export async function sendAdminNotification(data: {
  adminEmail: string;
  userEmail: string;
  fileName: string;
  courseSlug: string;
  resourceId: string;
  requestId: string;
  requestedAt: string;
}) {
  const transporter = createTransporter();
  
  if (!transporter) {
    console.log('Admin notification not sent - email configuration missing');
    return { success: false, error: 'Email configuration missing' };
  }

  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: data.adminEmail,
      subject: `📩 New Download Request - ${data.fileName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="margin: 0; font-size: 28px;">📩 New Download Request</h1>
            <p style="margin: 10px 0 0; opacity: 0.9;">A student needs your approval</p>
          </div>
          
          <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px;">
            <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #667eea;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #4b5563;">Student Email:</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #1f2937;">${data.userEmail}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #4b5563;">File Requested:</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #1f2937;">${data.fileName}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #4b5563;">Course/Topic:</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #1f2937;">${data.courseSlug.replace(/-/g, ' ')}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #4b5563;">Category:</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #1f2937;">${data.resourceId}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #4b5563;">Request Time:</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #1f2937;">${new Date(data.requestedAt).toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'short' })}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; font-weight: bold; color: #4b5563;">Request ID:</td>
                  <td style="padding: 10px 0; color: #1f2937; font-family: monospace; font-size: 11px;">${data.requestId}</td>
                </tr>
              </table>
            </div>

            <div style="text-align: center; margin: 30px 0;">
              <p style="color: #4b5563; margin-bottom: 15px; font-size: 14px;">
                <strong>⚡ Action Required:</strong> Review this request in your admin dashboard
              </p>
              <a href="${process.env.NEXT_PUBLIC_BASE_URL}/admin/requests" 
                 style="display: inline-block; background: #667eea; color: white; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: bold;">
                View All Requests →
              </a>
            </div>

            <div style="background: #fef3c7; padding: 15px; border-radius: 6px; border-left: 3px solid #f59e0b;">
              <p style="margin: 0; color: #92400e; font-size: 13px;">
                <strong>💡 Quick Tip:</strong> Approve or reject requests directly from the admin dashboard with one click!
              </p>
            </div>
          </div>
          
          <div style="text-align: center; margin-top: 20px; color: #6b7280; font-size: 12px;">
            <p>IIUI Students Resource Portal - Automated Notification</p>
            <p style="margin-top: 5px;">Managed by Faran Alam</p>
          </div>
        </div>
      `,
      text: `
NEW DOWNLOAD REQUEST

Student Email: ${data.userEmail}
File Requested: ${data.fileName}
Course/Topic: ${data.courseSlug}
Category: ${data.resourceId}
Request Time: ${new Date(data.requestedAt).toLocaleString()}
Request ID: ${data.requestId}

View and approve/reject in admin dashboard:
${process.env.NEXT_PUBLIC_BASE_URL}/admin/requests
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Admin notification sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Failed to send admin notification:', error);
    return { success: false, error };
  }
}

/**
 * Send approval email with download link to user
 */
export async function sendApprovalEmail(data: {
  userEmail: string;
  fileName: string;
  downloadLink: string;
  expiresAt: string;
}) {
  const transporter = createTransporter();
  
  if (!transporter) {
    console.log('Approval email not sent - email configuration missing');
    return { success: false, error: 'Email configuration missing' };
  }

  try {
    const expiryDate = new Date(data.expiresAt);
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: data.userEmail,
      subject: `✅ Download Approved - ${data.fileName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 40px; text-align: center; border-radius: 10px 10px 0 0;">
            <div style="font-size: 56px; margin-bottom: 10px;">✅</div>
            <h1 style="margin: 0; font-size: 28px;">Download Approved!</h1>
            <p style="margin: 10px 0 0; opacity: 0.9; font-size: 16px;">Your file is ready to download</p>
          </div>
          
          <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px;">
            <p style="font-size: 16px; color: #1f2937; text-align: center; margin-top: 0;">
              🎉 Great news! Your download request has been <strong>approved</strong> by the admin.
            </p>

            <div style="background: white; padding: 25px; border-radius: 10px; text-align: center; margin: 20px 0; border: 2px solid #10b981;">
              <p style="font-size: 13px; color: #6b7280; margin: 0 0 5px 0; text-transform: uppercase; letter-spacing: 1px;">Your File</p>
              <h2 style="color: #1f2937; margin: 10px 0 20px; font-size: 20px;">${data.fileName}</h2>
              <a href="${data.downloadLink}" 
                 style="display: inline-block; background: #10b981; color: white; padding: 16px 48px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px;">
                📥 Download Now
              </a>
            </div>

            <div style="background: #fef3c7; padding: 18px; border-radius: 8px; border-left: 4px solid #f59e0b; margin: 20px 0;">
              <p style="margin: 0; color: #92400e; font-size: 14px; line-height: 1.6;">
                <strong>⏰ Important:</strong> This download link will expire on<br>
                <strong style="font-size: 15px;">${expiryDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</strong> at 
                <strong style="font-size: 15px;">${expiryDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</strong>
              </p>
            </div>

            <div style="background: #dbeafe; padding: 15px; border-radius: 6px; text-align: center;">
              <p style="margin: 0; color: #1e40af; font-size: 13px;">
                Need more resources? Browse our complete collection of study materials!
              </p>
              <a href="${process.env.NEXT_PUBLIC_BASE_URL}/#free-resources" 
                 style="display: inline-block; margin-top: 10px; color: #2563eb; text-decoration: none; font-weight: bold;">
                Explore Resources →
              </a>
            </div>
          </div>
          
          <div style="text-align: center; margin-top: 20px; color: #6b7280; font-size: 12px;">
            <p>IIUI Students Resource Portal</p>
            <p style="margin-top: 5px;">Managed by Faran Alam - Supporting IIUI Students 💙</p>
            <p style="margin-top: 10px;">
              <a href="${process.env.NEXT_PUBLIC_BASE_URL}" style="color: #667eea; text-decoration: none;">Visit Portfolio</a>
            </p>
          </div>
        </div>
      `,
      text: `
✅ DOWNLOAD REQUEST APPROVED!

Your download request for "${data.fileName}" has been approved!

Download Link: ${data.downloadLink}

⚠️ IMPORTANT: This link will expire on ${expiryDate.toLocaleString()}

Download your file before it expires. If you need more resources, visit:
${process.env.NEXT_PUBLIC_BASE_URL}/#free-resources

Thank you for using IIUI Students Resource Portal!
Managed by Faran Alam
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Approval email sent to user:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Failed to send approval email:', error);
    return { success: false, error };
  }
}

/**
 * Send rejection email to user
 */
export async function sendRejectionEmail(data: {
  userEmail: string;
  fileName: string;
  courseSlug: string;
}) {
  const transporter = createTransporter();
  
  if (!transporter) {
    console.log('Rejection email not sent - email configuration missing');
    return { success: false, error: 'Email configuration missing' };
  }

  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: data.userEmail,
      subject: `Request Update - ${data.fileName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="margin: 0; font-size: 26px;">Request Update</h1>
            <p style="margin: 10px 0 0; opacity: 0.9;">About your download request</p>
          </div>
          
          <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px;">
            <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #ef4444; margin-bottom: 20px;">
              <p style="color: #1f2937; font-size: 15px; line-height: 1.7; margin: 0;">
                We're unable to approve your request for <strong>"${data.fileName}"</strong> from 
                <strong>${data.courseSlug.replace(/-/g, ' ')}</strong> at this time.
              </p>
            </div>

            <div style="background: #dbeafe; padding: 20px; border-radius: 8px; border-left: 4px solid #3b82f6; margin: 20px 0;">
              <h3 style="color: #1f2937; margin-top: 0; font-size: 16px;">💡 What You Can Do:</h3>
              <ul style="color: #1f2937; margin: 5px 0; padding-left: 20px; line-height: 1.8;">
                <li>Contact the admin for more information</li>
                <li>Request a different file that might be available</li>
                <li>Verify your IIUI email is correct (@iiu.edu.pk)</li>
                <li>Browse other available resources</li>
              </ul>
            </div>

            <div style="text-align: center; margin: 25px 0;">
              <a href="${process.env.NEXT_PUBLIC_BASE_URL}/#free-resources" 
                 style="display: inline-block; background: #667eea; color: white; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: bold;">
                Browse Other Resources
              </a>
            </div>

            <div style="background: #f3f4f6; padding: 15px; border-radius: 6px; text-align: center;">
              <p style="margin: 0; color: #4b5563; font-size: 13px;">
                <strong>Need Help?</strong> Contact the admin at <a href="mailto:${process.env.ADMIN_EMAIL}" style="color: #667eea; text-decoration: none;">${process.env.ADMIN_EMAIL}</a>
              </p>
            </div>
          </div>
          
          <div style="text-align: center; margin-top: 20px; color: #6b7280; font-size: 12px;">
            <p>IIUI Students Resource Portal</p>
            <p style="margin-top: 5px;">Managed by Faran Alam</p>
          </div>
        </div>
      `,
      text: `
REQUEST UPDATE

Your request for "${data.fileName}" from ${data.courseSlug} could not be approved at this time.

What you can do:
- Contact admin for more information (${process.env.ADMIN_EMAIL})
- Request a different file
- Verify your @iiu.edu.pk email
- Browse other resources

Visit: ${process.env.NEXT_PUBLIC_BASE_URL}/#free-resources

IIUI Students Resource Portal - Managed by Faran Alam
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Rejection email sent to user:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Failed to send rejection email:', error);
    return { success: false, error };
  }
}
