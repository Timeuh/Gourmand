import vine from "@vinejs/vine";
import type { Infer } from "@vinejs/vine/types";

/* -------------------------------------------------------------------------- */
/*                                  Schemas                                   */
/* -------------------------------------------------------------------------- */
const USER_SCHEMA = vine.object({
  id: vine.number(),
  email: vine.string().email(),
  theme_id: vine.number(),
});

const USER_CREATE_SCHEMA = vine.object({
  email: vine.string().email(),
  theme_id: vine.number(),
});

const USER_UPDATE_SCHEMA = vine.object({
  email: vine.string().email(),
  theme_id: vine.number(),
});

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */
export type User = Infer<typeof USER_SCHEMA>;

export type UserCreation = Infer<typeof USER_CREATE_SCHEMA>;

export type UserUpdate = Infer<typeof USER_UPDATE_SCHEMA>;

/* -------------------------------------------------------------------------- */
/*                                 Validators                                 */
/* -------------------------------------------------------------------------- */
export const userValidator = vine.create(USER_SCHEMA);

export const userCreateValidator = vine.create(USER_CREATE_SCHEMA);

export const userUpdateValidator = vine.create(USER_UPDATE_SCHEMA);
