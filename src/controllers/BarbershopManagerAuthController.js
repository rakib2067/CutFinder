const {
  BarbershopManagerService,
  BarbershopService,
  BarbershopAddressService,
} = require("../services");
const { ConflictError } = require("../errors");
const {
  validateAndCreateUser,
  startTransaction,
  commitTransaction,
  rollbackTransaction,
} = require("../utils");
const pool = require("../config/db");

async function register(req, res, next) {
  const client = await pool.connect();

  try {
    await startTransaction(client);

    const newUser = await validateAndCreateUser(client, req.body);
    let barbershopAddress = await BarbershopAddressService.checkExistingAddress(
      client,
      req.body
    );

    if (barbershopAddress) {
      throw new ConflictError("Address");
    }

    const barbershop = await BarbershopService.createBarbershop(
      client,
      req.body
    );

    barbershopAddress = await BarbershopAddressService.createBarbershopAddress(
      client,
      req.body,
      barbershop.id
    );

    await BarbershopManagerService.createManager(
      client,
      newUser.id,
      barbershop.id
    );

    await commitTransaction(client);
    res.status(201).json({
      message: `Succesfully registered manager: ${newUser.fullName}, for ${barbershop.shopName}`,
    });
  } catch (err) {
    console.log("Error registering: ", err);
    await rollbackTransaction(client);
    next(err);
  } finally {
    client.release();
  }
}

module.exports = { register };
