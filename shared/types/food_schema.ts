import vine from "@vinejs/vine";
import type { Infer } from "@vinejs/vine/types";

/* -------------------------------------------------------------------------- */
/*                                  Schemas                                   */
/* -------------------------------------------------------------------------- */
const FOOD_SCHEMA = vine.object({
  id: vine.number(),
  name: vine.string(),
  image: vine.string(),
  plate_id: vine.number(),
  preptime_id: vine.number(),
});

const FOOD_CREATE_SCHEMA = vine.object({
  name: vine.string(),
  image: vine.string(),
  plate_id: vine.number(),
  preptime_id: vine.number(),
});

const FOOD_UPDATE_SCHEMA = vine.object({
  name: vine.string(),
  image: vine.string(),
  plate_id: vine.number(),
  preptime_id: vine.number(),
});

const FOOD_INGREDIENT_LINK_SCHEMA = vine.object({
  food_id: vine.number(),
  ingredient_id: vine.number(),
});

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */
export type Food = Infer<typeof FOOD_SCHEMA>;

export type FoodCreation = Infer<typeof FOOD_CREATE_SCHEMA>;

export type FoodUpdate = Infer<typeof FOOD_UPDATE_SCHEMA>;

export type FoodIngredientLink = Infer<typeof FOOD_INGREDIENT_LINK_SCHEMA>;

/* -------------------------------------------------------------------------- */
/*                                 Validators                                 */
/* -------------------------------------------------------------------------- */
export const foodValidator = vine.create(FOOD_SCHEMA);

export const foodCreateValidator = vine.create(FOOD_CREATE_SCHEMA);

export const foodUpdateValidator = vine.create(FOOD_UPDATE_SCHEMA);

export const foodIngredientLinkValidator = vine.create(
  FOOD_INGREDIENT_LINK_SCHEMA,
);
