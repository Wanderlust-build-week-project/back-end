const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const server = express();

const GuestsRoute = require("./guests/guestsRouter.js");
const OrganizerRoute = require("./organizers/organizersRouter");
const TypeRoute = require("./types/typesRouter");
server.use(cors());
server.use(helmet());
server.use(express.json());

server.use("/guests", GuestsRoute);
server.use("/organizers", OrganizerRoute);
server.use("/types", TypeRoute)
module.exports = server;
