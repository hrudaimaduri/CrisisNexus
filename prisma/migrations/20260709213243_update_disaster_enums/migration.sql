/*
  Warnings:

  - The values [REPORTED] on the enum `DisasterStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "DisasterStatus_new" AS ENUM ('MONITORING', 'ACTIVE', 'CONTAINED', 'RESOLVED', 'ARCHIVED');
ALTER TABLE "Disaster" ALTER COLUMN "status" TYPE "DisasterStatus_new" USING ("status"::text::"DisasterStatus_new");
ALTER TYPE "DisasterStatus" RENAME TO "DisasterStatus_old";
ALTER TYPE "DisasterStatus_new" RENAME TO "DisasterStatus";
DROP TYPE "public"."DisasterStatus_old";
COMMIT;

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "DisasterType" ADD VALUE 'HEATWAVE';
ALTER TYPE "DisasterType" ADD VALUE 'STORM';
