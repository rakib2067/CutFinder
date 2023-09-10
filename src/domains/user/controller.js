const User = require("./model");

async function register(req, res) {
  try {
    res.status(201).json("Registered");
  } catch (err) {
    res.status(500).json({ err });
  }
}

module.exports = { register };
