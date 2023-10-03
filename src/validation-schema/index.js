const userRegistrationSchema = require("./user-register-schema");
const barbershopSchema = require("./barbershop-schema");
const addressSchema = require("./address-schema");

const barbershopManagerSchema = [
  ...userRegistrationSchema,
  ...addressSchema,
  ...barbershopSchema,
];
module.exports = {
  userRegistrationSchema,
  barbershopSchema,
  addressSchema,
  barbershopManagerSchema,
};
