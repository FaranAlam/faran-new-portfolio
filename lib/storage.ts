import { ObjectId } from 'mongodb';
import { getCollection } from './db';

// Shared database storage for all requests
// Using MongoDB for persistent storage

export interface DownloadRequest {
  _id?: ObjectId;
  id: string;
  email: string;
  resourceId: string;
  courseSlug: string;
  fileName: string;
  requestedAt: string;
  status: 'pending' | 'approved' | 'rejected';
  approvalToken?: string;
  approvedAt?: string;
  expiresAt?: string;
}

/**
 * Get all requests or filter by status
 */
export async function getRequests(status?: string): Promise<DownloadRequest[]> {
  try {
    const collection = await getCollection<DownloadRequest>('downloadRequests');
    
    const query: any = status && status !== 'all' ? { status } : {};
    const requests = await collection
      .find(query)
      .sort({ requestedAt: -1 })
      .toArray();
    
    return requests;
  } catch (error) {
    console.error('Error fetching requests:', error);
    return [];
  }
}

/**
 * Get request by ID
 */
export async function getRequest(id: string): Promise<DownloadRequest | null> {
  try {
    const collection = await getCollection<DownloadRequest>('downloadRequests');
    const request = await collection.findOne({ id });
    return request || null;
  } catch (error) {
    console.error('Error fetching request:', error);
    return null;
  }
}

/**
 * Create or update request
 */
export async function saveRequest(request: DownloadRequest): Promise<void> {
  try {
    const collection = await getCollection<DownloadRequest>('downloadRequests');
    
    // Check if exists
    const existing = await collection.findOne({ id: request.id });
    
    if (existing) {
      // Update existing
      await collection.updateOne({ id: request.id }, { $set: request });
    } else {
      // Insert new
      await collection.insertOne(request);
    }
  } catch (error) {
    console.error('Error saving request:', error);
    throw error;
  }
}

/**
 * Find duplicate requests
 */
export async function findDuplicateRequest(
  email: string,
  resourceId: string,
  courseSlug: string,
  fileName: string,
  status?: string[]
): Promise<DownloadRequest | null> {
  try {
    const collection = await getCollection<DownloadRequest>('downloadRequests');
    
    const query: any = {
      email,
      resourceId,
      courseSlug,
      fileName,
    };
    
    if (status && status.length > 0) {
      query.status = { $in: status };
    }
    
    const request = await collection.findOne(query);
    return request || null;
  } catch (error) {
    console.error('Error finding duplicate:', error);
    return null;
  }
}

/**
 * Update request status
 */
export async function updateRequestStatus(
  id: string,
  status: 'pending' | 'approved' | 'rejected',
  updates?: Partial<DownloadRequest>
): Promise<boolean> {
  try {
    const collection = await getCollection<DownloadRequest>('downloadRequests');
    
    const updateData = {
      status,
      ...(status === 'approved' && { approvedAt: new Date().toISOString() }),
      ...updates,
    };
    
    const result = await collection.updateOne({ id }, { $set: updateData });
    return result.modifiedCount > 0;
  } catch (error) {
    console.error('Error updating request status:', error);
    return false;
  }
}

// Verified emails storage (in-memory for quick lookup)
const verifiedEmails = new Map<string, string>();

/**
 * Verify email
 */
export function verifyEmail(email: string): void {
  verifiedEmails.set(email.toLowerCase(), new Date().toISOString());
}

/**
 * Check if email is verified
 */
export function isEmailVerified(email: string): boolean {
  return verifiedEmails.has(email.toLowerCase());
}

