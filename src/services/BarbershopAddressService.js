const { BarbershopAddress } = require("../models");

class BarbershopAddressService {
  static async checkExistingAddress(client, addressData) {
    const { streetAddress, city, postalCode } = addressData;
    try {
      const result = await client.query(
        `SELECT * FROM barbershop_addresses 
         WHERE street_address = $1 AND city = $2 AND postal_code = $3;`,
        [streetAddress, city, postalCode]
      );

      if (result.rows.length > 0) {
        return new BarbershopAddress(result.rows[0]);
      }

      return null;
    } catch (err) {
      throw new Error(`Error checking existing address: ${err}`);
    }
  }

  static async createBarbershopAddress(client, addressData, barbershopId) {
    const { streetAddress, city, postalCode } = addressData;
    try {
      const result = await client.query(
        `INSERT INTO barbershop_addresses (barbershop_id, street_address, city, postal_code) 
         VALUES ($1, $2, $3, $4) RETURNING *;`,
        [barbershopId, streetAddress, city, postalCode]
      );

      console.log(`Barbershop address created with ID: ${result.rows[0].id}`);
      return new BarbershopAddress(result.rows[0]);
    } catch (error) {
      throw new Error(`Error creating barbershop address: ${error}`);
    }
  }
}

module.exports = BarbershopAddressService;
