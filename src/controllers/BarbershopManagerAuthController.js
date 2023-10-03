const { BarbershopService, BarbershopAddressService } = require("../services");
const { ConflictError } = require("../errors");
const {
  validateAndCreateUser,
  startTransaction,
  commitTransaction,
  rollbackTransaction,
  authenticateUser,
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

    await commitTransaction(client);
    res.status(201).json({
      message: `Succesfully registered user: ${newUser.fullName}, and created ${barbershop.shopName}`,
    });
  } catch (err) {
    console.log("Error registering: ", err);
    await rollbackTransaction(client);
    next(err);
  } finally {
    client.release();
  }
}

async function login(req, res, next) {
  try {
    let user = await authenticateUser(pool, req.body);

    req.session.user = user;
    req.session.isManager = true;

    res.status(200).json(user);
    console.log("Authenticated User: ", user);
  } catch (err) {
    console.log(`Error Logging In: ${err}`);
    next(err);
  }
}

module.exports = { register, login };
