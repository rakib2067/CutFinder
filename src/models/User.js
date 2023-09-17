const db = require("../config/db");

module.exports = class User {
  constructor(data) {
    this.id = data.user_id;
    this.username = data.username;
    this.email = data.email;
    this.password = data.password;
    this.fullName = data.fullName;
    this.password = data.password;
    this.phoneNumber = data.phoneNumber;
  }

  static getById(id) {
    return new Promise(async (res, rej) => {
      try {
        let userData = await db.query(
          `SELECT * FROM users WHERE users.id = $1;`,
          [id]
        );
        res(userData.rows[0]);
      } catch (err) {
        rej(`Error fetching user: ${err}`);
      }
    });
  }

  static async create(userData) {
    let { username, email, fullName, password, phoneNumber } = userData;
    return new Promise(async (res, rej) => {
      try {
        let result = await db.query(
          `INSERT INTO users (username, email, password)
                                                          VALUES ($1, $2, $3, $4, $5) RETURNING *;`,
          [username, email, fullName, password, phoneNumber]
        );
        console.log(`User created with ID: ${result.rows[0].id}`);
        res(new User(result.rows[0]));
      } catch (err) {
        rej(`Error creating user: ${err}`);
      }
    });
  }

  destroy() {
    return new Promise(async (res, rej) => {
      try {
        const result = await db.query(
          "DELETE FROM users WHERE id = $1 RETURNING id;",
          [this.id]
        );
        res(`Succesfully deleted user: ${result.id}`);
      } catch (err) {
        rej(`Error deleting user: ${err}`);
      }
    });
  }

  static update(updateData, userId) {
    return new Promise(async (res, rej) => {
      const fieldsToUpdate = Object.keys(updateData);

      const fieldsToUpdateQuery = fieldsToUpdate.reduce(
        (acc, currentField, currendIdx) => {
          acc += `${currentField} = $${currendIdx + 1} `;
        },
        ""
      );

      try {
        const result = await db.query(
          `UPDATE users SET ${fieldsToUpdateQuery} WHERE id = ${
            fieldsToUpdate.length + 1
          } RETURNING *;`,
          [...fieldsToUpdate]
        );
        res(new User(result.rows[0]));
      } catch (err) {
        rej(`Error updating user: ${err}`);
      }
    });
  }
};
