const { Router } = require("express");
const driverRouter = require("../routes/driverRouters");
const teamRouter = require("../routes/teamRouter");
const router = Router(); // Esta instancia principal se utilizará para agrupar y organizar las rutas relacionadas en su aplicación.
router.use("/drivers", driverRouter);
router.use("/teams", teamRouter);
module.exports = router;
