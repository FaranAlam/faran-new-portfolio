import { MongoClient, Db, Collection, Document } from 'mongodb';

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) {
    throw new Error('MONGODB_URI is not defined in environment variables');
  }

  try {
    const client = new MongoClient(mongoUri);
    await client.connect();
    
    const db = client.db('portfolio');
    
    cachedClient = client;
    cachedDb = db;
    
    console.log('✅ Connected to MongoDB');
    return { client, db };
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error);
    throw error;
  }
}

export async function getDatabase(): Promise<Db> {
  const { db } = await connectToDatabase();
  return db;
}

export async function getCollection<T extends Document>(collectionName: string): Promise<Collection<T>> {
  const db = await getDatabase();
  return db.collection<T>(collectionName);
}

export async function createIndexes() {
  try {
    const db = await getDatabase();
    
    // Download Requests indexes
    const downloadRequests = db.collection('downloadRequests');
    await downloadRequests.createIndex({ email: 1 });
    await downloadRequests.createIndex({ resourceId: 1 });
    await downloadRequests.createIndex({ status: 1 });
    await downloadRequests.createIndex({ createdAt: 1 });
    await downloadRequests.createIndex({ email: 1, resourceId: 1, courseSlug: 1, fileName: 1 }, { unique: false });
    
    console.log('✅ Database indexes created');
  } catch (error) {
    console.error('❌ Failed to create indexes:', error);
  }
}
