const { BarbershopService } = require("../services");

async function getAllBarberShops(req, res, next) {
  try {
    const shops = await BarbershopService.getAllBarbershop();
    res.status(200).json(shops);
  } catch (err) {
    console.log(err);
    next(err);
  }
}

async function getBarberShop(req, res, next) {
  const { barbershopID } = req.body;

  try {
    const barbershop = await BarbershopService.getBarbershop(barbershopID);
    res.status(200).json(barbershop);
  } catch (err) {
    console.log(err);
    next(err);
  }
}

module.exports = { getAllBarberShops, getBarberShop };
