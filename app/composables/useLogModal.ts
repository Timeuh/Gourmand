// composable to show or hide the food logging modal
export function useLogModal() {
  // if the log modal is displayed or not
  const showModal = useState<boolean>("LogModal", () => false);

  // if the log modal is displayed or not
  const modalDate = useState<Date>("LogModalDate", () => new Date());

  // search input value
  const search = useState<string>("ModalSearch", () => "");

  /**
   * Open the log modal with the given date
   *
   * @param date {Date} the date to log food for
   */
  function openModal(date: Date) {
    showModal.value = true;
    modalDate.value = date;
  }

  // hide the modal
  function closeModal() {
    showModal.value = false;
  }

  // clear the search string value
  function clearSearch() {
    search.value = "";
  }

  return {
    showModal,
    modalDate,
    openModal,
    closeModal,
    search,
    clearSearch,
  };
}
