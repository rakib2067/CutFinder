const express = require("express");
const router = express.Router();

const userAuthRouter = require("./userAuthRoutes");
const barbershopManagerAuthRoutes = require("./barbershopManagerAuthRoutes");
// const barberAuthRouter = require("./barberAuthRoutes");

router.use("/user", userAuthRouter);
router.use("/manager", barbershopManagerAuthRoutes);
// router.use("/barber", barberAuthRouter);

module.exports = router;
