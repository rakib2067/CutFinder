const { body } = require("express-validator");

const userRegistrationValidationSchema = [
  body("fullName", "Full Name is required").not().isEmpty(),

  body("email")
    .not()
    .isEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please include a valid email"),

  body("password")
    .not()
    .isEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Please enter a password with 6 or more characters"),
];

module.exports = userRegistrationValidationSchema;
