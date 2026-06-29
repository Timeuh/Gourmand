import vine from "@vinejs/vine";
import type { Infer } from "@vinejs/vine/types";

/* -------------------------------------------------------------------------- */
/*                                  Schemas                                   */
/* -------------------------------------------------------------------------- */
const INGREDIENT_SCHEMA = vine.object({
  id: vine.number(),
  name: vine.string(),
});

const INGREDIENT_CREATE_SCHEMA = vine.object({
  name: vine.string(),
});

const INGREDIENT_UPDATE_SCHEMA = vine.object({
  name: vine.string(),
});

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */
export type Ingredient = Infer<typeof INGREDIENT_SCHEMA>;

export type IngredientCreation = Infer<typeof INGREDIENT_CREATE_SCHEMA>;

export type IngredientUpdate = Infer<typeof INGREDIENT_UPDATE_SCHEMA>;

/* -------------------------------------------------------------------------- */
/*                                 Validators                                 */
/* -------------------------------------------------------------------------- */
export const ingredientValidator = vine.create(INGREDIENT_SCHEMA);

export const ingredientCreateValidator = vine.create(INGREDIENT_CREATE_SCHEMA);

export const ingredientUpdateValidator = vine.create(INGREDIENT_UPDATE_SCHEMA);
