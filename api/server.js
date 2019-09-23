const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const server = express();
const authenticate = require("./auth/restrictedMiddleware");

const GuestsRoute = require("./guests/guestsRouter");
const OrganizerRoute = require("./organizers/organizersRouter");
const LocationsRoute = require("./locations/locationsRouter");
const TypesRoute = require("./types/typesRouter");
const AuthRoute = require("./auth/authRouter");
const ExperiencesRoute = require("./experiences/experiencesRouter");
server.use(helmet());
server.use(express.json());
server.use(cors());

server.use("/guests", authenticate, GuestsRoute);
server.use("/organizers", authenticate, OrganizerRoute);
server.use("/locations", authenticate, LocationsRoute);
server.use("/types", authenticate, TypesRoute);
server.use("/auth", AuthRoute);
server.use("/experiences", authenticate, ExperiencesRoute);
module.exports = server;
