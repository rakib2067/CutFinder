const { UserController } = require("../controllers");

const express = require("express");
const router = express.Router();

router.put("/", UserController.update);

module.exports = router;
