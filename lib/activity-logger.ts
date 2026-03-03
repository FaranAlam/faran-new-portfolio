import { getDatabase } from './db';

export interface ActivityLog {
  _id?: string;
  userId?: string;
  userEmail?: string;
  action: string;
  description: string;
  category: 'auth' | 'content' | 'email' | 'settings' | 'security' | 'system';
  severity: 'low' | 'medium' | 'high' | 'critical';
  ipAddress?: string;
  userAgent?: string;
  metadata?: Record<string, any>;
  createdAt?: Date;
}

export async function logActivity(log: ActivityLog): Promise<void> {
  try {
    const db = await getDatabase();
    const { _id, ...logData } = log;
    await db.collection('activity_logs').insertOne({
      ...logData,
      createdAt: new Date(),
    });
  } catch (error) {
    console.error('Failed to log activity:', error);
    // Don't throw - logging failure shouldn't break the main operation
  }
}

export async function getActivityLogs(
  filters?: {
    userId?: string;
    category?: string;
    severity?: string;
    startDate?: Date;
    endDate?: Date;
    limit?: number;
  }
): Promise<ActivityLog[]> {
  try {
    const db = await getDatabase();
    const query: any = {};

    if (filters?.userId) query.userId = filters.userId;
    if (filters?.category) query.category = filters.category;
    if (filters?.severity) query.severity = filters.severity;
    if (filters?.startDate || filters?.endDate) {
      query.createdAt = {};
      if (filters.startDate) query.createdAt.$gte = filters.startDate;
      if (filters.endDate) query.createdAt.$lte = filters.endDate;
    }

    const logs = await db
      .collection('activity_logs')
      .find(query)
      .sort({ createdAt: -1 })
      .limit(filters?.limit || 100)
      .toArray();

    return logs.map(log => ({
      _id: log._id.toString(),
      userId: log.userId,
      userEmail: log.userEmail,
      action: log.action,
      description: log.description,
      category: log.category,
      severity: log.severity,
      ipAddress: log.ipAddress,
      userAgent: log.userAgent,
      metadata: log.metadata,
      createdAt: log.createdAt,
    })) as ActivityLog[];
  } catch (error) {
    console.error('Failed to fetch activity logs:', error);
    return [];
  }
}

export async function getActivityStats(): Promise<{
  total: number;
  byCategory: Record<string, number>;
  bySeverity: Record<string, number>;
  last24Hours: number;
}> {
  try {
    const db = await getDatabase();
    const collection = db.collection('activity_logs');

    const [total, byCategory, bySeverity, last24Hours] = await Promise.all([
      collection.countDocuments(),
      collection
        .aggregate([
          { $group: { _id: '$category', count: { $sum: 1 } } },
        ])
        .toArray(),
      collection
        .aggregate([
          { $group: { _id: '$severity', count: { $sum: 1 } } },
        ])
        .toArray(),
      collection.countDocuments({
        createdAt: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) },
      }),
    ]);

    return {
      total: total || 0,
      byCategory: byCategory.reduce((acc: any, item: any) => {
        acc[item._id] = item.count;
        return acc;
      }, {}),
      bySeverity: bySeverity.reduce((acc: any, item: any) => {
        acc[item._id] = item.count;
        return acc;
      }, {}),
      last24Hours: last24Hours || 0,
    };
  } catch (error) {
    console.error('Failed to fetch activity stats:', error);
    return {
      total: 0,
      byCategory: {},
      bySeverity: {},
      last24Hours: 0,
    };
  }
}
