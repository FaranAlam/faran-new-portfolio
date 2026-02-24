import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';
import { sendContactNotification } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const { name, email, message } = body;
    
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Connect to database
    const db = await getDatabase();
    
    // Insert contact message
    const result = await db.collection('contacts').insertOne({
      name,
      email,
      message,
      phone: body.phone || null,
      subject: body.subject || null,
      createdAt: new Date(),
      read: false,
      replied: false,
    });

    // Send email notification (non-blocking)
    sendContactNotification({
      name,
      email,
      message,
      subject: body.subject || 'No Subject',
      phone: body.phone,
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
