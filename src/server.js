const express = require("express");
const cors = require("cors");

const routes = require("./routes");
const server = express();

server.use(cors());
server.get("/", (req, res) =>
  res.send(
    `Trimtime - currently running on ${process.env.NODE_ENV} environment`
  )
);
server.use(routes);

module.exports = server;
