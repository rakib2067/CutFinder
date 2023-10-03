const pool = require("../config/db");
const { validateAndCreateUser, authenticateUser } = require("../utils");
const { UserService } = require("../services");
async function register(req, res, next) {
  try {
    const newUser = await validateAndCreateUser(pool, req.body);
    console.log("Created new user: ", newUser);
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.log("Failed to register");
    next(error);
  }
}

async function login(req, res, next) {
  try {
    const user = await authenticateUser(pool, req.body);

    req.session.user = user;

    const isManager = await UserService.getManagerByUserId(pool, user.id);
    const isBarber = await UserService.getBarberByUserId(pool, user.id);
    if (isManager) {
      req.session.isManager = true;
    }

    if (isBarber) {
      req.session.isBarber = true;
    }

    res.status(200).json(user);

    console.log("Authenticated User: ", user);
  } catch (error) {
    console.log("Failed login attempt");
    next(error);
  }
}

module.exports = { register, login };
