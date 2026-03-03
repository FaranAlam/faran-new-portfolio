import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';
import { sendContactNotification } from '@/lib/email';
import { ObjectId } from 'mongodb';
import { rateLimit, getClientIp, RateLimits } from '@/lib/rate-limit';
import { sanitizeContactForm } from '@/lib/sanitization';

export async function POST(request: NextRequest) {
  try {
    // Rate limiting check
    const clientIp = getClientIp(request);
    const rateLimitResult = rateLimit(clientIp, RateLimits.CONTACT);

    if (!rateLimitResult.success) {
      return NextResponse.json(
        { 
          error: 'Too many requests. Please try again later.',
          resetTime: new Date(rateLimitResult.reset).toISOString()
        },
        { 
          status: 429,
          headers: {
            'X-RateLimit-Limit': rateLimitResult.limit.toString(),
            'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
            'X-RateLimit-Reset': rateLimitResult.reset.toString(),
          }
        }
      );
    }

    const body = await request.json();
    
    // Sanitize and validate input
    const sanitizedData = sanitizeContactForm(body);
    
    if (!sanitizedData) {
      return NextResponse.json(
        { error: 'Invalid input data. Please check all fields.' },
        { status: 400 }
      );
    }

    const { name, email, message, phone, subject } = sanitizedData;

    // Connect to database
    const db = await getDatabase();
    
    // Insert contact message
    const result = await db.collection('contacts').insertOne({
      name,
      email,
      message,
      phone: phone || null,
      subject: subject || null,
      createdAt: new Date(),
      read: false,
      replied: false,
    });

    // Send email notification (non-blocking)
    sendContactNotification({
      name,
      email,
      message,
      subject: subject || 'No Subject',
      phone: phone || undefined,
    }).catch(err => console.error('Email notification failed:', err));

    return NextResponse.json({
      success: true,
      message: 'Message sent successfully!',
      id: result.insertedId,
    });

  } catch (error) {
    console.error('Contact API Error:', error);
    return NextResponse.json(
      { error: 'Failed to send message. Please try again.' },
      { status: 500 }
    );
  }
}

// GET endpoint to retrieve messages (for admin dashboard)
export async function GET(request: NextRequest) {
  try {
    const db = await getDatabase();
    
    const messages = await db
      .collection('contacts')
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({
      success: true,
      messages,
    });

  } catch (error) {
    console.error('Get Messages Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch messages' },
      { status: 500 }
    );
  }
}

// PATCH endpoint to update message status (for admin dashboard)
export async function PATCH(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const messageId = url.pathname.split('/').pop();

    if (!messageId || messageId === 'contact') {
      return NextResponse.json(
        { error: 'Message ID required' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { read, replied } = body;

    if (read === undefined && replied === undefined) {
      return NextResponse.json(
        { error: 'No fields to update' },
        { status: 400 }
      );
    }

    const db = await getDatabase();
    const updateData: any = {};
    
    if (read !== undefined) updateData.read = read;
    if (replied !== undefined) updateData.replied = replied;

    const result = await db.collection('contacts').updateOne(
      { _id: new ObjectId(messageId) },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: 'Message not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Message updated successfully',
    });

  } catch (error) {
    console.error('Update Message Error:', error);
    return NextResponse.json(
      { error: 'Failed to update message' },
      { status: 500 }
    );
  }
}
