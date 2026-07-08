/**
 *  Format a date to day day-number month year format
 *
 * @param {Date} date : The date to format
 *
 * @returns {string} : The formatted date
 */
const formatDate = (date: Date): string => {
  // Format the date to the desired format
  const formattedDate = new Intl.DateTimeFormat("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);

  // Capitalize the first letter of the formatted date
  return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
};

export default formatDate;
