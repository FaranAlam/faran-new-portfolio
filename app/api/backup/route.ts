import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { getDatabase } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');

    const db = await getDatabase();

    if (action === 'export') {
      // Export all collections
      const collections = [
        'contacts',
        'newsletter_subscribers',
        'projects',
        'blog_posts',
        'email_templates',
        'email_campaigns',
        'activity_logs',
      ];

      const backup: Record<string, any[]> = {};

      for (const collectionName of collections) {
        try {
          const data = await db.collection(collectionName).find({}).toArray();
          backup[collectionName] = data;
        } catch (error) {
          console.error(`Failed to backup ${collectionName}:`, error);
          backup[collectionName] = [];
        }
      }

      // Add metadata
      const metadata = {
        timestamp: new Date().toISOString(),
        version: '1.0',
        user: session.user.email,
      };

      const response = {
        metadata,
        data: backup,
      };

      return new NextResponse(JSON.stringify(response, null, 2), {
        headers: {
          'Content-Type': 'application/json',
          'Content-Disposition': `attachment; filename="portfolio-backup-${Date.now()}.json"`,
        },
      });
    }

    if (action === 'stats') {
      // Get backup statistics
      const collections = [
        'contacts',
        'newsletter_subscribers',
        'projects',
        'blog_posts',
        'email_templates',
        'email_campaigns',
        'activity_logs',
      ];

      const stats: Record<string, number> = {};
      let totalDocuments = 0;

      for (const collectionName of collections) {
        try {
          const count = await db.collection(collectionName).countDocuments();
          stats[collectionName] = count;
          totalDocuments += count;
        } catch (error) {
          stats[collectionName] = 0;
        }
      }

      return NextResponse.json({
        success: true,
        stats,
        totalDocuments,
        totalCollections: collections.length,
      });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    console.error('Backup error:', error);
    return NextResponse.json(
      { error: 'Failed to create backup' },
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
    const { data, metadata } = body;

    if (!data || !metadata) {
      return NextResponse.json(
        { error: 'Invalid backup file' },
        { status: 400 }
      );
    }

    const db = await getDatabase();
    const results: Record<string, { inserted: number; errors: number }> = {};

    // Restore each collection
    for (const [collectionName, documents] of Object.entries(data)) {
      try {
        if (!Array.isArray(documents) || documents.length === 0) {
          results[collectionName] = { inserted: 0, errors: 0 };
          continue;
        }

        // Clean _id fields for insertion
        const cleanDocs = documents.map(doc => {
          const { _id, ...rest } = doc as any;
          return rest;
        });

        const result = await db.collection(collectionName).insertMany(cleanDocs, {
          ordered: false,
        });

        results[collectionName] = {
          inserted: result.insertedCount,
          errors: 0,
        };
      } catch (error: any) {
        results[collectionName] = {
          inserted: error.result?.nInserted || 0,
          errors: (documents as any[]).length - (error.result?.nInserted || 0),
        };
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Backup restored successfully',
      results,
    });
  } catch (error) {
    console.error('Restore error:', error);
    return NextResponse.json(
      { error: 'Failed to restore backup' },
      { status: 500 }
    );
  }
}
