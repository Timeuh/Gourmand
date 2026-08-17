/*
  Warnings:

  - A unique constraint covering the columns `[name,user_id]` on the table `Food` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Food_name_key";

-- CreateIndex
CREATE UNIQUE INDEX "Food_name_user_id_key" ON "Food"("name", "user_id");
