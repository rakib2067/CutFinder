const userRegistrationSchema = require("./user-register-schema");
const barbershopSchema = require("./barbershop-schema");
const addresSchema = require("./address-schema");

const barbershopManagerSchema = [
  ...userRegistrationSchema,
  ...addresSchema,
  ...barbershopSchema,
];
module.exports = {
  userRegistrationSchema,
  barbershopSchema,
  addresSchema,
  barbershopManagerSchema,
};
