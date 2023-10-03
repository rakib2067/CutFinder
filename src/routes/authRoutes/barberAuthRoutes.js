const { BarberAuthController } = require("../../controllers");
const { userRegistrationSchema } = require("../../validation-schema");
const { validateRequestSchema } = require("../../middlewares");

const express = require("express");
const router = express.Router();

router.post(
  "/register",
  userRegistrationSchema,
  validateRequestSchema,
  BarberAuthController.register
);

module.exports = router;
