// composable to show or hide the food logging modal
export function useLogModal() {
  // if the log modal is displayed or not
  const showModal = useState<boolean>("LogModal", () => false);

  // show the modal
  function openModal() {
    showModal.value = true;
  }

  // hide the modal
  function closeModal() {
    showModal.value = false;
  }

  return {
    showModal,
    openModal,
    closeModal,
  };
}
