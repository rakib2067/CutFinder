const { BarberAuthController } = require("../../controllers");
const { barbershopManagerSchema } = require("../../validation-schema");
const { validateRequestSchema } = require("../../middlewares");

const express = require("express");
const router = express.Router();

router.post(
  "/register",
  barbershopManagerSchema,
  validateRequestSchema,
  BarberAuthController.register
);

router.post("/login", BarberAuthController.login);

module.exports = router;
