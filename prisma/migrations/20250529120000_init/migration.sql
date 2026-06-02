-- CreateTable
CREATE TABLE "DiagnosticApplication" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "organizationName" TEXT NOT NULL,
    "applicantName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "businessModel" TEXT NOT NULL,
    "revenueRange" TEXT NOT NULL,
    "teamSize" TEXT NOT NULL,
    "primaryObjective" TEXT NOT NULL,
    "businessStage" TEXT NOT NULL,
    "website" TEXT,
    "industry" TEXT,
    "location" TEXT,
    "role" TEXT,
    "rawResponses" JSONB,
    "draftToken" TEXT,
    "submissionStatus" TEXT NOT NULL DEFAULT 'submitted',
    "isProcessed" BOOLEAN NOT NULL DEFAULT false,
    "overallAlignmentScore" INTEGER,
    "infrastructureScore" INTEGER,
    "distributionScore" INTEGER,
    "intelligenceScore" INTEGER,
    "monetizationScore" INTEGER,
    "expansionScore" INTEGER,
    "primaryConstraint" TEXT,
    "primaryConstraintExplanation" TEXT,
    "secondaryConstraints" TEXT,
    "recommendedAxisPathway" TEXT,
    "businessMaturityClass" TEXT,
    "strategicInsight" TEXT,
    "internalReviewStatus" TEXT DEFAULT 'Pending',
    "nextStepRecommendation" TEXT,
    "clientFacingSummary" TEXT,
    "internalNotes" TEXT,
    "ipHash" TEXT,
    "userAgent" TEXT,

    CONSTRAINT "DiagnosticApplication_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContactSubmission" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "organization" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "brief" TEXT NOT NULL,
    "sourcePath" TEXT,
    "userAgent" TEXT,
    "ipHash" TEXT,

    CONSTRAINT "ContactSubmission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InsightArticle" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "publishDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "readingTime" INTEGER NOT NULL,
    "featuredImage" TEXT,
    "shortAbstract" TEXT NOT NULL,
    "articleBody" TEXT NOT NULL,
    "seoTitle" TEXT,
    "seoDescription" TEXT,
    "relatedSlugs" TEXT,
    "ctaModule" TEXT,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "status" TEXT NOT NULL DEFAULT 'DRAFT',

    CONSTRAINT "InsightArticle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NewsletterSubscriber" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" TEXT NOT NULL,
    "role" TEXT,
    "company" TEXT,
    "sourcePath" TEXT,

    CONSTRAINT "NewsletterSubscriber_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DiagnosticApplication_draftToken_key" ON "DiagnosticApplication"("draftToken");

-- CreateIndex
CREATE UNIQUE INDEX "InsightArticle_slug_key" ON "InsightArticle"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "NewsletterSubscriber_email_key" ON "NewsletterSubscriber"("email");
