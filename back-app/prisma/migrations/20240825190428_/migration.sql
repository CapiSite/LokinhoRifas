/*
  Warnings:

  - You are about to drop the column `userId` on the `raffle` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "raffle" DROP CONSTRAINT "raffle_userId_fkey";

-- AlterTable
ALTER TABLE "raffle" DROP COLUMN "userId";
