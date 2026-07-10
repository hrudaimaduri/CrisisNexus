/*
  Warnings:

  - Made the column `locationId` on table `Agency` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Agency" DROP CONSTRAINT "Agency_locationId_fkey";

-- AlterTable
ALTER TABLE "Agency" ALTER COLUMN "locationId" SET NOT NULL;

-- CreateIndex
CREATE INDEX "Agency_locationId_idx" ON "Agency"("locationId");

-- AddForeignKey
ALTER TABLE "Agency" ADD CONSTRAINT "Agency_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
