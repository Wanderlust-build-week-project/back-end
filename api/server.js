const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const server = express();

const GuestsRoute = require("./guests/guestsRouter.js");
const OrganizerRoute = require("./organizers/organizersRouter");

server.use(cors());
server.use(helmet());
server.use(express.json());

server.use("/guests", GuestsRoute);
server.use("/organizers", OrganizerRoute);

module.exports = server;
