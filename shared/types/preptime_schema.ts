import vine from "@vinejs/vine";
import type { Infer } from "@vinejs/vine/types";

/* -------------------------------------------------------------------------- */
/*                                  Schemas                                   */
/* -------------------------------------------------------------------------- */
const PREPTIME_SCHEMA = vine.object({
  id: vine.number(),
  time: vine
    .string()
    .regex(/^(?:[1-9][0-9]?h(?:[0-5][0-9])?|(?:[0-9]|[1-9][0-9])min)$/),
});

const PREPTIME_CREATE_SCHEMA = vine.object({
  time: vine
    .string()
    .regex(/^(?:[1-9][0-9]?h(?:[0-5][0-9])?|(?:[0-9]|[1-9][0-9])min)$/),
});

const PREPTIME_UPDATE_SCHEMA = vine.object({
  time: vine
    .string()
    .regex(/^(?:[1-9][0-9]?h(?:[0-5][0-9])?|(?:[0-9]|[1-9][0-9])min)$/),
});

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */
export type Preptime = Infer<typeof PREPTIME_SCHEMA>;

export type PreptimeCreation = Infer<typeof PREPTIME_CREATE_SCHEMA>;

export type PreptimeUpdate = Infer<typeof PREPTIME_UPDATE_SCHEMA>;

/* -------------------------------------------------------------------------- */
/*                                 Validators                                 */
/* -------------------------------------------------------------------------- */
export const preptimeValidator = vine.create(PREPTIME_SCHEMA);

export const preptimeCreateValidator = vine.create(PREPTIME_CREATE_SCHEMA);

export const preptimeUpdateValidator = vine.create(PREPTIME_UPDATE_SCHEMA);
