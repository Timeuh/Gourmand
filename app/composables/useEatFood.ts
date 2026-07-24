// composable to add a food to foods eaten today
export function useEatFood() {
  // get home data refresh function and user session
  const { refresh } = useFetch("/api/home", { key: "home" });
  const { user, loggedIn } = useUserSession();

  // init error state
  const cardError = ref("");

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
          date: new Date().toISOString(),
          food_id: foodId,
          user_id: user.value?.id,
        },
      });

      // refresh the home data
      refresh();
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
  };
}
