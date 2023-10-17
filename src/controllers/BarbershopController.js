const { BarbershopService } = require("../services");

async function fetchAll(req, res, next) {
  try {
    const shops = await BarbershopService.getAllBarbershop();
    res.status(200).json(shops);
  } catch (err) {
    console.log(err);
    next(err);
  }
}

module.exports = { fetchAll };
