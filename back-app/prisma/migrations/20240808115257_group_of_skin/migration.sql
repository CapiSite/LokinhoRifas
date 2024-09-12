/*
  Warnings:

  - You are about to drop the column `skin_id` on the `raffle` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "raffle" DROP CONSTRAINT "raffle_skin_id_fkey";

-- AlterTable
ALTER TABLE "raffle" DROP COLUMN "skin_id",
ADD COLUMN     "raffleGroup_id" INTEGER;

-- CreateTable
CREATE TABLE "raffleGroup" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "raffleGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "raffleSkin" (
    "id" SERIAL NOT NULL,
    "raffle_id" INTEGER NOT NULL,
    "skin_id" INTEGER NOT NULL,
    "skinName" TEXT NOT NULL,
    "skinValue" DOUBLE PRECISION NOT NULL,
    "skinType" TEXT NOT NULL,
    "skinPicture" TEXT NOT NULL,

    CONSTRAINT "raffleSkin_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "raffle" ADD CONSTRAINT "raffle_raffleGroup_id_fkey" FOREIGN KEY ("raffleGroup_id") REFERENCES "raffleGroup"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "raffleSkin" ADD CONSTRAINT "raffleSkin_skin_id_fkey" FOREIGN KEY ("skin_id") REFERENCES "skin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "raffleSkin" ADD CONSTRAINT "raffleSkin_raffle_id_fkey" FOREIGN KEY ("raffle_id") REFERENCES "raffle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
