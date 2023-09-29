const db = require("../config/db");
const { User } = require("../models");

class UserAuthService {
  static async createUser(client, userData) {
    const { fullName, email, password } = userData;
    try {
      const result = await client.query(
        `INSERT INTO users (full_name, email, password) VALUES ($1, $2, $3) RETURNING *;`,
        [fullName, email, password]
      );
      console.log(`User created with ID: ${result.rows[0].id}`);
    } catch (err) {
      throw new Error(`Error creating user: ${err}`);
    }
  }
  static async deleteUser(id) {
    try {
      const result = await db.query(
        "DELETE FROM users WHERE user_id = $1 RETURNING user_id;",
        [id]
      );
      return `Successfully deleted user: ${result.rows[0].id}`;
    } catch (err) {
      throw new Error(`Error deleting user: ${err}`);
    }
  }

  static async updateUser(userId, updateData) {
    const fieldsToUpdate = Object.keys(updateData);

    const fieldsToUpdateQuery = fieldsToUpdate
      .map((field, idx) => {
        return `${field} = $${idx + 1}`;
      })
      .join(", ");

    const values = fieldsToUpdate.map((field) => updateData[field]);
    values.push(userId);

    try {
      const result = await db.query(
        `UPDATE users SET ${fieldsToUpdateQuery} WHERE id = $${values.length} RETURNING *;`,
        values
      );

      return new User(result.rows[0]);
    } catch (err) {
      throw new Error(`Error updating user: ${err}`);
    }
  }
}

module.exports = UserAuthService;
