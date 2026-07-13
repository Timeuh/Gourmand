import vine from "@vinejs/vine";
import type { Infer } from "@vinejs/vine/types";

/* -------------------------------------------------------------------------- */
/*                                  Schemas                                   */
/* -------------------------------------------------------------------------- */
const CATEGORY_SCHEMA = vine.object({
  id: vine.number(),
  name: vine.string(),
});

const CATEGORY_CREATE_SCHEMA = vine.object({
  name: vine.string(),
});

const CATEGORY_UPDATE_SCHEMA = vine.object({
  name: vine.string(),
});

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */
export type Category = Infer<typeof CATEGORY_SCHEMA>;

export type CategoryCreation = Infer<typeof CATEGORY_CREATE_SCHEMA>;

export type CategoryUpdate = Infer<typeof CATEGORY_UPDATE_SCHEMA>;

/* -------------------------------------------------------------------------- */
/*                                 Validators                                 */
/* -------------------------------------------------------------------------- */
export const categoryValidator = vine.create(CATEGORY_SCHEMA);

export const categoryCreateValidator = vine.create(CATEGORY_CREATE_SCHEMA);

export const categoryUpdateValidator = vine.create(CATEGORY_UPDATE_SCHEMA);
