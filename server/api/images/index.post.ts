// image upload endpoint
export default defineEventHandler(async (event) => {
  try {
    // read form data from the request
    const form = await readMultipartFormData(event);

    // check if form data is present
    if (!form) {
      return sendJsonResponse<ApiError>(
        {
          error: {
            code: HTTP_BAD_REQUEST,
            message: MSG_BAD_REQUEST,
            details: "No form data provided in the request",
          },
        },
        HTTP_BAD_REQUEST,
      );
    }

    // find the image and user id in the form data
    const file = form.find((f) => f.name === "image");
    const filename = form.find((f) => f.name === "filename")?.data.toString();

    // check if the image is present
    if (!file) {
      return sendJsonResponse<ApiError>(
        {
          error: {
            code: HTTP_BAD_REQUEST,
            message: MSG_BAD_REQUEST,
            details: "Missing image field",
          },
        },
        HTTP_BAD_REQUEST,
      );
    }

    // check if the filename is present
    if (!filename) {
      return sendJsonResponse<ApiError>(
        {
          error: {
            code: HTTP_BAD_REQUEST,
            message: MSG_BAD_REQUEST,
            details: "Missing filename field",
          },
        },
        HTTP_BAD_REQUEST,
      );
    }

    // check if the file is of a valid image type
    if (
      !file.filename?.endsWith(".jpg") &&
      !file.filename?.endsWith(".jpeg") &&
      !file.filename?.endsWith(".png")
    ) {
      return sendJsonResponse<ApiError>(
        {
          error: {
            code: HTTP_BAD_REQUEST,
            message: MSG_BAD_REQUEST,
            details:
              "Invalid image format. Only JPG, JPEG, and PNG files are allowed.",
          },
        },
        HTTP_BAD_REQUEST,
      );
    }

    // convert the image to webp format
    const convertedImage = await convertToWepb(file.data);

    // Get storage instance
    const storage = useStorage("uploads");

    // store file in the storage
    await storage.setItemRaw(filename, convertedImage);

    // public url for the uploaded image
    const url = `/uploads/${filename}`;

    // return the public url of the uploaded image
    return sendJsonResponse<ImageUploadResponse>(
      {
        filename,
        url,
      },
      HTTP_CREATED,
    );
  } catch (error) {
    // handle any errors that occur during the process
    return sendErrorResponse(error);
  }
});
