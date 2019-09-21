const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const server = express();

const GuestsRoute = require("./guests/guestsRouter.js");
const OrganizerRoute = require("./organizers/organizersRouter");
const LocationsRoute = require("./locations/locationsRouter.js");

server.use(cors());
server.use(helmet());
server.use(express.json());

server.use("/guests", GuestsRoute);
server.use("/organizers", OrganizerRoute);
server.use("/locations", LocationsRoute);

module.exports = server;
