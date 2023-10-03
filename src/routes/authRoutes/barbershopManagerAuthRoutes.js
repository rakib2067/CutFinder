const { BarbershopManagerAuthController } = require("../../controllers");
const { barbershopManagerSchema } = require("../../validation-schema");
const { validateRequestSchema } = require("../../middlewares");

const express = require("express");
const router = express.Router();

router.post(
  "/register",
  barbershopManagerSchema,
  validateRequestSchema,
  BarbershopManagerAuthController.register
);

module.exports = router;
