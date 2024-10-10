/*
  Warnings:

  - Made the column `createdAt` on table `raffleSkin` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "raffleSkin" ALTER COLUMN "createdAt" SET NOT NULL;
