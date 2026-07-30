/**
 *  Format a date to Day - number - Month format, with exceptions for today and yesterday
 *
 * @param {Date} date : The date to format
 *
 * @returns {string} : The formatted date
 */
const formatWeekDate = (date: Date): string => {
  // get today and yesterday dates
  const today = new Date();
  const yesterday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - 1,
  );

  // check if the date is today
  if (date.toDateString() === today.toDateString()) return "Aujourd'hui";

  // check if the date is yesterday
  if (date.toDateString() === yesterday.toDateString()) return "Hier";

  // Format the date to the desired format
  const formattedDate = new Intl.DateTimeFormat("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(date);

  // Capitalize the first letter of the formatted date
  return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
};

export default formatWeekDate;
