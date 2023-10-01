class BaseError extends Error {
  constructor(name, httpCode, message) {
    super(message);
    this.name = name;
    this.httpCode = httpCode;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = BaseError;
