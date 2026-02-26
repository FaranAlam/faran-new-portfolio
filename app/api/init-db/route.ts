import { createIndexes } from '@/lib/db';

export async function GET() {
  try {
    await createIndexes();
    return Response.json({ 
      success: true, 
      message: 'Database initialized successfully' 
    });
  } catch (error) {
    console.error('Database init failed:', error);
    return Response.json({ 
      success: false, 
      message: 'Failed to initialize database',
      error: String(error)
    }, { status: 500 });
  }
}
