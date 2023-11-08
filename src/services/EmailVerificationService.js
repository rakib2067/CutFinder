const crypto = require("crypto");

class EmailVerificationService {
  static async createToken(redisClient, userId) {
    try {
      const tokenKey = `verification:${userId}`;
      const verificationToken = this.generateVerificationToken();
      await redisClient.set(tokenKey, verificationToken, "EX", 3600);
    } catch (error) {
      throw new Error(`Error creating verification token: ${err}`);
    }
  }

  static generateVerificationToken() {
    // Generate a secure random token of a specified length (e.g., 32 bytes, which will result in a 64-character hex string)
    const tokenLength = 32;
    const token = crypto.randomBytes(tokenLength).toString("hex");
    return token;
  }
  static async validateToken(redisClient, userId, token) {
    try {
      const userVerificationTokenKey = `verification:${userId}`;
      const tokenExists = await redis.exists(userVerificationTokenKey);
      if (!tokenExists) {
        return false;
      }
      const userVerificationToken = await redisClient.get(
        userVerificationTokenKey
      );
      const isValid = userVerificationToken === token;

      if (!isValid) {
        return false;
      }

      await redisClient.del(userVerificationTokenKey);

      return true;
    } catch (err) {
      console.log("Error validating verification token", err);
    }
  }

  static async sendVerificationEmail(
    transporter,
    userEmail,
    verificationToken
  ) {
    // Define the email message
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: userEmail,
      subject: "Email Verification",
      //TBD Send html with a button to link to verification endpoint
      text: `Your verification token is: ${verificationToken}`,
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log("Email sent:", info.response);
    } catch (error) {
      console.error("Error sending email:", error);
    }
  }
}

module.exports = EmailVerificationService;
