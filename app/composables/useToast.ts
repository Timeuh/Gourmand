// composable to display a message in a toast
export function useToast() {
  // if the toast is displayed or not
  const showToast = useState<boolean>("Toast", () => false);
  // the text content of the toast
  const toastContent = useState<string>("ToastText");
  // toast timeout object
  const toastTimeout = useState<NodeJS.Timeout>("ToastTimeout");

  /**
   * Show a toast with specified text, hide the toast after 5 seconds
   *
   * @param text {string} : the text to show in the toast
   */
  function displayToast(text: string) {
    // change toast text and display it
    toastContent.value = text;
    showToast.value = true;

    // cancel existing timeout
    if (toastTimeout.value !== null) {
      clearTimeout(toastTimeout.value);
    }

    // after 5 seconds, hide the toast
    toastTimeout.value = setTimeout(() => {
      showToast.value = false;
    }, 5000);
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
