/*
  Warnings:

  - Added the required column `name` to the `raffle` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "raffle" ADD COLUMN     "name" TEXT NOT NULL;
