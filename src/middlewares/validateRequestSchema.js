const { validationResult } = require("express-validator");
const { ValidationError } = require("../errors");
const validateRequestSchema = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // return res.status(400).json({ errors: errors.array() });
    throw new ValidationError(errors.array());
  }
  next();
};

module.exports = validateRequestSchema;
