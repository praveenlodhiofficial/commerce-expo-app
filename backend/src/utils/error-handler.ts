import { Response } from "express";
import { z, ZodError } from "zod";

import { ApiError } from "@/utils/api-error";

/* ============================================================================= */
/*                            ERROR RESPONSE TYPE                               */
/* ============================================================================= */
type ErrorResponse = {
  success: boolean;
  message: string;
  errors?: unknown;
  stack?: string;
};

/* ============================================================================= */
/*                           SEND ERROR RESPONSE                                */
/* ============================================================================= */

export function sendErrorResponse(error: unknown, res: Response) {
  let statusCode = 500;

  let response: ErrorResponse = {
    success: false,
    message: "Internal server error",
  };

  // =====================================> Zod validation error
  if (error instanceof ZodError) {
    statusCode = 400;
    response = {
      success: false,
      message: "Validation failed",
      errors: z.treeifyError(error),
    };
  }

  // =====================================> Custom API error
  else if (error instanceof ApiError) {
    statusCode = error.statusCode;
    response = {
      success: error.success,
      message: error.message,
      errors: error.errors,
    };
  }

  // =====================================> Unknown error (native JS error)
  else if (error instanceof Error) {
    response = {
      success: false,
      message: error.message || "Internal server error",
      ...(process.env.NODE_ENV === "development" && {
        stack: error.stack,
      }),
    };
  }

  return res.status(statusCode).json(response);
}
