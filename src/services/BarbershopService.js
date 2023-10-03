const db = require("../config/db");
const { Barbershop } = require("../models");

class BarbershopService {
  static async getBarbershopById(id) {
    try {
      const barbershopData = await db.query(
        `SELECT * FROM barbershops WHERE barbershops.barbershop_id = $1;`,
        [id]
      );

      if (barbershopData.rows.length === 0) {
        return null;
      }

      return new Barbershop(barbershopData.rows[0]);
    } catch (err) {
      throw new Error(`Error fetching barbershop: ${err}`);
    }
  }

  static async createBarbershop(client, barbershopData) {
    const { shopName, storeNumber } = barbershopData;
    try {
      const result = await client.query(
        `INSERT INTO barbershops (shop_name, store_number) VALUES ($1, $2) RETURNING *;`,
        [shopName, storeNumber]
      );
      console.log(
        `Barbershop created with ID: ${result.rows[0].barbershop_id}`
      );
      return new Barbershop(result.rows[0]);
    } catch (error) {
      throw new Error(`Error creating barbershop: ${err}`);
    }
  }

  static async updateBarbershop(barbershopId, updateData) {
    const fieldsToUpdate = Object.keys(updateData);

    const fieldsToUpdateQuery = fieldsToUpdate
      .map((field, idx) => {
        return `${field} = $${idx + 1}`;
      })
      .join(", ");

    const values = fieldsToUpdate.map((field) => updateData[field]);
    values.push(barbershopId);

    try {
      const result = await db.query(
        `UPDATE barbershops SET ${fieldsToUpdateQuery} WHERE id = $${values.length} RETURNING *;`,
        values
      );

      return new Barbershop(result.rows[0]);
    } catch (err) {
      throw new Error(`Error updating barbershop: ${err}`);
    }
  }
}

module.exports = BarbershopService;
