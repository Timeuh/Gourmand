import vine from "@vinejs/vine";
import type { Infer } from "@vinejs/vine/types";

/* -------------------------------------------------------------------------- */
/*                                  Schemas                                   */
/* -------------------------------------------------------------------------- */
const CALENDAR_SCHEMA = vine.object({
  id: vine.number(),
  date: vine.date({
    formats: ["iso8601"],
  }),
  food_id: vine.number(),
});

const CALENDAR_CREATE_SCHEMA = vine.object({
  date: vine.date({
    formats: ["iso8601"],
  }),
  food_id: vine.number(),
  user_id: vine.number(),
});

const CALENDAR_UPDATE_SCHEMA = vine.object({
  date: vine.date({
    formats: ["iso8601"],
  }),
  food_id: vine.number(),
});

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */
export type Calendar = Infer<typeof CALENDAR_SCHEMA>;

export type CalendarCreation = Infer<typeof CALENDAR_CREATE_SCHEMA>;

export type CalendarUpdate = Infer<typeof CALENDAR_UPDATE_SCHEMA>;

/* -------------------------------------------------------------------------- */
/*                                 Validators                                 */
/* -------------------------------------------------------------------------- */
export const calendarValidator = vine.create(CALENDAR_SCHEMA);

export const calendarCreateValidator = vine.create(CALENDAR_CREATE_SCHEMA);

export const calendarUpdateValidator = vine.create(CALENDAR_UPDATE_SCHEMA);
