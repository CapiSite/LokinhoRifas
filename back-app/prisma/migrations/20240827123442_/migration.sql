/*
  Warnings:

  - Made the column `type` on table `transaction` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "transaction" ALTER COLUMN "type" SET NOT NULL;
