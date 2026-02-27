import { NextRequest, NextResponse } from 'next/server';
import * as fs from 'fs';
import * as path from 'path';

// Mapping of resource IDs to actual file paths
const fileMapping: Record<string, string> = {
  // Developer resources (single folder with topic PDFs)
  developer: 'developer',

  // Engineer semesters
  'semester-1': 'engineer/semester-1',
  'semester-2': 'engineer/semester-2',
  'semester-3': 'engineer/semester-3',
  'semester-4': 'engineer/semester-4',
  'semester-5': 'engineer/semester-5',
  'semester-6': 'engineer/semester-6',
  'semester-7': 'engineer/semester-7',
  'semester-8': 'engineer/semester-8',
};

export async function POST(request: NextRequest) {
  try {
    const { email, resourceId, courseSlug, fileName } = await request.json();

    // Validate request
    if (!email || !resourceId || !courseSlug || !fileName) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Verify email domain (only @iiu.edu.pk)
    if (!email.toLowerCase().endsWith('@iiu.edu.pk')) {
      return NextResponse.json(
        { success: false, message: 'Access denied. Only IIU student emails allowed.' },
        { status: 403 }
      );
    }

    // Get file path
    const resourcePath = fileMapping[resourceId];
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
      courseSlug,
      fileName
    );

    // Validate file exists and is in allowed directory
    const protectedResourcesDir = path.join(process.cwd(), 'resources');
    if (!fullPath.startsWith(protectedResourcesDir)) {
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
          message: `File not found. Upload files to: public/resources/${resourcePath}/${courseSlug}/`,
          uploadPath: `${resourcePath}/${courseSlug}`
        },
        { status: 404 }
      );
    }

    // Log download (for tracking)
    console.log(`Download: ${fileName} by ${email} from ${resourceId}/${courseSlug}`);

    // Return success with file info
    return NextResponse.json(
      {
        success: true,
        message: 'Download authorized',
        downloadUrl: `/resources/${resourcePath}/${courseSlug}/${fileName}`,
        email,
        timestamp: new Date().toISOString()
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Download error:', error);
    return NextResponse.json(
      { success: false, message: 'Download request failed' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const email = request.nextUrl.searchParams.get('email');
    const resourceId = request.nextUrl.searchParams.get('resourceId');
    const courseSlug = request.nextUrl.searchParams.get('courseSlug');

    if (!email || !resourceId || !courseSlug) {
      return NextResponse.json(
        { success: false, message: 'Email, resourceId, and courseSlug required' },
        { status: 400 }
      );
    }

    // Check email domain
    if (!email.toLowerCase().endsWith('@iiu.edu.pk')) {
      return NextResponse.json(
        { success: false, message: 'Only IIU students can access resources' },
        { status: 403 }
      );
    }

    // Get resource info
    const resourcePath = fileMapping[resourceId];
    if (!resourcePath) {
      return NextResponse.json(
        { success: false, message: 'Resource not found' },
        { status: 404 }
      );
    }

    // List available files in resource folder
    const folderPath = path.join(process.cwd(), 'resources', resourcePath, courseSlug);
    
    try {
      const files = fs.existsSync(folderPath) ? fs.readdirSync(folderPath) : [];
      
      return NextResponse.json(
        {
          success: true,
          resourceId,
          resourcePath: `${resourcePath}/${courseSlug}`,
          availableFiles: files,
          message: files.length > 0 ? 'Files ready to download' : 'No files uploaded yet'
        },
        { status: 200 }
      );
    } catch {
      return NextResponse.json(
        {
          success: false,
          message: 'Folder not ready. Awaiting file uploads.',
          resourcePath
        },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error('Status check error:', error);
    return NextResponse.json(
      { success: false, message: 'Status check failed' },
      { status: 500 }
    );
  }
}
