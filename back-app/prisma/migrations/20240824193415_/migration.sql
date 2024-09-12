/*
  Warnings:

  - You are about to drop the column `raffleGroup_id` on the `raffle` table. All the data in the column will be lost.
  - You are about to drop the column `winner_id` on the `raffle` table. All the data in the column will be lost.
  - You are about to drop the `creditCard` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `raffleGroup` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userId` to the `raffle` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "creditCard" DROP CONSTRAINT "creditCard_user_id_fkey";

-- DropForeignKey
ALTER TABLE "raffle" DROP CONSTRAINT "raffle_raffleGroup_id_fkey";

-- DropForeignKey
ALTER TABLE "raffle" DROP CONSTRAINT "raffle_winner_id_fkey";

-- AlterTable
ALTER TABLE "raffle" DROP COLUMN "raffleGroup_id",
DROP COLUMN "winner_id",
ADD COLUMN     "userId" INTEGER NOT NULL,
ALTER COLUMN "is_active" SET DEFAULT E'Ativa';

-- AlterTable
ALTER TABLE "raffleSkin" ADD COLUMN     "winner_id" INTEGER;

-- DropTable
DROP TABLE "creditCard";

-- DropTable
DROP TABLE "raffleGroup";

-- CreateTable
CREATE TABLE "transaction" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "paymentId" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "status_detail" TEXT,
    "paymentMethod" TEXT NOT NULL,
    "transactionAmount" DOUBLE PRECISION NOT NULL,
    "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateApproved" TIMESTAMP(3),
    "dateLastUpdated" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "transaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "transaction_paymentId_key" ON "transaction"("paymentId");

-- AddForeignKey
ALTER TABLE "raffle" ADD CONSTRAINT "raffle_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "raffleSkin" ADD CONSTRAINT "raffleSkin_winner_id_fkey" FOREIGN KEY ("winner_id") REFERENCES "participant"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
