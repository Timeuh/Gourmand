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
  // calculate timestamps difference
  const difference = today.getTime() - date.getTime();
  // convert difference in a number of days by dividing with the duration of 1 day
  const dayDifference = Math.round(difference / (1000 * 3600 * 24));

  // if the two dates aren't today or in the future, remove 1 day to get accurate difference
  // e.g between 05/20 and 05/25, there's a 6 days difference but we say it's 5 days from now
  const finalDefference =
    dayDifference <= 0 ? dayDifference : dayDifference - 1;

  // return a string with the days difference
  return `Il y a ${finalDefference} jours`;
};

export default daysFromToday;
