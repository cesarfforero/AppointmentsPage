export class AppError extends Error {
  status: number;
  code: string;
  constructor(message: string, status = 500, code = "AppError") {
    super(message);
    this.name = this.constructor.name;
    this.status = status;
    this.code = code;
    Error.captureStackTrace?.(this, this.constructor);
  }
}

export class ConflictError extends AppError {
  constructor(message = "Conflict", code = "ConflictError") {
    super(message, 409, code);
  }
}

export class NotFoundError extends AppError {
  constructor(message = "Not Found", code = "NotFoundError") {
    super(message, 404, code);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = "Unauthorized", code = "UnauthorizedError") {
    super(message, 401, code);
  }
}

export class ValidationError extends AppError {
  details?: unknown;
  constructor(message = "ValidationError", details?: unknown) {
    super(message, 422, "ValidationError");
    this.details = details;
  }
}
