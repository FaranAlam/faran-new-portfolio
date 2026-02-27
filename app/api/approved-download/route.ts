import { NextRequest, NextResponse } from 'next/server';
import * as fs from 'fs';
import * as path from 'path';
import { getCollection } from '@/lib/db';
import type { DownloadRequest } from '@/lib/storage';

// Mapping of resource IDs to paths
const fileMapping: Record<string, string> = {
  developer: 'developer',
  'semester-1': 'engineer/semester-1',
  'semester-2': 'engineer/semester-2',
  'semester-3': 'engineer/semester-3',
  'semester-4': 'engineer/semester-4',
  'semester-5': 'engineer/semester-5',
  'semester-6': 'engineer/semester-6',
  'semester-7': 'engineer/semester-7',
  'semester-8': 'engineer/semester-8',
};

export async function GET(request: NextRequest) {
  try {
    const token = request.nextUrl.searchParams.get('token');
    const resourceId = request.nextUrl.searchParams.get('resourceId');
    const courseSlug = request.nextUrl.searchParams.get('courseSlug');
    const fileNameParam = request.nextUrl.searchParams.get('fileName');
    const isPreview = request.nextUrl.searchParams.get('preview') === 'true';

    const hasDirectParams = !!(resourceId && courseSlug && fileNameParam);
    if (!token && !hasDirectParams) {
      return NextResponse.json(
        { success: false, message: 'Approval token required' },
        { status: 400 }
      );
    }

    if (hasDirectParams) {
      const resourcePath = fileMapping[resourceId!];
      if (!resourcePath) {
        return NextResponse.json(
          { success: false, message: 'Resource not found' },
          { status: 404 }
        );
      }

      const fullPath = path.join(
        process.cwd(),
        'resources',
        resourcePath,
        courseSlug!,
        fileNameParam!
      );

      const resourcesDir = path.join(process.cwd(), 'resources');
      if (!fullPath.startsWith(resourcesDir)) {
        return NextResponse.json(
          { success: false, message: 'Invalid file path' },
          { status: 400 }
        );
      }

      if (!fs.existsSync(fullPath)) {
        return NextResponse.json(
          { success: false, message: 'File not found on server. Contact admin.' },
          { status: 404 }
        );
      }

      const fileBuffer = fs.readFileSync(fullPath);

      return new NextResponse(fileBuffer, {
        headers: {
          'Content-Type': 'application/octet-stream',
          'Content-Disposition': `${isPreview ? 'inline' : 'attachment'}; filename="${fileNameParam}"`,
          'Content-Length': fileBuffer.length.toString()
        }
      });
    }

    // Find request by token in database
    const collection = await getCollection<DownloadRequest>('downloadRequests');
    const req = await collection.findOne({
      approvalToken: token || undefined,
      status: 'approved'
    });

    if (!req) {
      return NextResponse.json(
        { success: false, message: 'Invalid or expired approval token' },
        { status: 404 }
      );
    }

    // Check expiration
    if (req.expiresAt && new Date(req.expiresAt) < new Date()) {
      return NextResponse.json(
        { success: false, message: 'Download link has expired. Please request again.' },
        { status: 410 }
      );
    }

    // Get file path
    const resourcePath = fileMapping[req.resourceId];
    if (!resourcePath) {
      return NextResponse.json(
        { success: false, message: 'Resource not found' },
        { status: 404 }
      );
    }

    const fullPath = path.join(
      process.cwd(),
      'resources',
      resourcePath,
      req.courseSlug,
      req.fileName
    );

    // Security check
    const resourcesDir = path.join(process.cwd(), 'resources');
    if (!fullPath.startsWith(resourcesDir)) {
      return NextResponse.json(
        { success: false, message: 'Invalid file path' },
        { status: 400 }
      );
    }

    // Check if file exists
    if (!fs.existsSync(fullPath)) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'File not found on server. Contact admin.',
        },
        { status: 404 }
      );
    }

    // Log download
    console.log(`✅ Approved download: ${req.fileName} by ${req.email}`);

    // Read file and send
    const fileBuffer = fs.readFileSync(fullPath);
    const fileName = req.fileName;

    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': 'application/octet-stream',
        'Content-Disposition': `attachment; filename="${fileName}"`,
        'Content-Length': fileBuffer.length.toString()
      }
    });
  } catch (error) {
    console.error('Approved download error:', error);
    return NextResponse.json(
      { success: false, message: 'Download failed' },
      { status: 500 }
    );
  }
}
