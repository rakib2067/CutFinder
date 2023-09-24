const express = require("express");
const router = express.Router();

const userRouter = require("./userRoutes");
const userAuthRouter = require("./userAuthRoutes");

router.use("/account", userRouter);
router.use("/userAuth", userAuthRouter);

module.exports = router;
