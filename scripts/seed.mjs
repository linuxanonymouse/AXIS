/**
 * Seed sample Insight articles.
 * Run: npm run db:up && npm run prisma:push && npm run prisma:generate && npm run db:seed
 */
import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter: new PrismaPg(pool) });

const articles = [
  {
    title: "Organizations Do Not Scale. Systems Do.",
    slug: "organizations-do-not-scale-systems-do",
    category: "Strategy",
    author: "Axis Operations",
    readingTime: 12,
    shortAbstract:
      "Growth does not break because ambition disappears. Growth breaks when systems cannot carry the weight of expansion.",
    articleBody:
      "Axis doctrine holds that scale is a systems problem before it is a marketing problem. When infrastructure, distribution, and intelligence are misaligned, revenue growth increases fragility rather than control.\n\nStructured installation — not more activity — is the corrective path.",
    isFeatured: true,
    status: "PUBLISHED",
  },
  {
    title: "Infrastructure Debt Kills Momentum",
    slug: "infrastructure-debt-kills-momentum",
    category: "Infrastructure",
    author: "Axis Studio",
    readingTime: 9,
    shortAbstract:
      "The hidden cost of workarounds, disconnected tools, and fragile systems.",
    articleBody:
      "Infrastructure debt compounds silently. Each workaround feels small; collectively they cap throughput, distort reporting, and force reactive leadership.\n\nAxis installs deployment layers that convert strategy into durable systems.",
    status: "PUBLISHED",
  },
  {
    title: "Distribution Is Infrastructure",
    slug: "distribution-is-infrastructure",
    category: "Distribution",
    author: "Axis Media",
    readingTime: 8,
    shortAbstract:
      "Attention is earned by content. Influence is built by distribution systems.",
    articleBody:
      "Distribution must be engineered as infrastructure — channels, cadence, measurement, and control — not treated as episodic content output.",
    status: "PUBLISHED",
  },
];

for (const article of articles) {
  await prisma.insightArticle.upsert({
    where: { slug: article.slug },
    create: article,
    update: article,
  });
}

console.log(`Seeded ${articles.length} insight articles.`);
await prisma.$disconnect();
await pool.end();
