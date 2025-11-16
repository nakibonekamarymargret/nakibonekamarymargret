/*
  Warnings:

  - You are about to drop the column `order` on the `Experience` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Experience_order_idx";

-- AlterTable
ALTER TABLE "Experience" DROP COLUMN "order",
ADD COLUMN     "companySize" TEXT,
ADD COLUMN     "companyUrl" TEXT,
ADD COLUMN     "employmentType" TEXT,
ADD COLUMN     "featured" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "industry" TEXT,
ADD COLUMN     "isCurrent" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "location" TEXT,
ADD COLUMN     "metrics" TEXT[],
ADD COLUMN     "priority" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "projects" TEXT[],
ADD COLUMN     "responsibilities" TEXT[],
ADD COLUMN     "skillsGained" TEXT[],
ADD COLUMN     "technologies" TEXT[],
ALTER COLUMN "imageUrl" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "caseStudyUrl" TEXT,
ADD COLUMN     "category" TEXT,
ADD COLUMN     "challenges" TEXT[],
ADD COLUMN     "featured" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "liveDemo" TEXT,
ADD COLUMN     "metrics" TEXT[],
ADD COLUMN     "priority" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "role" TEXT,
ADD COLUMN     "screenshots" TEXT[],
ADD COLUMN     "status" TEXT,
ADD COLUMN     "teamSize" TEXT,
ADD COLUMN     "thumbnailUrl" TEXT,
ADD COLUMN     "videoUrl" TEXT;

-- AlterTable
ALTER TABLE "Skill" ADD COLUMN     "icon" TEXT;

-- CreateTable
CREATE TABLE "Certificate" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "institute" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Certificate_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Experience_priority_idx" ON "Experience"("priority");

-- CreateIndex
CREATE INDEX "Experience_featured_idx" ON "Experience"("featured");

-- CreateIndex
CREATE INDEX "Experience_isCurrent_idx" ON "Experience"("isCurrent");

-- CreateIndex
CREATE INDEX "Project_priority_idx" ON "Project"("priority");

-- CreateIndex
CREATE INDEX "Project_featured_idx" ON "Project"("featured");
