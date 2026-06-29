import vine from "@vinejs/vine";
import type { Infer } from "@vinejs/vine/types";

/* -------------------------------------------------------------------------- */
/*                                  Schemas                                   */
/* -------------------------------------------------------------------------- */
const PLATE_SCHEMA = vine.object({
  id: vine.number(),
  number: vine.number(),
});

const PLATE_CREATE_SCHEMA = vine.object({
  number: vine.number(),
});

const PLATE_UPDATE_SCHEMA = vine.object({
  number: vine.number(),
});

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */
export type Plate = Infer<typeof PLATE_SCHEMA>;

export type PlateCreation = Infer<typeof PLATE_CREATE_SCHEMA>;

export type PlateUpdate = Infer<typeof PLATE_UPDATE_SCHEMA>;

/* -------------------------------------------------------------------------- */
/*                                 Validators                                 */
/* -------------------------------------------------------------------------- */
export const plateValidator = vine.create(PLATE_SCHEMA);

export const plateCreateValidator = vine.create(PLATE_CREATE_SCHEMA);

export const plateUpdateValidator = vine.create(PLATE_UPDATE_SCHEMA);
