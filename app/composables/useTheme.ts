// composable to control app theme
export function useTheme() {
  // get user session utils
  const { user, fetch } = useUserSession();

  // get toast display utils
  const { displayToast } = useToast();

  // fetch themes from database
  const { data } = useFetch<ApiCollection<FullTheme>>("/api/themes", {
    query: {
      fullContent: true,
    },
    key: "AppThemes",
  });

  // currently selected theme
  const currentTheme = useState<number>(
    "AppTheme",
    () => user.value?.theme_id || 1,
  );

  // current theme's name
  const currentThemeName = computed(
    () =>
      data.value?.items.find((theme) => theme.id == currentTheme.value)?.name,
  );

  // update user theme in database and session
  async function updateTheme() {
    // do nothing if theme is the currently used one
    if (currentTheme.value == user.value?.theme_id) return;

    // update in database and in user session
    await $fetch(`/api/users/${user.value?.id || 0}`, {
      method: "PUT",
      body: {
        email: user.value?.email,
        theme_id: currentTheme.value,
        month_objective: user.value?.month_objective,
      },
    });

    // refresh session
    await fetch();

    // display a toast to tell user the food has been added
    displayToast("Thème modifié");
  }

  return {
    data,
    currentTheme,
    updateTheme,
    currentThemeName,
  };
}
