import { NextRequest, NextResponse } from 'next/server';

// Allowed email domain for IIU students
const ALLOWED_DOMAIN = '@iiu.edu.pk';

// In-memory store for verified emails (in production, use a database)
const verifiedEmails = new Map<string, { timestamp: number; downloadCount: number; downloads: string[] }>();

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    // Validate email format
    if (!email || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      return NextResponse.json(
        { success: false, message: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Check if email has @iiu.edu.pk domain
    if (!email.toLowerCase().endsWith(ALLOWED_DOMAIN.toLowerCase())) {
      return NextResponse.json(
        { success: false, message: `Only ${ALLOWED_DOMAIN} emails are allowed. This is exclusive for IIUI students.` },
        { status: 403 }
      );
    }

    // Verify email (in production, send verification link)
    const normalizedEmail = email.toLowerCase();
    
    // For demo: auto-verify IIU emails
    if (!verifiedEmails.has(normalizedEmail)) {
      verifiedEmails.set(normalizedEmail, {
        timestamp: Date.now(),
        downloadCount: 0,
        downloads: []
      });
    }

    return NextResponse.json(
      {
        success: true,
        message: `Verified! Welcome IIU Student`,
        email: normalizedEmail,
        verified: true
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Email verification error:', error);
    return NextResponse.json(
      { success: false, message: 'Verification failed' },
      { status: 500 }
    );
  }
}

// GET endpoint to check if email is verified
export async function GET(request: NextRequest) {
  try {
    const email = request.nextUrl.searchParams.get('email');

    if (!email) {
      return NextResponse.json(
        { success: false, message: 'Email parameter required' },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase();
    const isVerified = verifiedEmails.has(normalizedEmail);

    return NextResponse.json(
      {
        success: true,
        verified: isVerified,
        email: normalizedEmail,
        ...(isVerified && verifiedEmails.get(normalizedEmail))
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Verification check error:', error);
    return NextResponse.json(
      { success: false, message: 'Check failed' },
      { status: 500 }
    );
  }
}
