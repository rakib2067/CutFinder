const express = require("express");
const router = express.Router();

const userAuthRouter = require("./userAuthRoutes");
// const barberAuthRouter = require("./barberAuthRoutes");

router.use("/user", userAuthRouter);
// router.use("/barber", barberAuthRouter);

module.exports = router;
