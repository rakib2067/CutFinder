const db = require("../config/db");
const { User } = require("../models");

class UserService {
  static async getUserById(id) {
    try {
      const userData = await db.query(
        `SELECT * FROM users WHERE users.user_id = $1;`,
        [id]
      );

      if (userData.rows.length === 0) {
        return null;
      }

      return new User(userData.rows[0]);
    } catch (err) {
      throw new Error(`Error fetching user: ${err}`);
    }
  }
  static async getUserByEmail(client, email) {
    try {
      const userData = await client.query(
        `SELECT * FROM users WHERE users.email = $1;`,
        [email]
      );

      if (userData.rows.length === 0) {
        return null;
      }

      const user = new User(userData.rows[0]);
      return user;
    } catch (err) {
      throw new Error(`Error fetching user: ${err}`);
    }
  }

  static async getManagerByUserId(client, userId) {
    try {
      const userData = await client.query(
        `SELECT * FROM barbershop_managers WHERE barbershop_managers.user_id = $1;`,
        [userId]
      );

      if (userData.rows.length === 0) {
        return null;
      }

      const user = new User(userData.rows[0]);
      return user;
    } catch (error) {
      throw new Error(`Error fetching user: ${err}`);
    }
  }
  static async getBarberByUserId(client, userId) {
    try {
      const userData = await client.query(
        `SELECT * FROM barbers WHERE barbers.user_id = $1;`,
        [userId]
      );

      if (userData.rows.length === 0) {
        return null;
      }

      const user = new User(userData.rows[0]);
      return user;
    } catch (error) {
      throw new Error(`Error fetching user: ${err}`);
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
