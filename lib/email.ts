import nodemailer from 'nodemailer';

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
