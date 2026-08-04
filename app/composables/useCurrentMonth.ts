// composable to manage the current month in the calendar
export function useCurrentMonth() {
  // get today's date
  const today = new Date();

  // current month date
  const currentMonth = useState<Date>(
    "CurrentMonth",
    () => new Date(today.getFullYear(), today.getMonth(), 1),
  );

  /**
   * change current month
   *
   * @param offset {number} -1 for previous month, 1 for next month
   */
  function changeMonth(offset: number) {
    const newMonth = new Date(
      currentMonth.value.getFullYear(),
      currentMonth.value.getMonth() + offset,
      1,
    );
    currentMonth.value = newMonth;
  }

  return { currentMonth, changeMonth };
}
