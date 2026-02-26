import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { sendAdminNotification } from '@/lib/email';
import { 
  saveRequest, 
  getRequest,
  findDuplicateRequest,
  DownloadRequest 
} from '@/lib/storage';

export async function POST(request: NextRequest) {
  try {
    const { email, resourceId, courseSlug, fileName } = await request.json();

    // Validate inputs
    if (!email || !resourceId || !courseSlug || !fileName) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Verify email domain (only @iiu.edu.pk)
    if (!email.toLowerCase().endsWith('@iiu.edu.pk')) {
      return NextResponse.json(
        { success: false, message: 'Only IIU student emails allowed' },
        { status: 403 }
      );
    }

    // Check if request already exists and is pending/approved
    const existingRequest = await findDuplicateRequest(
      email.toLowerCase(),
      resourceId,
      courseSlug,
      fileName,
      ['pending', 'approved']
    );

    if (existingRequest) {
      if (existingRequest.status === 'approved') {
        return NextResponse.json(
          {
            success: true,
            message: 'Request already approved! Check your email for download link.',
            status: 'approved'
          },
          { status: 200 }
        );
      }
      return NextResponse.json(
        {
          success: true,
          message: 'Your request is pending admin approval. Please wait for email.',
          status: 'pending'
        },
        { status: 200 }
      );
    }

    // Create new request
    const requestId = crypto.randomUUID();
    const downloadRequest: DownloadRequest = {
      id: requestId,
      email: email.toLowerCase(),
      resourceId,
      courseSlug,
      fileName,
      requestedAt: new Date().toISOString(),
      status: 'pending'
    };

    await saveRequest(downloadRequest);

    // Send email notification to admin
    console.log('📩 New download request:', {
      id: requestId,
      email,
      file: `${resourceId}/${courseSlug}/${fileName}`,
      time: new Date().toLocaleString()
    });

    // Send email to admin
    const adminEmail = process.env.ADMIN_EMAIL || 'faran.bsce40@iiu.edu.pk';
    await sendAdminNotification({
      adminEmail,
      userEmail: email,
      fileName,
      courseSlug,
      resourceId,
      requestId,
      requestedAt: downloadRequest.requestedAt
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Download request submitted! Admin will review and send approval email.',
        requestId,
        status: 'pending'
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Request submission error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to submit request' },
      { status: 500 }
    );
  }
}

// GET endpoint to check request status
export async function GET(request: NextRequest) {
  try {
    const email = request.nextUrl.searchParams.get('email');
    const requestId = request.nextUrl.searchParams.get('requestId');

    if (requestId) {
      const req = await getRequest(requestId);
      if (!req) {
        return NextResponse.json(
          { success: false, message: 'Request not found' },
          { status: 404 }
        );
      }
      return NextResponse.json(
        { success: true, request: req },
        { status: 200 }
      );
    }

    if (email) {
      // Import getRequests to get all and filter
      const { getRequests } = await import('@/lib/storage');
      const allRequests = await getRequests();
      const userRequests = allRequests.filter(
        (req) => req.email.toLowerCase() === email.toLowerCase()
      );
      return NextResponse.json(
        { success: true, requests: userRequests },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { success: false, message: 'Email or requestId required' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Status check error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to check status' },
      { status: 500 }
    );
  }
}
