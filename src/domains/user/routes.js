// const {} = require("./controller");

const express = require("express");
const router = express.Router();

router.get("/register", (req, res) => {
  try {
    res.send("Succesfully signed in ");
  } catch (error) {}
});

module.exports = router;
