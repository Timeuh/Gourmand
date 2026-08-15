/**
 *  Calculate number of days between provided date and today
 *
 * @param {Date} date : The date we want to know days difference
 *
 * @returns {string} : A string saying the number of days difference
 */
const daysFromToday = (date: Date | null): string => {
  if (!date) return "Il y a 0 jours";

  // get today's date
  const today = new Date();

  // set hours to 0 to ignore hour difference
  today.setHours(0, 0, 0, 0);
  date.setHours(0, 0, 0, 0);

  // calculate timestamps difference
  const difference = today.getTime() - date.getTime();

  // convert difference in a number of days by dividing with the duration of 1 day
  const dayDifference = Math.round(difference / (1000 * 3600 * 24));

  // if today
  if (dayDifference === 0) return "Aujourd'hui";

  // if yesterday
  if (dayDifference === 1) return "Hier";

  // return time difference
  return `Il y a ${dayDifference} jours`;
};

export default daysFromToday;
