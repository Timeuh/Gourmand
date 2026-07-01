import vine from "@vinejs/vine";
import type { Infer } from "@vinejs/vine/types";

/* -------------------------------------------------------------------------- */
/*                                  Schemas                                   */
/* -------------------------------------------------------------------------- */
const COLOR_SCHEMA = vine.object({
  id: vine.number(),
  code: vine.string().regex(/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/),
});

const COLOR_CREATE_SCHEMA = vine.object({
  code: vine.string().regex(/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/),
});

const COLOR_UPDATE_SCHEMA = vine.object({
  code: vine.string().regex(/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/),
});

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */
export type Color = Infer<typeof COLOR_SCHEMA>;

export type ColorCreation = Infer<typeof COLOR_CREATE_SCHEMA>;

export type ColorUpdate = Infer<typeof COLOR_UPDATE_SCHEMA>;

/* -------------------------------------------------------------------------- */
/*                                 Validators                                 */
/* -------------------------------------------------------------------------- */
export const colorValidator = vine.create(COLOR_SCHEMA);

export const colorCreateValidator = vine.create(COLOR_CREATE_SCHEMA);

export const colorUpdateValidator = vine.create(COLOR_UPDATE_SCHEMA);
