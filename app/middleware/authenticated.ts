export default defineNuxtRouteMiddleware(() => {
  // get user session
  const { loggedIn } = useUserSession();

  // redirect the user to the login page if they're not authenticated
  if (!loggedIn.value) {
    return navigateTo("/login");
  }
});
