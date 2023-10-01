class Booking {
  constructor(data) {
    this.id = data.booking_id;
    this.bookingDay = data.booking_day;
    this.hairstyleId = data.hairstyle_id;
    this.customerId = data.customer_id;
    this.barberId = data.barber_id;
  }
}

module.exports = Booking;
