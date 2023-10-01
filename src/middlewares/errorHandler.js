function errorHandler(error, req, res, next) {
  //log Error, things we don't want the client to see
  error.statusCode = error.statusCode || 500;
  error.status = error.status || "Internal Server Error";
  res.status(error.statusCode).json(error.message);
}
