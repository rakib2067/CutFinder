const crypto = require("crypto");

class EmailVerificationService {
  static async createToken(redisClient, userId) {
    try {
      const tokenKey = `verification:${userId}`;
      const verificationToken = this.generateVerificationToken();
      await redisClient.set(tokenKey, verificationToken, "EX", 3600);
      return verificationToken;
    } catch (error) {
      throw new Error(`Error creating verification token: ${err}`);
    }
  }

  static async validateToken(redisClient, userId, token) {
    try {
      const userVerificationTokenKey = `verification:${userId}`;
      const tokenExists = await redisClient.exists(userVerificationTokenKey);
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
      return false;
    }
  }
  static generateVerificationToken() {
    // Generate a secure random token of a specified length (e.g., 32 bytes, which will result in a 64-character hex string)
    const tokenLength = 32;
    const token = crypto.randomBytes(tokenLength).toString("hex");
    return token;
  }
  static async sendVerificationEmail(transporter, userData, verificationToken) {
    try {
      const mailOptions = {
        from: process.env.SENDER_EMAIL,
        to: userData.email,
        subject: "Cutfinder - Email Verification",
        html: `
            <p>Click the link to verify your account:</p>
            <a href="${
              process.env.API_BASE_URL || "http://localhost:3000"
            }/auth/user/verify/${encodeURIComponent(
          userData.id
        )}/${encodeURIComponent(
          verificationToken
        )}" style="${buttonStyle}">Verify Account</a>
        `,
      };

      const info = await transporter.sendMail(mailOptions);
      console.log("Email sent:", info.response);
    } catch (error) {
      console.error("Error sending email:", error);
    }
  }
}

const buttonStyle = `style="display: inline-block; padding: 10px 20px; text-decoration: none; background-color: #4CAF50; color: white; border: 1px solid #4CAF50; border-radius: 5px;`;

module.exports = EmailVerificationService;
