const { UserService } = require("../services");
const bcrypt = require("bcrypt");

async function register(req, res) {
  const { email, password } = req.body;
  console.log(req.body);

  try {
    let user = await UserService.getUserByEmail(email);

    if (user) {
      return res.status(400).json({ errors: [{ msg: "User already exists" }] });
    }

    const newUser = { ...req.body };
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(password, salt);

    await UserService.createUser(newUser);
    console.log(`new user: ${newUser}`);
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.log(`Error Registering: ${err}`);
    res.status(500).json(err);
  }
}

async function login(req, res) {
  const { email, password } = req.body;
  console.log(req.body);
  try {
    let user = await UserService.getUserByEmail(email);

    if (!user) {
      return res.status(401).json({ errors: [{ msg: "User not found" }] });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(401).json({ errors: [{ msg: "Invalid password" }] });
    }

    req.session.user = user;
    console.log(`Authenticated User: ${user}`);

    res.status(200).json(user);
  } catch (err) {
    console.log(`Error Logging In: ${err}`);
    res.status(500).json(err);
  }
}

module.exports = { register, login };
