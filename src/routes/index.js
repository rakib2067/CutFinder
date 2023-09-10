const express = require("express");
const router = express.Router();

const { userRouter } = require("../domains/user");

router.use("/auth", userRouter);

module.exports = router;
