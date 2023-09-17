const express = require("express");

const cors = require("cors");
const bodyParser = require("body-parser");
const session = require("express-session");

const redisClient = require("./config/redis-init");
const RedisStore = require("connect-redis").default;
const routes = require("./routes");

const server = express();

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(cors());

server.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 day
      secure: process.env.NODE_ENV === "production" ? true : false,
      httpOnly: true,
    },
  })
);

server.get("/", (req, res) =>
  res.send(
    `Trimtime - currently running on environment: ${process.env.NODE_ENV}`
  )
);
server.use(routes);

module.exports = server;
