const { User } = require("../models");

async function update(req, res) {
  try {
    res.status(204).json("Updated");
  } catch (err) {
    res.status(500).json({ err });
  }
}

module.exports = { update };
