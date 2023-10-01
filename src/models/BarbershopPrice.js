class BarbershopPrice {
  constructor(data) {
    this.hairstyleId = data.hairstyle_id;
    this.barbershopId = data.barbershop_id;
    this.price = data.price;
  }
}

module.exports = BarbershopPrice;
