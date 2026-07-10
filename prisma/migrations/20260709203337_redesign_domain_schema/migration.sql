/*
  Warnings:

  - You are about to drop the column `latitude` on the `Disaster` table. All the data in the column will be lost.
  - You are about to drop the column `longitude` on the `Disaster` table. All the data in the column will be lost.
  - You are about to drop the column `latitude` on the `Incident` table. All the data in the column will be lost.
  - You are about to drop the column `longitude` on the `Incident` table. All the data in the column will be lost.
  - You are about to drop the column `latitude` on the `Shelter` table. All the data in the column will be lost.
  - You are about to drop the column `longitude` on the `Shelter` table. All the data in the column will be lost.
  - Added the required column `locationId` to the `Agency` table without a default value. This is not possible if the table is not empty.
  - Added the required column `locationId` to the `Disaster` table without a default value. This is not possible if the table is not empty.
  - Added the required column `locationId` to the `Incident` table without a default value. This is not possible if the table is not empty.
  - Added the required column `locationId` to the `Shelter` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Agency" ADD COLUMN     "contactNumber" TEXT,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "email" TEXT,
ADD COLUMN     "locationId" TEXT NOT NULL,
ADD COLUMN     "website" TEXT;

-- AlterTable
ALTER TABLE "Disaster" DROP COLUMN "latitude",
DROP COLUMN "longitude",
ADD COLUMN     "locationId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Incident" DROP COLUMN "latitude",
DROP COLUMN "longitude",
ADD COLUMN     "locationId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Shelter" DROP COLUMN "latitude",
DROP COLUMN "longitude",
ADD COLUMN     "locationId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Coordinates" (
    "id" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Coordinates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Location" (
    "id" TEXT NOT NULL,
    "address" TEXT,
    "city" TEXT,
    "state" TEXT,
    "country" TEXT,
    "postalCode" TEXT,
    "coordinatesId" TEXT NOT NULL,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Alert" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "disasterId" TEXT,
    "severity" "Severity" NOT NULL,
    "isActive" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Alert_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Coordinates_latitude_longitude_idx" ON "Coordinates"("latitude", "longitude");

-- CreateIndex
CREATE UNIQUE INDEX "Location_coordinatesId_key" ON "Location"("coordinatesId");

-- CreateIndex
CREATE INDEX "Alert_isActive_idx" ON "Alert"("isActive");

-- CreateIndex
CREATE INDEX "Agency_name_idx" ON "Agency"("name");

-- CreateIndex
CREATE INDEX "Disaster_type_idx" ON "Disaster"("type");

-- CreateIndex
CREATE INDEX "Disaster_severity_idx" ON "Disaster"("severity");

-- CreateIndex
CREATE INDEX "Disaster_status_idx" ON "Disaster"("status");

-- CreateIndex
CREATE INDEX "Incident_status_idx" ON "Incident"("status");

-- CreateIndex
CREATE INDEX "Incident_severity_idx" ON "Incident"("severity");

-- CreateIndex
CREATE INDEX "Shelter_isOpen_idx" ON "Shelter"("isOpen");

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_coordinatesId_fkey" FOREIGN KEY ("coordinatesId") REFERENCES "Coordinates"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Agency" ADD CONSTRAINT "Agency_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Disaster" ADD CONSTRAINT "Disaster_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Shelter" ADD CONSTRAINT "Shelter_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Incident" ADD CONSTRAINT "Incident_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Alert" ADD CONSTRAINT "Alert_disasterId_fkey" FOREIGN KEY ("disasterId") REFERENCES "Disaster"("id") ON DELETE SET NULL ON UPDATE CASCADE;
