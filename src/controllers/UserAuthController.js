const pool = require("../config/db");
const RedisClient = require("../config/redis-init");
const { validateAndCreateUser, authenticateUser } = require("../utils");
const { UserService, EmailVerificationService } = require("../services");
async function register(req, res, next) {
  try {
    const newUser = await validateAndCreateUser(pool, req.body);
    console.log("Created new user: ", newUser);
    //Verification service to send an email to the user
    // Email will contain a token
    // Store the token in redis or postgres
    // The token can expire after a certain amount of time
    // The email will contain a link to the endpoint for verification
    // Accessing that email will set the users status to verified
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

async function verify(req, res, next) {
  try {
    const { token } = req.body;
    const verifyUser = await EmailVerificationService.verifyUser(
      RedisClient,
      token
    );
  } catch (error) {}
}
module.exports = { register, login, verify };
