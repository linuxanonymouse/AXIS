import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter: new PrismaPg(pool) });

try {
  const result = await prisma.contactSubmission.findFirst();
  console.log("✓ DB OK:", result ?? "(empty — tables exist and are ready)");
  await prisma.$disconnect();
  await pool.end();
  process.exit(0);
} catch (e) {
  console.error("✗ DB ERROR:", e.message);
  await prisma.$disconnect();
  await pool.end();
  process.exit(1);
}
