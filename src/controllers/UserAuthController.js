const pool = require("../config/db");
const RedisClient = require("../config/redis-init");
const transporter = require("../config/nodemailer");
const { validateAndCreateUser, authenticateUser } = require("../utils");
const { UserService, EmailVerificationService } = require("../services");
async function register(req, res, next) {
  try {
    const newUser = await validateAndCreateUser(
      pool,
      RedisClient,
      transporter,
      req.body
    );
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

async function verify(req, res, next) {
  try {
    const { userId, verificationToken } = req.params;
    const isTokenValid = await EmailVerificationService.validateToken(
      RedisClient,
      userId,
      verificationToken
    );
    if (!isTokenValid) {
      res.redirect("https://www.google.com"); //Temporary address for now
      return;
    }
    const frontendVerificationSuccessURL = "https://www.google.com"; //Temporary address for now
    await UserService.updateUser(userId, { verified: true });
    res.status(200).redirect(frontendVerificationSuccessURL);
    return;
  } catch (error) {
    console.log("Failed verification attempt");
    next(error);
  }
}
module.exports = { register, login, verify };
