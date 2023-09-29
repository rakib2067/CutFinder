const { body } = require("express-validator");
function isValidUKPhoneNumber(phoneNumber) {
  const ukPhoneNumberPattern = /^(?:\+44|0)[1-9]\d{8,13}$/;

  return ukPhoneNumberPattern.test(phoneNumber);
}

const barbershopValidationSchema = [
  body("shopName", "Shop Name is required").not().isEmpty(),

  body("storeNumber")
    .not()
    .isEmpty()
    .withMessage("Phone Number is required")
    .custom((value) => {
      if (!isValidUKPhoneNumber(value)) {
        throw new Error("Invalid phone number format");
      }
      return true;
    }),

  body("shopName", "Shop Name is required").not().isEmpty(),
];

module.exports = barbershopValidationSchema;
