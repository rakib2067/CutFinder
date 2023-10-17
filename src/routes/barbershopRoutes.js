const { BarbershopController } = require("../controllers");

const express = require("express");
const router = express.Router();

router.get("/", BarbershopController.fetchAll);

module.exports = router;
