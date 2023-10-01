const {
  UserAuthService,
  UserService,
  BarbershopService,
} = require("../services");
const pool = require("../config/db");
const bcrypt = require("bcrypt");

async function register(req, res) {
  const {
    fullName,
    email,
    password,
    shopName,
    storeNumber,
    streetAddress,
    city,
    postalCode,
  } = req.body;
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    let user = await UserService.getUserByEmail(client, email);

    if (user) {
      return res.status(400).json({ errors: [{ msg: "User already exists" }] });
    }

    const newUser = { ...req.body };
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(password, salt);
    user = await UserAuthService.createUser(client, newUser);

    //Check if address already exists
    const barbershop = await BarbershopService.createBarbershop(
      client,
      req.body
    );

    await BarbershopService.createBarbershop(client, req.body);
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    await client.query("ROLLBACK");
    console.log(`Error Registering: ${err}`);
    res.status(500).json(err);
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
