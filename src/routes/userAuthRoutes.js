const { UserAuthController } = require("../controllers");

const express = require("express");
const router = express.Router();

router.post("/register", UserAuthController.register);
// router.post("/login", UserAuthController.update);

module.exports = router;
