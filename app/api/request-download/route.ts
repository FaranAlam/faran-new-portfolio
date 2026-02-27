import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { sendApprovalEmail } from '@/lib/email';
import { 
  saveRequest, 
  getRequest,
  findDuplicateRequest,
  updateRequestStatus,
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
    
    // Generate instant approval token for IIU emails
    const approvalToken = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
    const approvedAt = new Date().toISOString();

    const downloadRequest: DownloadRequest = {
      id: requestId,
      email: email.toLowerCase(),
      resourceId,
      courseSlug,
      fileName,
      requestedAt: new Date().toISOString(),
      status: 'approved', // Instant approval for IIU emails
      approvalToken,
      approvedAt,
      expiresAt: expiresAt.toISOString()
    };

    await saveRequest(downloadRequest);

    // Send approval email with download link
    const downloadLink = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3002'}/api/approved-download?token=${approvalToken}`;
    
    console.log('✅ Instant download approved:', {
      id: requestId,
      email,
      file: `${resourceId}/${courseSlug}/${fileName}`,
      downloadLink,
      expiresAt: expiresAt.toLocaleString()
    });

    // Send approval email to student with download link
    await sendApprovalEmail({
      userEmail: email,
      fileName,
      downloadLink,
      expiresAt: expiresAt.toISOString()
    });

    return NextResponse.json(
      {
        success: true,
        message: '✅ Download approved! Check your email for the download link.',
        requestId,
        status: 'approved',
        downloadLink,
        expiresAt: expiresAt.toISOString()
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
