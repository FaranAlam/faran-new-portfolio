import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';
import { sendNewsletterNotification, sendWelcomeEmail } from '@/lib/email';

/**
 * Newsletter Subscription API
 * Handles email subscriptions to the newsletter
 */

// POST /api/newsletter - Subscribe to newsletter
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, source } = body;

    // 1. Validation: Email required
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // 2. Validation: Email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // 3. Connect to database
    const db = await getDatabase();
    const collection = db.collection('newsletter_subscribers');

    // 4. Check if email already subscribed
    const existingSubscriber = await collection.findOne({ 
      email: email.toLowerCase() 
    });

    if (existingSubscriber) {
      // If already subscribed and active
      if (existingSubscriber.active) {
        return NextResponse.json(
          { error: 'This email is already subscribed' },
          { status: 400 }
        );
      } else {
        // If previously unsubscribed, reactivate
        await collection.updateOne(
          { email: email.toLowerCase() },
          { 
            $set: { 
              active: true,
              resubscribedAt: new Date()
            } 
          }
        );
        return NextResponse.json({
          success: true,
          message: 'Welcome back! Your subscription has been reactivated.',
        });
      }
    }

    // 5. Insert new subscriber
    const result = await collection.insertOne({
      email: email.toLowerCase(),
      subscribedAt: new Date(),
      active: true,
      source: source || 'website',
      verified: false, // For future email verification feature
    });

    // 6. Send email notifications (non-blocking)
    sendNewsletterNotification({
      email: email.toLowerCase(),
      source: source || 'website',
    }).catch(err => console.error('Notification email failed:', err));

    sendWelcomeEmail(email.toLowerCase())
      .catch(err => console.error('Welcome email failed:', err));

    // 7. Return success response
    return NextResponse.json({
      success: true,
      message: 'Successfully subscribed to newsletter!',
      id: result.insertedId,
    });

  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      { error: 'Failed to subscribe. Please try again later.' },
      { status: 500 }
    );
  }
}

// GET /api/newsletter - Get all subscribers (for admin)
export async function GET(request: NextRequest) {
  try {
    const db = await getDatabase();
    const subscribers = await db
      .collection('newsletter_subscribers')
      .find({ active: true })
      .sort({ subscribedAt: -1 })
      .toArray();

    return NextResponse.json({
      success: true,
      count: subscribers.length,
      subscribers,
    });
  } catch (error) {
    console.error('Failed to fetch subscribers:', error);
    return NextResponse.json(
      { error: 'Failed to fetch subscribers' },
      { status: 500 }
    );
  }
}
