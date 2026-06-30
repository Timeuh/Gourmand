import { writeFile, mkdir } from "fs/promises";
import { join } from "path";

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

    // create the directory for storing uploaded images
    const dir = join(process.cwd(), "public/uploads/foods");

    // create directory if it doesn't exist
    await mkdir(dir, {
      recursive: true,
    });

    // create file path
    const filepath = join(dir, filename);

    // write file to disk
    await writeFile(filepath, file.data);

    // public url for the uploaded image
    const url = `/uploads/foods/${filename}`;

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
