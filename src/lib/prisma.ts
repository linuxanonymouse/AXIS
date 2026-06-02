import { PrismaClient } from "@prisma/client";

declare global {
  // eslint-disable-next-line no-var
  var __prisma: PrismaClient | undefined;
}

function makePrisma() {
  // Prisma 7: datasources constructor option removed.
  // DATABASE_URL is read automatically from the environment (.env.local / .env).
  return new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });
}

export const prisma = global.__prisma ?? makePrisma();

if (process.env.NODE_ENV !== "production") global.__prisma = prisma;
