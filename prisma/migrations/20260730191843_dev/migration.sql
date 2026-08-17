-- DropForeignKey
ALTER TABLE "Calendar" DROP CONSTRAINT "Calendar_food_id_fkey";

-- DropForeignKey
ALTER TABLE "Food_Ingredient" DROP CONSTRAINT "Food_Ingredient_food_id_fkey";

-- DropForeignKey
ALTER TABLE "Food_Ingredient" DROP CONSTRAINT "Food_Ingredient_ingredient_id_fkey";

-- AddForeignKey
ALTER TABLE "Food_Ingredient" ADD CONSTRAINT "Food_Ingredient_food_id_fkey" FOREIGN KEY ("food_id") REFERENCES "Food"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Food_Ingredient" ADD CONSTRAINT "Food_Ingredient_ingredient_id_fkey" FOREIGN KEY ("ingredient_id") REFERENCES "Ingredient"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Calendar" ADD CONSTRAINT "Calendar_food_id_fkey" FOREIGN KEY ("food_id") REFERENCES "Food"("id") ON DELETE CASCADE ON UPDATE CASCADE;
