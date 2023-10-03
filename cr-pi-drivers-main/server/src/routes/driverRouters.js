const { Router } = require("express");

const {
  driverGetHandler,
  driverGetIdHandrer,
  driverPostHandler,
  idHandler,
  putDriversHandler,
} = require("../driversHandlers/driverHandres");
const driverRouter = Router();
driverRouter.get("/", driverGetHandler);
driverRouter.get("/:idDriver", driverGetIdHandrer);
driverRouter.post("/", driverPostHandler);
driverRouter.delete("/:idDriver", idHandler);
driverRouter.put("/", putDriversHandler);

module.exports = driverRouter;
