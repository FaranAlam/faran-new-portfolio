import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { sendApprovalEmail, sendRejectionEmail } from '@/lib/email';
import { 
  getRequest,
  getRequests,
  updateRequestStatus,
  DownloadRequest 
} from '@/lib/storage';

export async function POST(request: NextRequest) {
  try {
    const { requestId, action, adminEmail } = await request.json();

    // Validate admin
    const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'faran.bsce40@iiu.edu.pk';
    if (adminEmail !== ADMIN_EMAIL) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 403 }
      );
    }

    if (!requestId || !action) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }

    const req = await getRequest(requestId);
    if (!req) {
      return NextResponse.json(
        { success: false, message: 'Request not found' },
        { status: 404 }
      );
    }

    if (action === 'approve') {
      // Generate approval token
      const approvalToken = crypto.randomBytes(32).toString('hex');
      const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

      const approvedAt = new Date().toISOString();

      await updateRequestStatus(requestId, 'approved', {
        approvalToken,
        approvedAt,
        expiresAt: expiresAt.toISOString()
      });

      // Send approval email to user with download link
      const downloadLink = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3002'}/api/approved-download?token=${approvalToken}`;
      
      console.log('✅ Request approved:', {
        id: requestId,
        user: req.email,
        file: req.fileName,
        downloadLink,
        expiresAt
      });

      // Send email to user
      await sendApprovalEmail({
        userEmail: req.email,
        fileName: req.fileName,
        downloadLink,
        expiresAt: expiresAt.toISOString()
      });

      return NextResponse.json(
        {
          success: true,
          message: 'Request approved! User will receive email with download link.',
          downloadLink,
          expiresAt: expiresAt.toISOString()
        },
        { status: 200 }
      );
    }

    if (action === 'reject') {
      await updateRequestStatus(requestId, 'rejected');

      console.log('❌ Request rejected:', {
        id: requestId,
        user: req.email,
        file: req.fileName
      });

      // Send rejection email to user
      await sendRejectionEmail({
        userEmail: req.email,
        fileName: req.fileName,
        courseSlug: req.courseSlug
      });

      return NextResponse.json(
        {
          success: true,
          message: 'Request rejected. User will be notified.'
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { success: false, message: 'Invalid action' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Approval error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to process approval' },
      { status: 500 }
    );
  }
}

// GET endpoint to view all pending requests (admin only)
export async function GET(request: NextRequest) {
  try {
    const adminEmail = request.nextUrl.searchParams.get('adminEmail');
    const status = request.nextUrl.searchParams.get('status');

    // Validate admin
    const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'faran.bsce40@iiu.edu.pk';
    if (adminEmail !== ADMIN_EMAIL) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 403 }
      );
    }

    let requests = await getRequests(status ?? undefined);

    // Sort by most recent first
    requests.sort((a, b) => 
      new Date(b.requestedAt).getTime() - new Date(a.requestedAt).getTime()
    );

    return NextResponse.json(
      {
        success: true,
        requests,
        count: requests.length
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Fetch requests error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch requests' },
      { status: 500 }
    );
  }
}
