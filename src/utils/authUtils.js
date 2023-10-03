const UserService = require("../services/UserService");
const UserAuthService = require("../services/UserAuthService");
const {
  ConflictError,
  NotFoundError,
  UnauthorizedError,
} = require("../errors");
const bcrypt = require("bcrypt");

async function validateAndCreateUser(pool, userData) {
  const { email, password } = userData;
  let user = await UserService.getUserByEmail(pool, email);

  if (user) {
    throw new ConflictError("User already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = await UserAuthService.createUser(
    pool,
    userData,
    hashedPassword
  );
  return newUser;
}

async function authenticateUser(pool, userData) {
  const { email, password } = userData;
  let user = await UserService.getUserByEmail(pool, email);

  if (!user) {
    throw new NotFoundError("User");
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) {
    throw new UnauthorizedError("Invalid Password");
  }
  return user;
}
module.exports = {
  validateAndCreateUser,
  authenticateUser,
};
