/*
  Warnings:

  - You are about to drop the column `orderstatus_id` on the `order` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "order" DROP CONSTRAINT "order_orderstatus_id_fkey";

-- AlterTable
ALTER TABLE "order" DROP COLUMN "orderstatus_id";
