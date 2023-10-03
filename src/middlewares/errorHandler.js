function errorHandler(error, req, res, next) {
  error.httpCode = error.httpCode || 500;
  error.message = error.message || "Internal Server Error";

  res.status(error.httpCode).json({
    error: error.name,
    message: error.message,
  });
}

module.exports = errorHandler;
