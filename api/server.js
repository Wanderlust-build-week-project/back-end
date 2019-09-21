const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const server = express();

const guestsRouter = require("./guests/guestsRouter.js");

server.use(cors());
server.use(helmet());
server.use(express.json());

server.use("/guests", guestsRouter);

module.exports = server;
