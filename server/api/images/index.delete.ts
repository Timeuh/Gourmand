// delete a category endpoint
export default defineEventHandler(async (event) => {
  try {
    // read the request body and validate its data
    const body = await readBody<{ filename: string }>(event);

    // get user from session
    const { user } = await getUserSession(event);

    // get user id from filename
    const imageId = body.filename.split("/uploads/")[1]?.split("_")[0];

    // check if the authenticated user is the owner of the image
    if (user?.id.toString() !== imageId) {
      return sendJsonResponse<ApiError>(
        {
          error: {
            code: HTTP_UNAUTHORIZED,
            message: MSG_UNAUTHORIZED,
            details:
              "You are not authorized to delete this image. The image does not belong to the authenticated user.",
          },
        },
        HTTP_UNAUTHORIZED,
      );
    }

    // get storage instance
    const storage = useStorage("uploads");

    // remove image from storage
    await storage.removeItem(body.filename.split("/uploads/").pop()!);

    // return a success response with the deleted filename
    return sendJsonResponse<{ message: string; filename: string }>(
      { message: "Successfully deleted image", filename: body.filename },
      HTTP_OK,
    );
  } catch (error) {
    // handle any errors that occur during the process
    return sendErrorResponse(error);
  }
});
