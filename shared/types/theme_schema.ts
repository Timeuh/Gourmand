import vine from "@vinejs/vine";
import type { Infer } from "@vinejs/vine/types";

/* -------------------------------------------------------------------------- */
/*                                  Schemas                                   */
/* -------------------------------------------------------------------------- */
const THEME_SCHEMA = vine.object({
  id: vine.number(),
  name: vine.string(),
});

const THEME_CREATE_SCHEMA = vine.object({
  name: vine.string(),
});

const THEME_UPDATE_SCHEMA = vine.object({
  name: vine.string(),
});

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */
export type Theme = Infer<typeof THEME_SCHEMA>;

export type ThemeCreation = Infer<typeof THEME_CREATE_SCHEMA>;

export type ThemeUpdate = Infer<typeof THEME_UPDATE_SCHEMA>;

/* -------------------------------------------------------------------------- */
/*                                 Validators                                 */
/* -------------------------------------------------------------------------- */
export const themeValidator = vine.create(THEME_SCHEMA);

export const themeCreateValidator = vine.create(THEME_CREATE_SCHEMA);

export const themeUpdateValidator = vine.create(THEME_UPDATE_SCHEMA);
