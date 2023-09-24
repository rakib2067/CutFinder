const { UserController } = require("../controllers");
const { isAuthenticated } = require("../middlewares");

const express = require("express");
const router = express.Router();

router.put("/", UserController.update);
router.get("/", isAuthenticated, (req, res) => {
  res.json(req.session);
});
module.exports = router;
