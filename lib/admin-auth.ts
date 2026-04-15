import { getDatabase } from "@/lib/db";
import type { WithId, Document } from "mongodb";

export interface AdminAuthRecord extends Document {
  email: string;
  passwordHash: string;
  name?: string;
  role: "admin";
  createdAt: Date;
  updatedAt: Date;
}

export function normalizeEmail(value: string | undefined | null): string {
  return (value || "").trim().toLowerCase();
}

export async function getAdminAuthCollection() {
  const db = await getDatabase();
  const collection = db.collection<AdminAuthRecord>("admin_auth");

  await collection.createIndex({ email: 1 }, { unique: true });
  await collection.createIndex({ role: 1 });

  return collection;
}

export async function getPrimaryAdmin(): Promise<WithId<AdminAuthRecord> | null> {
  const collection = await getAdminAuthCollection();
  return collection.findOne({ role: "admin" }, { sort: { createdAt: 1 } });
}

export async function getAdminByEmail(email: string): Promise<WithId<AdminAuthRecord> | null> {
  const collection = await getAdminAuthCollection();
  return collection.findOne({ email: normalizeEmail(email), role: "admin" });
}

export async function isAdminSetupComplete(): Promise<boolean> {
  const admin = await getPrimaryAdmin();
  return Boolean(admin);
}
