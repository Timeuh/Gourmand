// log in with google oauth
export default defineOAuthGoogleEventHandler({
  async onSuccess(event, { user }) {
    try {
      // check is user already exists in the database
      const existingUser: User | null = await prisma.user.findUnique({
        where: {
          email: user.email,
        },
      });

      // if the user exists, set the session and return the existing user
      if (existingUser) {
        await setUserSession(event, {
          user: {
            id: existingUser.id,
            email: existingUser.email,
            theme_id: existingUser.theme_id,
            name: user.given_name || user.name,
            picture: user.picture,
            month_objective: existingUser.month_objective,
          },
        });

        return sendRedirect(event, "/");
      }

      // create a new user in the database
      const newUser: User = await prisma.user.create({
        data: {
          email: user.email,
          theme_id: 10000,
          month_objective: 15,
        },
      });

      // set the session for the newly created user
      await setUserSession(event, {
        user: {
          id: newUser.id,
          email: newUser.email,
          theme_id: newUser.theme_id,
          name: user.given_name || user.name,
          picture: user.picture,
          month_objective: newUser.month_objective,
        },
      });

      // redirect to home
      return sendRedirect(event, "/");
    } catch (error) {
      // log error and redirect to home with error message
      console.error("Google Auth Error:", error);
      return sendRedirect(event, "/?error=auth_failed");
    }
  },
  onError(event, error) {
    // log error and redirect to home with error message
    console.error("Google Auth Error:", error);
    return sendRedirect(event, "/?error=auth_failed");
  },
});
