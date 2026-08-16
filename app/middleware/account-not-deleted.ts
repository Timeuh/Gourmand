export default defineNuxtRouteMiddleware(() => {
  // get user session
  const { user } = useUserSession();

  // redirect to parameters if the user has requested account deletion
  if (user.value?.deletion_requested_at !== null) {
    return navigateTo("/parameters");
  }
});
