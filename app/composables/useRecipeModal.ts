// composable to show or hide the recipe creation modal
export function useRecipeModal() {
  // if the log modal is displayed or not
  const showModal = useState<boolean>("RecipeModal", () => false);

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
