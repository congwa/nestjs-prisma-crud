/*
  Warnings:

  - You are about to drop the column `createAt` on the `news` table. All the data in the column will be lost.
  - You are about to drop the column `updateAt` on the `news` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "news" DROP COLUMN "createAt",
DROP COLUMN "updateAt",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3);
