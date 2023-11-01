class EmailVerificationService {
  static async createToken(redisClient, userId) {
    //require bcrypt
    const tokenKey = `verification`;
    redisClient.set(tokenKey, verificationToken);
  }
}

module.exports = EmailVerificationService;
