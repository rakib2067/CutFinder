const { BarbershopController } = require("../controllers");

const express = require("express");
const router = express.Router();

router.get("/", BarbershopController.getAllBarberShops);
router.post("/", BarbershopController.getBarberShop);

module.exports = router;
