-- AlterTable
ALTER TABLE "participant" ADD COLUMN     "is_paid" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "is_reserved" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "reserved_until" TIMESTAMP(3);
