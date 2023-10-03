const { body } = require("express-validator");

const addressValidationSchema = [
  body("streetAddress").notEmpty().withMessage("Street Address is required"),

  body("city")
    .notEmpty()
    .withMessage("City is required")
    .isLength({ max: 50 })
    .withMessage("City must be at most 50 characters"),

  body("postalCode")
    .notEmpty()
    .withMessage("Postal Code is required")
    .isLength({ max: 10 })
    .withMessage("Postal Code must be at most 10 characters"),
];

module.exports = addressValidationSchema;
