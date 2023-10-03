const BaseError = require("./BaseError");

class ValidationError {
  constructor(errors) {
    this.name = "ValidationError";
    this.httpCode = 400;
    this.message = errors;
  }
}

class UnauthorizedError extends BaseError {
  constructor(message) {
    super("UnauthorizedError", 401, message);
  }
}

class NotFoundError extends BaseError {
  constructor(property) {
    super("NotFoundError", 404, `${property} not found`);
  }
}
class ConflictError extends BaseError {
  constructor(property) {
    super("ConflictError", 409, `${property} already exists`);
  }
}

class BadRequestError extends BaseError {
  constructor(message) {
    super("BadRequestError", 400, message);
  }
}

class ForbiddenError extends BaseError {
  constructor(message) {
    super("ForbiddenError", 403, message);
  }
}

module.exports = {
  ValidationError,
  UnauthorizedError,
  NotFoundError,
  ConflictError,
  BadRequestError,
  ForbiddenError,
};
