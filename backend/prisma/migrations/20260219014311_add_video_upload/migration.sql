-- AlterTable
ALTER TABLE "videos" ADD COLUMN     "videoPath" TEXT,
ALTER COLUMN "url" DROP NOT NULL;
