const { Router } = require("express");
const { teamsHandler } = require("../driversHandlers/teamHandles");
const teamRouter = Router();

teamRouter.get("/", teamsHandler);
module.exports = teamRouter;
