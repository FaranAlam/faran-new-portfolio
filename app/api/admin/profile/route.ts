import { NextRequest, NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import { getDatabase } from '@/lib/db';
import { auth } from '@/auth';
import { getAdminAuthCollection, normalizeEmail } from '@/lib/admin-auth';

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    
    if (!session?.user?.id || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const db = await getDatabase();
    const profile = await db.collection('admin_profile').findOne({
      adminId: session.user.id,
    });

    if (!profile) {
      // Return default profile
      return NextResponse.json({
        success: true,
        profile: {
          name: session.user.name || 'Admin',
          email: session.user.email || '',
          title: 'Full Stack Developer',
          bio: 'Passionate developer specialized in React, Next.js, and Node.js',
          profilePicture: '',
          socialLinks: {
            github: '',
            linkedin: '',
            twitter: '',
            instagram: '',
            youtube: '',
          },
          contactInfo: {
            phone: '',
            whatsapp: '',
            address: '',
            website: '',
          },
        }
      });
    }

    return NextResponse.json({
      success: true,
      profile: {
        name: profile.name,
        email: profile.email,
        title: profile.title,
        bio: profile.bio,
        profilePicture: profile.profilePicture || '',
        socialLinks: profile.socialLinks || {},
        contactInfo: profile.contactInfo || {},
      }
    });
  } catch (error) {
    console.error('Failed to fetch profile:', error);
    return NextResponse.json(
      { error: 'Failed to fetch profile' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    
    if (!session?.user?.id || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { name, email, title, bio, profilePicture, socialLinks, contactInfo } = body;
    const normalizedEmail = normalizeEmail(email || session.user.email || '');

    if (!normalizedEmail) {
      return NextResponse.json({ error: 'Valid email is required' }, { status: 400 });
    }

    const db = await getDatabase();
    const adminCollection = await getAdminAuthCollection();

    const adminFilter = ObjectId.isValid(session.user.id)
      ? { _id: new ObjectId(session.user.id) }
      : { email: session.user.email, role: 'admin' as const };

    const existingAdmin = await adminCollection.findOne(adminFilter);

    if (!existingAdmin) {
      return NextResponse.json({ error: 'Admin account not found' }, { status: 404 });
    }

    if (normalizeEmail(existingAdmin.email) !== normalizedEmail) {
      const conflictingAdmin = await adminCollection.findOne({ email: normalizedEmail, role: 'admin' });
      if (conflictingAdmin) {
        return NextResponse.json({ error: 'Email already in use' }, { status: 409 });
      }
    }

    await adminCollection.updateOne(
      { _id: existingAdmin._id },
      {
        $set: {
          email: normalizedEmail,
          updatedAt: new Date(),
        },
      }
    );
    
    const result = await db.collection('admin_profile').updateOne(
      { adminId: existingAdmin._id.toString() },
      {
        $set: {
          adminId: existingAdmin._id.toString(),
          name,
          email: normalizedEmail,
          title,
          bio,
          profilePicture: profilePicture || '',
          socialLinks: socialLinks || {},
          contactInfo: contactInfo || {},
          updatedAt: new Date(),
        },
        $setOnInsert: {
          createdAt: new Date(),
        }
      },
      { upsert: true }
    );

    return NextResponse.json({
      success: true,
      message: 'Profile updated successfully',
      result
    });
  } catch (error) {
    console.error('Failed to update profile:', error);
    return NextResponse.json(
      { error: 'Failed to update profile' },
      { status: 500 }
    );
  }
}
