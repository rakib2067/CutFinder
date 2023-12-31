const { UserAuthController } = require("../../controllers");
const { userRegistrationSchema } = require("../../validation-schema");
const { validateRequestSchema } = require("../../middlewares");

const express = require("express");
const router = express.Router();

router.post(
  "/register",
  userRegistrationSchema,
  validateRequestSchema,
  UserAuthController.register
);

router.post("/login", UserAuthController.login);

router.get("/verify/:userId/:verificationToken", UserAuthController.verify);

module.exports = router;
