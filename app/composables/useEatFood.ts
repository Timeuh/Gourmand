// composable to add a food to foods eaten today
export function useEatFood() {
  // get log modal utils
  const { closeModal, modalDate } = useLogModal();

  // get toast display method
  const { displayToast } = useToast();

  // get calendar refresh function
  const { refreshCalendarDay, refreshCalendarMonth } = useCalendarUtils();

  // get the function to refresh home data
  const { refresh: refreshHome } = useFetch("/api/home", { key: "home" });

  // get the function to refresh food data
  const { refresh: refreshFoods } = useFetch("/api/foods?lastEaten=true", {
    key: "LogModal",
  });

  // get user session
  const { user, loggedIn } = useUserSession();

  // init error state
  const cardError = useState("CardError", () => "");

  /**
   * Make current user register food in their calendar
   *
   * @param foodId {number | undefined} : the id of the food to it
   */
  async function eatFood(foodId: number | undefined) {
    // only continue if the user is logged and provides a food id
    if (!foodId || !loggedIn.value) return;

    try {
      // register the food in user calendar
      await $fetch("/api/calendars", {
        method: "POST",
        body: {
          date: modalDate.value.toISOString(),
          food_id: foodId,
          user_id: user.value?.id,
        },
      });

      // refresh the data and close the log modal in case it was open
      refreshHome();
      refreshFoods();
      refreshCalendarDay();
      refreshCalendarMonth();
      closeModal();

      // display a toast to tell user the food has been added
      displayToast("Plat ajouté");
    } catch {
      // display an error in case something goes wrong
      cardError.value = "Erreur pendant l'ajout";

      setTimeout(() => {
        cardError.value = "";
      }, 5000);
    }
  }

  return {
    eatFood,
    cardError,
    refreshHome,
  };
}
