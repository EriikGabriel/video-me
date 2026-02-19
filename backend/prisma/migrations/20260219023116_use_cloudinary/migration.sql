/*
  Warnings:

  - You are about to drop the column `videoPath` on the `videos` table. All the data in the column will be lost.
  - Made the column `url` on table `videos` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "videos" DROP COLUMN "videoPath",
ADD COLUMN     "cloudinaryId" TEXT,
ALTER COLUMN "url" SET NOT NULL;
