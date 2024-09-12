/*
  Warnings:

  - You are about to drop the column `facebookId` on the `user` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "user_facebookId_key";

-- AlterTable
ALTER TABLE "user" DROP COLUMN "facebookId",
ADD COLUMN     "passwordResetToken" TEXT,
ADD COLUMN     "tokenExpiration" TIMESTAMP(3);
