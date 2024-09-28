/*
  Warnings:

  - You are about to drop the column `is_paid` on the `participant` table. All the data in the column will be lost.
  - You are about to drop the column `is_reserved` on the `participant` table. All the data in the column will be lost.
  - You are about to drop the column `reserved_until` on the `participant` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "participant" DROP COLUMN "is_paid",
DROP COLUMN "is_reserved",
DROP COLUMN "reserved_until";
