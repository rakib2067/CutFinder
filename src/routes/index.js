const express = require("express");
const router = express.Router();

const userRouter = require("./userRoutes");
const authRoutes = require("./authRoutes");

router.use("/auth", authRoutes);
router.use("/account", userRouter);

module.exports = router;
