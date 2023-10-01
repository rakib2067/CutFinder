const UserService = require("../services/UserService");
const UserAuthService = require("../services/UserAuthService");
const { ConflictError } = require("../errors");
const bcrypt = require("bcrypt");

async function validateAndCreateUser(pool, userData) {
  const { email, password } = userData;
  let user = await UserService.getUserByEmail(pool, email);

  if (user) {
    throw new ConflictError("User already exists");
  }

  const newUser = { ...userData };
  const salt = await bcrypt.genSalt(10);
  newUser.password = await bcrypt.hash(password, salt);

  await UserAuthService.createUser(pool, newUser);
  return newUser;
}

module.exports = {
  validateAndCreateUser,
};
