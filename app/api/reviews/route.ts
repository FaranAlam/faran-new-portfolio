import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { getDatabase } from '@/lib/db';
import { getClientIp, rateLimit, RateLimits } from '@/lib/rate-limit';
import { sanitizeEmail, sanitizeText } from '@/lib/sanitization';
import { ObjectId } from 'mongodb';

type ReviewDocument = {
  _id?: ObjectId;
  name: string;
  email?: string;
  rating: number;
  comment?: string;
  approved: boolean;
  source: string;
  ipHash?: string;
  createdAt: Date;
  updatedAt: Date;
  approvedAt?: Date;
  adminNote?: string;
};

function toPublicReview(review: ReviewDocument & { _id?: ObjectId }) {
  return {
    _id: review._id?.toString(),
    name: review.name,
    rating: review.rating,
    comment: review.comment || '',
    approved: review.approved,
    source: review.source,
    createdAt: review.createdAt,
    updatedAt: review.updatedAt,
    approvedAt: review.approvedAt,
  };
}

async function buildStats(db: Awaited<ReturnType<typeof getDatabase>>, approvedOnly = true) {
  const query = approvedOnly ? { approved: true } : {};
  const collection = db.collection<ReviewDocument>('website_reviews');
  const [reviews, totalCount] = await Promise.all([
    collection.find(query).sort({ createdAt: -1 }).toArray(),
    collection.countDocuments(query),
  ]);

  const ratingCount = reviews.length;
  const averageRating = ratingCount
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / ratingCount
    : 0;

  const distribution = [5, 4, 3, 2, 1].map((rating) => ({
    rating,
    count: reviews.filter((review) => review.rating === rating).length,
  }));

  return {
    totalCount,
    ratingCount,
    averageRating,
    distribution,
    latest: reviews.slice(0, 6).map(toPublicReview),
  };
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const includeAll = searchParams.get('all') === 'true';

    const session = await auth();
    if (includeAll && !session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const db = await getDatabase();
    const collection = db.collection<ReviewDocument>('website_reviews');

    const query = includeAll ? {} : { approved: true };
    const reviews = await collection.find(query).sort({ createdAt: -1 }).toArray();
    const approvedReviews = await collection.find({ approved: true }).sort({ createdAt: -1 }).toArray();

    const totalApproved = approvedReviews.length;
    const averageRating = totalApproved
      ? approvedReviews.reduce((sum, review) => sum + review.rating, 0) / totalApproved
      : 0;

    const pendingCount = includeAll
      ? await collection.countDocuments({ approved: false })
      : undefined;

    return NextResponse.json({
      success: true,
      reviews: reviews.map(toPublicReview),
      stats: {
        totalApproved,
        averageRating,
        pendingCount,
      },
      distribution: [5, 4, 3, 2, 1].map((rating) => ({
        rating,
        count: approvedReviews.filter((review) => review.rating === rating).length,
      })),
    });
  } catch (error) {
    console.error('Review fetch error:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch reviews' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const clientIp = getClientIp(request);
    const limitResult = rateLimit(clientIp, RateLimits.REVIEWS);

    if (!limitResult.success) {
      return NextResponse.json(
        {
          error: 'Too many review submissions. Please try again later.',
          resetTime: new Date(limitResult.reset).toISOString(),
        },
        {
          status: 429,
          headers: {
            'X-RateLimit-Limit': limitResult.limit.toString(),
            'X-RateLimit-Remaining': limitResult.remaining.toString(),
            'X-RateLimit-Reset': limitResult.reset.toString(),
          },
        }
      );
    }

    const body = await request.json();
    const rating = Number(body.rating);
    const name = sanitizeText(body.name || '') || 'Website Visitor';
    const email = body.email ? sanitizeEmail(body.email) : undefined;
    const comment = sanitizeText(body.comment || '');

    if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
      return NextResponse.json({ error: 'Rating must be between 1 and 5' }, { status: 400 });
    }

    if (name.length > 60) {
      return NextResponse.json({ error: 'Name is too long' }, { status: 400 });
    }

    if (comment.length > 500) {
      return NextResponse.json({ error: 'Comment is too long' }, { status: 400 });
    }

    if (body.email && !email) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    const db = await getDatabase();
    const collection = db.collection<ReviewDocument>('website_reviews');

    const review: ReviewDocument = {
      name,
      email,
      rating,
      comment: comment || undefined,
      approved: false,
      source: body.source || 'website',
      ipHash: clientIp,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await collection.insertOne(review);

    return NextResponse.json({
      success: true,
      message: 'Thank you! Your rating has been submitted and will appear after approval.',
      reviewId: result.insertedId,
    });
  } catch (error) {
    console.error('Review submission error:', error);
    return NextResponse.json({ error: 'Failed to submit review' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { _id, ...updates } = body;

    if (!_id) {
      return NextResponse.json({ error: 'Review ID required' }, { status: 400 });
    }

    const db = await getDatabase();
    const collection = db.collection<ReviewDocument>('website_reviews');

    const setUpdates: Partial<ReviewDocument> = {
      updatedAt: new Date(),
    };

    if (typeof updates.approved === 'boolean') {
      setUpdates.approved = updates.approved;
      if (updates.approved) {
        setUpdates.approvedAt = new Date();
      }
    }

    if (typeof updates.adminNote === 'string') {
      setUpdates.adminNote = sanitizeText(updates.adminNote);
    }

    await collection.updateOne({ _id: new ObjectId(_id) }, { $set: setUpdates });

    return NextResponse.json({ success: true, message: 'Review updated successfully' });
  } catch (error) {
    console.error('Review update error:', error);
    return NextResponse.json({ error: 'Failed to update review' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Review ID required' }, { status: 400 });
    }

    const db = await getDatabase();
    const collection = db.collection<ReviewDocument>('website_reviews');
    await collection.deleteOne({ _id: new ObjectId(id) });

    return NextResponse.json({ success: true, message: 'Review deleted successfully' });
  } catch (error) {
    console.error('Review delete error:', error);
    return NextResponse.json({ error: 'Failed to delete review' }, { status: 500 });
  }
}