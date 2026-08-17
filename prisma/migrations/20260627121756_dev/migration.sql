/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `Color` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Food` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Ingredient` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[number]` on the table `Plate` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[time]` on the table `Preptime` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Theme` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Color_code_key" ON "Color"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Food_name_key" ON "Food"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Ingredient_name_key" ON "Ingredient"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Plate_number_key" ON "Plate"("number");

-- CreateIndex
CREATE UNIQUE INDEX "Preptime_time_key" ON "Preptime"("time");

-- CreateIndex
CREATE UNIQUE INDEX "Theme_name_key" ON "Theme"("name");
