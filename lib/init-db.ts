// This file should be imported at app startup to initialize database indexes
import { createIndexes } from '@/lib/db';

export async function initDatabase() {
  try {
    await createIndexes();
  } catch (error) {
    console.error('Failed to initialize database:', error);
  }
}
