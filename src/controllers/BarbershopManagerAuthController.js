const {
  UserAuthService,
  UserService,
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
const bcrypt = require("bcrypt");

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
    res
      .status(201)
      .json({
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

async function login(req, res) {
  const { email, password } = req.body;
  console.log(req.body);
  try {
    let user = await UserService.getUserByEmail(email);

    if (!user) {
      return res.status(401).json({ errors: [{ msg: "User not found" }] });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(401).json({ errors: [{ msg: "Invalid password" }] });
    }

    req.session.user = user;
    console.log("Authenticated User: ", user);

    res.status(200).json(user);
  } catch (err) {
    console.log(`Error Logging In: ${err}`);
    res.status(500).json(err);
  }
}

module.exports = { register, login };
