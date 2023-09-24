const { UserAuthController } = require("../controllers");
const { registrationSchema } = require("../validation-schema");
const { validateRequestSchema } = require("../middlewares");

const express = require("express");
const router = express.Router();

router.post(
  "/register",
  registrationSchema,
  validateRequestSchema,
  UserAuthController.register
);

router.post("/login", UserAuthController.login);

module.exports = router;
