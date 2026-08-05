// composable to manage the current month in the calendar
export function useCalendarUtils() {
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

  // current selected date
  const selectedDate = useState<CalendarDay>("SelectedDate", () => ({
    day: today.getDate(),
    month: today.getMonth(),
    year: today.getFullYear(),
  }));

  /**
   * Select a date in the calendar
   *
   * @param day {CalendarDay | null} the day to select, or null to deselect
   */
  function selectDate(day: CalendarDay | null): void {
    if (!day) return;

    selectedDate.value = day;
    showFoods.value = true;
  }

  // show mobile foods panel
  const showFoods = useState<boolean>("ShowFoods", () => false);

  /**
   * Hide the mobile foods panel
   */
  function hideFoodsPanel(): void {
    showFoods.value = false;
  }

  return {
    currentMonth,
    changeMonth,
    selectedDate,
    selectDate,
    showFoods,
    hideFoodsPanel,
  };
}
