const { BarbershopManager } = require("../models");

class BarbershopManagerService {
  static async createManager(client, userId, barbershopId) {
    try {
      const result = await client.query(
        `INSERT INTO barbershop_managers (user_id, barbershop_id) VALUES ($1, $2) RETURNING *;`,
        [userId, barbershopId]
      );
      console.log(
        `Barbershop Manger created with ID: ${result.rows[0].user_id}${result.rows[0].barbershop_id}`
      );
      return new BarbershopManager(result.rows[0]);
    } catch (error) {
      throw new Error(`Error creating barbershop manager: ${err}`);
    }
  }
}

module.exports = BarbershopManagerService;
