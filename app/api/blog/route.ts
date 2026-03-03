import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { getDatabase } from '@/lib/db';
import { ObjectId } from 'mongodb';

export interface BlogPost {
  _id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  image?: string;
  author: string;
  authorEmail?: string;
  status: 'draft' | 'published';
  featured: boolean;
  views: number;
  likes: number;
  publishedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');

    const db = await getDatabase();
    const query: any = {};

    if (status) query.status = status;
    if (category) query.category = category;
    if (featured) query.featured = featured === 'true';

    const posts = await db
      .collection('blog_posts')
      .find(query)
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({ success: true, posts });
  } catch (error) {
    console.error('Blog fetch error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch blog posts' },
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
    const { title, slug, excerpt, content, category, tags, image, status, featured } = body;

    if (!title || !slug || !content || !category) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const db = await getDatabase();

    // Check if slug already exists
    const existing = await db.collection('blog_posts').findOne({ slug });
    if (existing) {
      return NextResponse.json(
        { error: 'Slug already exists' },
        { status: 400 }
      );
    }

    const post: BlogPost = {
      title,
      slug,
      excerpt: excerpt || content.substring(0, 150),
      content,
      category,
      tags: tags || [],
      image,
      author: session.user.name || 'Admin',
      authorEmail: session.user.email || undefined,
      status: status || 'draft',
      featured: featured || false,
      views: 0,
      likes: 0,
      publishedAt: status === 'published' ? new Date() : undefined,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const { _id, ...postData } = post;
    const result = await db.collection('blog_posts').insertOne(postData);

    return NextResponse.json({
      success: true,
      message: 'Blog post created successfully',
      postId: result.insertedId,
    });
  } catch (error) {
    console.error('Blog create error:', error);
    return NextResponse.json(
      { error: 'Failed to create blog post' },
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
      return NextResponse.json({ error: 'Post ID required' }, { status: 400 });
    }

    const db = await getDatabase();

    // If publishing for the first time, set publishedAt
    if (updates.status === 'published' && !updates.publishedAt) {
      updates.publishedAt = new Date();
    }

    updates.updatedAt = new Date();

    await db.collection('blog_posts').updateOne(
      { _id: new ObjectId(_id) },
      { $set: updates }
    );

    return NextResponse.json({
      success: true,
      message: 'Blog post updated successfully',
    });
  } catch (error) {
    console.error('Blog update error:', error);
    return NextResponse.json(
      { error: 'Failed to update blog post' },
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
      return NextResponse.json({ error: 'Post ID required' }, { status: 400 });
    }

    const db = await getDatabase();
    await db.collection('blog_posts').deleteOne({ _id: new ObjectId(_id) });

    return NextResponse.json({
      success: true,
      message: 'Blog post deleted successfully',
    });
  } catch (error) {
    console.error('Blog delete error:', error);
    return NextResponse.json(
      { error: 'Failed to delete blog post' },
      { status: 500 }
    );
  }
}
