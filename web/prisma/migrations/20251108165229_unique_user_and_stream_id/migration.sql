/*
  Warnings:

  - A unique constraint covering the columns `[userId,streamId]` on the table `upvotes` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "upvotes_userId_streamId_key" ON "upvotes"("userId", "streamId");
