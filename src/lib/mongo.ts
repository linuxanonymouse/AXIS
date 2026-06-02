/**
 * Legacy MongoDB helper APIs now use Prisma/SQLite by default.
 * Set MONGODB_URI only if you intentionally route automations through Mongo.
 */
import { MongoClient, Db } from "mongodb";

declare global {
  // eslint-disable-next-line no-var
  var __mongoClient: MongoClient | undefined;
}

export async function getDb(): Promise<Db> {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI is not set. Use Prisma-backed API routes instead.");
  }

  const client: MongoClient =
    global.__mongoClient ?? new MongoClient(uri);

  if (process.env.NODE_ENV !== "production") global.__mongoClient = client;

  await client.connect();
  return client.db(process.env.MONGODB_DB ?? "axis");
}
