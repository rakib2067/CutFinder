class Barber {
  constructor(data) {
    this.id = data.barber_id;
    this.userId = data.user_id;
    this.barbershopId = data.barbershop_id;
  }
}

module.exports = Barber;
