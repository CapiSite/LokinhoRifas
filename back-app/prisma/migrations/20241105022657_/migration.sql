/*
  Warnings:

  - Made the column `paymentId` on table `transaction` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "transaction" ADD COLUMN     "isProcessed" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "paymentId" SET NOT NULL;
