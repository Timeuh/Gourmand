// composable to show or hide the food logging modal
export function useDeleteCalendar() {
  // if the delete calendar modal is displayed or not
  const showModal = useState<boolean>("DeleteCalendarModal", () => false);

  // if the delete calendar modal is displayed or not
  const calendarId = useState<number>("CalendarId", () => 0);

  /**
   * Open the delete calendar modal
   *
   * @param id {number} the id of the calendar entry to delete
   */
  function openModal(id: number): void {
    calendarId.value = id;
    showModal.value = true;
  }

  // hide the modal
  function closeModal(): void {
    showModal.value = false;
  }

  /**
   * Delete the calendar entry from the database
   */
  async function deleteCalendarFromDatabase(): Promise<void> {
    // delete the calendar entry from the database
    await $fetch(`/api/calendars/${calendarId.value}`, {
      method: "DELETE",
    });
  }

  return {
    showModal,
    openModal,
    closeModal,
    deleteCalendarFromDatabase,
  };
}
