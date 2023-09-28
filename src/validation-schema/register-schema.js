const { body } = require("express-validator");

const registrationValidationSchema = [
  body("fullName", "Full Name is required").not().isEmpty(),
  body("email", "Please include a valid email").isEmail(),
  body(
    "password",
    "Please enter a password with 6 or more characters"
  ).isLength({ min: 6 }),
];

module.exports = registrationValidationSchema;
