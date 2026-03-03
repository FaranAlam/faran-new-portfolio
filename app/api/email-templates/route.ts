import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { getDatabase } from '@/lib/db';
import { ObjectId } from 'mongodb';

export interface EmailTemplate {
  _id?: string;
  name: string;
  subject: string;
  htmlContent: string;
  textContent: string;
  category: 'newsletter' | 'welcome' | 'notification' | 'marketing' | 'transactional';
  variables: string[]; // e.g., ['{{name}}', '{{email}}', '{{link}}']
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');

    const db = await getDatabase();
    const query: any = {};
    
    if (category) query.category = category;

    const templates = await db
      .collection('email_templates')
      .find(query)
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({ success: true, templates });
  } catch (error) {
    console.error('Email templates fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch email templates' },
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
    const { name, subject, htmlContent, textContent, category, variables, isActive } = body;

    if (!name || !subject || !htmlContent || !category) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const db = await getDatabase();
    
    const template: EmailTemplate = {
      name,
      subject,
      htmlContent,
      textContent: textContent || htmlContent.replace(/<[^>]*>/g, ''),
      category,
      variables: variables || [],
      isActive: isActive !== undefined ? isActive : true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const { _id, ...templateData } = template;
    const result = await db.collection('email_templates').insertOne(templateData);

    return NextResponse.json({
      success: true,
      message: 'Template created successfully',
      templateId: result.insertedId,
    });
  } catch (error) {
    console.error('Template create error:', error);
    return NextResponse.json(
      { error: 'Failed to create template' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await auth();
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { _id, ...updates } = body;

    if (!_id) {
      return NextResponse.json({ error: 'Template ID required' }, { status: 400 });
    }

    const db = await getDatabase();
    updates.updatedAt = new Date();

    await db.collection('email_templates').updateOne(
      { _id: new ObjectId(_id) },
      { $set: updates }
    );

    return NextResponse.json({
      success: true,
      message: 'Template updated successfully',
    });
  } catch (error) {
    console.error('Template update error:', error);
    return NextResponse.json(
      { error: 'Failed to update template' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await auth();
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const _id = searchParams.get('id');

    if (!_id) {
      return NextResponse.json({ error: 'Template ID required' }, { status: 400 });
    }

    const db = await getDatabase();
    await db.collection('email_templates').deleteOne({ _id: new ObjectId(_id) });

    return NextResponse.json({
      success: true,
      message: 'Template deleted successfully',
    });
  } catch (error) {
    console.error('Template delete error:', error);
    return NextResponse.json(
      { error: 'Failed to delete template' },
      { status: 500 }
    );
  }
}
