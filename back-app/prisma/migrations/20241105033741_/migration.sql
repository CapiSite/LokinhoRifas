-- DropForeignKey
ALTER TABLE "raffleSkin" DROP CONSTRAINT "raffleSkin_skin_id_fkey";

-- AlterTable
ALTER TABLE "raffleSkin" ALTER COLUMN "skin_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "raffleSkin" ADD CONSTRAINT "raffleSkin_skin_id_fkey" FOREIGN KEY ("skin_id") REFERENCES "skin"("id") ON DELETE SET NULL ON UPDATE CASCADE;
