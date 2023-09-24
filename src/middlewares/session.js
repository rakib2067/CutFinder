const session = require("express-session");

const redisClient = require("../config/redis-init");
const RedisStore = require("connect-redis").default;

const redisStore = new RedisStore({ client: redisClient });

module.exports = session({
  store: redisStore,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  name: "sessionID",
  cookie: {
    maxAge: 1000 * 60 * 30, // 1 day
    secure: process.env.NODE_ENV === "production" ? true : false,
    httpOnly: false,
    sameSite: "strict",
  },
});
