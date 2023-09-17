const db = require("../config/db");
const User = require("./User");

class UserService {
  static async getUserById(id) {
    try {
      const userData = await db.query(
        `SELECT * FROM users WHERE users.id = $1;`,
        [id]
      );
      return new User(userData.rows[0]);
    } catch (err) {
      throw new Error(`Error fetching user: ${err}`);
    }
  }

  static async createUser(userData) {
    const { username, email, fullName, password, phoneNumber } = userData;
    try {
      const result = await db.query(
        `INSERT INTO users (username, email, fullName, password, phoneNumber) VALUES ($1, $2, $3, $4, $5) RETURNING *;`,
        [username, email, fullName, password, phoneNumber]
      );
      console.log(`User created with ID: ${result.rows[0].id}`);
      return new User(result.rows[0]);
    } catch (err) {
      throw new Error(`Error creating user: ${err}`);
    }
  }
  static async deleteUser(id) {
    try {
      const result = await db.query(
        "DELETE FROM users WHERE id = $1 RETURNING id;",
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

module.exports = UserService;
