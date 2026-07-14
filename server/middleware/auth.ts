// check user auth before accessing api
export default defineEventHandler(async (event) => {
  // get current url
  const url = event.path;

  // use the middleware only on api routes and not on api auth route
  if (!url.startsWith("/api/") || url.startsWith("/api/auth")) return;

  // get user from session
  const { user } = await getUserSession(event);

  // get authorization token
  const headerToken = getHeader(event, "Authorization");
  const token = headerToken?.slice(7);

  // compare provided token with .env api key
  const comparison = token === process.env.NUXT_API_KEY;

  // if there's no user session and no Authorization header
  if (!user && !token) {
    return sendJsonResponse<ApiError>(
      {
        error: {
          code: HTTP_UNAUTHORIZED,
          message: MSG_UNAUTHORIZED,
          details:
            "You must either authenticate in the web app or provide an Authorization : Bearer {{token}} header",
        },
      },
      HTTP_UNAUTHORIZED,
    );
  }

  // if user session does not exist and the provided token does not match the api key
  if (!user && !comparison) {
    return sendJsonResponse<ApiError>(
      {
        error: {
          code: HTTP_UNAUTHORIZED,
          message: MSG_UNAUTHORIZED,
          details: "Your bearer token does not match the api key",
        },
      },
      HTTP_UNAUTHORIZED,
    );
  }
});
