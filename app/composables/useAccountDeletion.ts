// composable to delete or reactivate an account
export function useAccountDeletion() {
  // get user utils from session
  const { user, fetch } = useUserSession();

  /**
   * Soft delete user account in database
   * Set deletion date to 30 days from now
   */
  async function deleteAccount() {
    // get today and one month later dates
    const today = new Date();
    const oneMonthLater = new Date(
      today.getFullYear(),
      today.getMonth() + 1,
      today.getDate(),
    );

    // update user in database
    await $fetch(`/api/users/${user.value?.id}`, {
      method: "PUT",
      body: {
        email: user.value?.email,
        theme_id: user.value?.theme_id,
        month_objective: user.value?.month_objective,
        deletion_requested_at: today,
        deletion_scheduled_at: oneMonthLater,
      },
    });

    // refresh session
    await fetch();
  }

  /**
   * Reactivate user account in database
   * Set deletion dates to null
   */
  async function retrieveAccount() {
    // update user in database
    await $fetch(`/api/users/${user.value?.id}`, {
      method: "PUT",
      body: {
        email: user.value?.email,
        theme_id: user.value?.theme_id,
        month_objective: user.value?.month_objective,
        deletion_requested_at: null,
        deletion_scheduled_at: null,
      },
    });

    // refresh session
    await fetch();
  }

  return { deleteAccount, retrieveAccount };
}
