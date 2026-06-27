import { Prisma } from "../../app/generated/prisma/client";

// create interface for type inference of prisma error meta field
interface PrismaDriverErrorMeta {
  modelName?: string;
  field_name?: string;
  constraint?: string;
  driverAdapterError?: {
    cause?: {
      constraint?: {
        fields?: string[];
      };
    };
  };
}

/**
 * Construct and send an error response
 *
 * @param {unknown} error the error object
 *
 * @returns {Response} the error response in json format
 */
const sendErrorResponse = (error: unknown): Response => {
  const apiError: ApiError = {
    error: {
      code: HTTP_SERVER_ERROR,
      message: MSG_SERVER_ERROR,
      details: error,
    },
  };

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    const meta = error.meta as PrismaDriverErrorMeta;

    // if the error is a duplicate error
    if (error.code === "P2002") {
      apiError.error.message = MSG_DUPLICATE_ERROR;
      apiError.error.details = {
        field:
          meta.driverAdapterError?.cause?.constraint?.fields?.[0] || "unknown",
        message: `A record for the ${meta.modelName} table with this value already exists`,
      };
    }

    // if the error is a foreign key error
    if (error.code === "P2003") {
      apiError.error.message = MSG_FOREIGN_KEY_ERROR;
      apiError.error.details = {
        table: meta.modelName,
        field: meta.field_name,
        message: `Can not create a record for the ${
          meta.modelName
        } table because the record referenced by the foreign key ${meta.constraint} does not exist`,
      };
    }

    // if the record to update does not exist
    if (error.code === "P2025") {
      apiError.error.code = HTTP_NOT_FOUND;
      apiError.error.message = MSG_NOT_FOUND;
      apiError.error.details = `Can not update table ${meta.modelName} because the record does not exist`;
    }
  }

  // if the error is a schema validation error
  if (
    typeof error === "object" &&
    error !== null &&
    "status" in error &&
    "messages" in error &&
    error.status === HTTP_SCHEMA_ERROR
  ) {
    apiError.error.code = HTTP_SCHEMA_ERROR;
    apiError.error.details = error.messages;
  }

  return Response.json(apiError, { status: apiError.error.code });
};

export default sendErrorResponse;
