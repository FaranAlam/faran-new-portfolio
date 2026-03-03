import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/db';
import { auth } from '@/auth';

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const db = await getDatabase();
    const profile = await db.collection('admin_profile').findOne({ 
      email: session.user.email 
    });

    if (!profile) {
      // Return default profile
      return NextResponse.json({
        success: true,
        profile: {
          name: session.user.name || 'Admin',
          email: session.user.email,
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
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { name, title, bio, profilePicture, socialLinks, contactInfo } = body;

    const db = await getDatabase();
    
    const result = await db.collection('admin_profile').updateOne(
      { email: session.user.email },
      {
        $set: {
          name,
          email: session.user.email,
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
