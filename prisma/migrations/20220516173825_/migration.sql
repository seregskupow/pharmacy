/*
  Warnings:

  - A unique constraint covering the columns `[login]` on the table `admin` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "admin_login_key" ON "admin"("login");
