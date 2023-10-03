class BarbershopAddress {
  constructor(data) {
    this.id = data.address_id;
    this.barbershopId = data.barbershop_id;
    this.streetAddress = data.street_address;
    this.city = data.city;
    this.postalCode = data.postal_code;
    this.country = data.country;
  }
}

module.exports = BarbershopAddress;
