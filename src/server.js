const express = require("express");
const cors = require("cors");

const routes = require("./routes");
const { session } = require("./middlewares");

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cors());

try {
  server.use(session);
} catch (err) {
  console.log("Redis Err: ", err);
}

server.get("/", (req, res) =>
  res.send(
    `Trimtime - currently running on environment: ${process.env.NODE_ENV}`
  )
);
server.use(routes);

module.exports = server;
