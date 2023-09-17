class User {
  constructor(data) {
    this.id = data.user_id;
    this.username = data.username;
    this.email = data.email;
    this.password = data.password;
    this.fullName = data.fullName;
    this.phoneNumber = data.phoneNumber;
  }
}

module.exports = User;
