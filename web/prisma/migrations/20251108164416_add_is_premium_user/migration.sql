/*
  Warnings:

  - You are about to drop the `ratelimit` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "user" ADD COLUMN     "isPremiumUser" BOOLEAN NOT NULL DEFAULT true;

-- DropTable
DROP TABLE "ratelimit";
