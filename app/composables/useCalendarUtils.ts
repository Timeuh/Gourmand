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
   * @param offset {number} -1 for previous month, 1 for next month, cause of the offset
   */
  function changeMonth(offset: number) {
    const newMonth = new Date(
      currentMonth.value.getFullYear(),
      currentMonth.value.getMonth() + offset,
      1,
    );
    currentMonth.value = newMonth;
  }

  // current selected date (+1 to month because JS months are 0-indexed)
  const selectedDate = useState<CalendarDay>("SelectedDate", () => ({
    day: today.getDate(),
    month: today.getMonth() + 1,
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

  // format selected date as "YYYY-MM-DD"
  const formatedSelectedDate = computed(
    () =>
      `${selectedDate.value.year}-${selectedDate.value.month}-${selectedDate.value.day}`,
  );

  // fetch calendar data for the selected date
  const { data, refresh: refreshCalendar } = useFetch<
    ApiCollection<FullCalendar>
  >("/api/calendars", {
    key: "CalendarDay",
    query: computed(() => ({
      date: formatedSelectedDate.value,
      fullContent: true,
    })),
  });

  /**
   * Reset the selected date to today
   */
  function resetSelectedDate(): void {
    selectedDate.value = {
      day: today.getDate(),
      month: today.getMonth() + 1,
      year: today.getFullYear(),
    };
  }

  return {
    currentMonth,
    changeMonth,
    selectedDate,
    selectDate,
    showFoods,
    hideFoodsPanel,
    formatedSelectedDate,
    data,
    refreshCalendar,
    resetSelectedDate,
  };
}
