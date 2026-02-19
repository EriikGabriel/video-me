/*
  Warnings:

  - Made the column `cloudinaryId` on table `videos` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "videos" ALTER COLUMN "cloudinaryId" SET NOT NULL;
