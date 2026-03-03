import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { getActivityLogs, getActivityStats, logActivity } from '@/lib/activity-logger';

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');

    if (action === 'stats') {
      const stats = await getActivityStats();
      return NextResponse.json(stats);
    }

    // Get logs with filters
    const filters = {
      category: searchParams.get('category') || undefined,
      severity: searchParams.get('severity') || undefined,
      limit: parseInt(searchParams.get('limit') || '100'),
    };

    const logs = await getActivityLogs(filters);
    return NextResponse.json(logs);
  } catch (error) {
    console.error('Activity logs error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch activity logs' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { action, description, category, severity, metadata } = body;

    if (!action || !description || !category || !severity) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Get IP and User Agent
    const ipAddress = request.headers.get('x-forwarded-for') || 
                     request.headers.get('x-real-ip') || 
                     'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';

    await logActivity({
      userId: session.user.id,
      userEmail: session.user.email || undefined,
      action,
      description,
      category,
      severity,
      ipAddress,
      userAgent,
      metadata,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Activity log error:', error);
    return NextResponse.json(
      { error: 'Failed to log activity' },
      { status: 500 }
    );
  }
}
