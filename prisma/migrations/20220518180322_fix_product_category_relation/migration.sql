/*
  Warnings:

  - You are about to drop the column `category_id` on the `product` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "product" DROP CONSTRAINT "product_category_id_fkey";

-- AlterTable
ALTER TABLE "product" DROP COLUMN "category_id";
