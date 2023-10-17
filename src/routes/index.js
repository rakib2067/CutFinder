const express = require("express");
const router = express.Router();

const userRouter = require("./userRoutes");
const authRoutes = require("./authRoutes");
const barbershopRoutes = require("./barberShopRoutes");

router.use("/auth", authRoutes);
router.use("/account", userRouter);
router.use("/barbershops", barbershopRoutes);

module.exports = router;
