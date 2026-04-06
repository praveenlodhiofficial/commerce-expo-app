interface ApiErrorInterface {
  statusCode: number;
  message: string;
  success: boolean;
  errors: unknown[];
  stack?: string;
}

class ApiError extends Error implements ApiErrorInterface {
  public statusCode: number;
  public success: boolean;
  public errors: unknown[];

  constructor(
    statusCode: number,
    message: string = "Something went wrong",
    errors: unknown[] = []
  ) {
    super(message);

    this.name = "ApiError";
    this.statusCode = statusCode;
    this.success = false;
    this.errors = errors;

    // Clean stack trace
    Error.captureStackTrace(this, this.constructor);
  }
}

export { ApiError };
export type { ApiErrorInterface };