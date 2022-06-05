/*
  Warnings:

  - A unique constraint covering the columns `[cart_id]` on the table `cart_to_product` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[product_id]` on the table `cart_to_product` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "cart_to_product_cart_id_key" ON "cart_to_product"("cart_id");

-- CreateIndex
CREATE UNIQUE INDEX "cart_to_product_product_id_key" ON "cart_to_product"("product_id");
