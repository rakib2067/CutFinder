const { UserAuthService, UserService } = require("../services");
const pool = require("../config/db");
const bcrypt = require("bcrypt");
const { NotFoundError, UnauthorizedError } = require("../errors");
const { validateAndCreateUser } = require("../utils");

async function register(req, res, next) {
  try {
    const newUser = await validateAndCreateUser(pool, req.body);
    console.log("Created new user: ", newUser);
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    next(err);
  }
}

async function login(req, res, next) {
  const { email, password } = req.body;
  try {
    let user = await UserService.getUserByEmail(pool, email);

    if (!user) {
      throw new NotFoundError("User");
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      throw new UnauthorizedError("Invalid Password");
    }

    req.session.user = user;
    console.log("Authenticated User: ", user);

    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
}

module.exports = { register, login };
