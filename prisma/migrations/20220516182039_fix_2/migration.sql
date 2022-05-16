-- DropForeignKey
ALTER TABLE "category" DROP CONSTRAINT "category_parent_category_id_fkey";

-- AlterTable
ALTER TABLE "category" ALTER COLUMN "parent_category_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "category" ADD CONSTRAINT "category_parent_category_id_fkey" FOREIGN KEY ("parent_category_id") REFERENCES "category"("id") ON DELETE SET NULL ON UPDATE CASCADE;
