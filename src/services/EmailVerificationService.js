const crypto = require("crypto");

class EmailVerificationService {
  static async createToken(redisClient, userId) {
    //require bcrypt
    const tokenKey = `verification:${userId}`;
    const verificationToken = generateVerificationToken();
    redisClient.set(tokenKey, verificationToken, "EX", 3600);
  }
}

function generateVerificationToken() {
  // Generate a secure random token of a specified length (e.g., 32 bytes, which will result in a 64-character hex string)
  const tokenLength = 32;
  const token = crypto.randomBytes(tokenLength).toString("hex");
  return token;
}

module.exports = EmailVerificationService;
