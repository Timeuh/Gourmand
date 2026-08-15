// composable to display a message in a toast
export function useToast() {
  // if the toast is displayed or not
  const showToast = useState<boolean>("Toast", () => false);
  // the text content of the toast
  const toastContent = useState<string>("Bonjour");

  /**
   * Show a toast with specified text
   *
   * @param text {string} : the text to show in the toast
   */
  function displayToast(text: string) {
    // change toast text and display it
    toastContent.value = text;
    showToast.value = true;

    // after 5 seconds, hide the toast
    setTimeout(() => (showToast.value = false), 5000);
  }

  /**
   * Close the toast before it automatically closes
   */
  function closeToast() {
    showToast.value = false;
  }

  return {
    showToast,
    toastContent,
    displayToast,
    closeToast,
  };
}
