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

  // format current month as "YYYY-MM-DD"
  const formatedSelectedMonth = computed(
    () =>
      `${currentMonth.value.getFullYear()}-${currentMonth.value.getMonth() + 1}-${currentMonth.value.getDate()}`,
  );

  // fetch calendar data for the selected date
  const { data: calendarDayData, refresh: refreshCalendarDay } = useFetch<
    ApiCollection<FullCalendar>
  >("/api/calendars", {
    key: "CalendarDay",
    query: computed(() => ({
      date: formatedSelectedDate.value,
      fullContent: true,
    })),
  });

  // fetch calendar data for the selected month
  const { data: calendarMonthData, refresh: refreshCalendarMonth } = useFetch<
    ApiCollection<FullCalendar>
  >("/api/calendars", {
    key: "CalendarMonth",
    query: computed(() => ({
      month: formatedSelectedMonth.value,
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

  // days of the week
  const weekDays: string[] = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

  // days of the week, for desktop format
  const desktopWeekDays: string[] = [
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
    "Dimanche",
  ];

  // get current month date's year and month
  const year = computed(() => currentMonth.value.getFullYear());
  const month = computed(() => currentMonth.value.getMonth());

  // number of days in the month
  const daysInMonth = computed(() => {
    return new Date(year.value, month.value + 1, 0).getDate();
  });

  // first days of the month if the month doesn't start on a monday
  const firstWeekDay = computed(() => {
    return (new Date(year.value, month.value, 1).getDay() + 6) % 7;
  });

  // days to fill the end of the month
  const monthFillDays = computed(() => {
    // check if the calendar will count 5 or 6 lines
    const totaldays = firstWeekDay.value >= 5 ? 42 : 35;
    return totaldays - daysInMonth.value - firstWeekDay.value;
  });

  // days of the month with empty cases for the first week if the 1st isn't monday
  const calendarDays: ComputedRef<Array<CalendarDay | null>> = computed(() => {
    return [
      ...Array.from({ length: firstWeekDay.value }, () => null),
      ...Array.from({ length: daysInMonth.value }, (_, index) => {
        return {
          day: index + 1,
          month: month.value + 1,
          year: year.value,
        };
      }),
      ...Array.from({ length: monthFillDays.value }, () => null),
    ];
  });

  /**
   * Check if the given day is the same as the compareTo day
   *
   * @param day {CalendarDay | null} CalendarDay of the given day to check
   * @param compareTo {CalendarDay} CalendarDay to compare with
   */
  function isDate(day: CalendarDay | null, compareTo: CalendarDay): boolean {
    if (!day) return false;

    return (
      day.day === compareTo.day &&
      day.month === compareTo.month &&
      day.year === compareTo.year
    );
  }

  // today as a CalendarDay object
  const todayDate: CalendarDay = {
    day: today.getDate(),
    month: today.getMonth() + 1,
    year: today.getFullYear(),
  };

  return {
    currentMonth,
    changeMonth,
    selectedDate,
    selectDate,
    showFoods,
    hideFoodsPanel,
    formatedSelectedDate,
    calendarDayData,
    refreshCalendarDay,
    resetSelectedDate,
    weekDays,
    calendarDays,
    desktopWeekDays,
    isDate,
    todayDate,
    calendarMonthData,
    refreshCalendarMonth,
  };
}
