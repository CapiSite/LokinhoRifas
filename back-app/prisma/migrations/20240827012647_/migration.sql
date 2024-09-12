-- AlterTable
ALTER TABLE "transaction" ADD COLUMN     "raffle_id" INTEGER,
ADD COLUMN     "type" TEXT,
ALTER COLUMN "paymentId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_raffle_id_fkey" FOREIGN KEY ("raffle_id") REFERENCES "raffle"("id") ON DELETE SET NULL ON UPDATE CASCADE;
