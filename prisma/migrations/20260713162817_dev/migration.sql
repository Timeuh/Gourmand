/*
  Warnings:

  - You are about to drop the column `plate_id` on the `Food` table. All the data in the column will be lost.
  - You are about to drop the `Plate` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `plates` to the `Food` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category_id` to the `Ingredient` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Food" DROP CONSTRAINT "Food_plate_id_fkey";

-- AlterTable
ALTER TABLE "Food" DROP COLUMN "plate_id",
ADD COLUMN     "plates" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Ingredient" ADD COLUMN     "category_id" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Plate";

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- AddForeignKey
ALTER TABLE "Ingredient" ADD CONSTRAINT "Ingredient_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
