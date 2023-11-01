class User {
  constructor(data) {
    this.id = data.user_id;
    this.fullName = data.full_name;
    this.email = data.email;
    this.password = data.password;
    this.verified = data.verified;
  }
}

module.exports = User;
