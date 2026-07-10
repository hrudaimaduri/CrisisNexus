/*
  Warnings:

  - Added the required column `latitude` to the `Agency` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longitude` to the `Agency` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Agency" DROP CONSTRAINT "Agency_locationId_fkey";

-- DropIndex
DROP INDEX "Agency_name_idx";

-- AlterTable
ALTER TABLE "Agency" ADD COLUMN     "latitude" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "longitude" DOUBLE PRECISION NOT NULL,
ALTER COLUMN "locationId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Agency" ADD CONSTRAINT "Agency_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE SET NULL ON UPDATE CASCADE;
