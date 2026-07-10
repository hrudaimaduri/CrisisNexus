/*
  Warnings:

  - Added the required column `issuingAgencyId` to the `Alert` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Alert" ADD COLUMN     "issuingAgencyId" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "Alert_issuingAgencyId_idx" ON "Alert"("issuingAgencyId");

-- AddForeignKey
ALTER TABLE "Alert" ADD CONSTRAINT "Alert_issuingAgencyId_fkey" FOREIGN KEY ("issuingAgencyId") REFERENCES "Agency"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
