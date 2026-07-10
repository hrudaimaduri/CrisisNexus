/*
  Warnings:

  - You are about to drop the column `latitude` on the `Agency` table. All the data in the column will be lost.
  - You are about to drop the column `longitude` on the `Agency` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Agency" DROP COLUMN "latitude",
DROP COLUMN "longitude";
