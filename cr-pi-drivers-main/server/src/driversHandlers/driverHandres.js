const {
  searhName,
  createDriver,
  getDriverId,
  getDriver,
  deleteId,
  putDriver,
} = require("../controller/driverController");

//-------------------------------------------------//
//el handle de todos los driver y los nombres
const driverGetHandler = async (req, res) => {
  try {
    const { name } = req.query;
    const result = name ? await searhName(name) : await getDriver();
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
//-----------------------------------------------------//
//buscar de los ID
const driverGetIdHandrer = async (req, res) => {
  const { idDriver } = req.params;
  const origin = isNaN(idDriver) ? "bdd" : "api";

  try {
    const driver = await getDriverId(idDriver, origin);
    res.status(200).json(driver);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
//------------------------------------------//
//Eliminar Driver en la base datos
const idHandler = async (req, res) => {
  const { idDriver } = req.params;
  try {
    const driverDelete = await deleteId(idDriver);
    if (typeof driverDelete === "string") {
      return res.status(400).json(driverDelete);
    } else {
      return res.status(200).json(driverDelete);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//---------------------------------------------------//
// PARA CREARLOS DRIVER
const driverPostHandler = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      description,
      image,
      nationality,
      birthDate,
      teams,
    } = req.body;
    const newDriver = await createDriver(
      firstName,
      lastName,
      description,
      image,
      nationality,
      birthDate,
      teams
    );
    res.status(201).json(newDriver);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
//-------------------------------//
//Modificar
const putDriversHandler = async (req, res) => {
  const {
    id,
    firstName,
    lastName,
    description,
    image,
    nationality,
    birthDate,
    teamIds,
    teams,
  } = req.body;
  try {
    if (
      (id && firstName) ||
      lastName ||
      description ||
      image ||
      nationality ||
      birthDate ||
      teamIds ||
      teams
    ) {
      const newPutDriver = await putDriver(
        id,
        firstName,
        lastName,
        description,
        image,
        nationality,
        birthDate,
        teamIds,
        teams
      );
      if (newPutDriver.error) return res.status(404).json(newPutDriver);
      else {
        return res.status(200).json(newPutDriver);
      }
    }
  } catch (error) {
    res.status(400).send("Mandame toda la info Rey");
  }
};

module.exports = {
  driverGetHandler,
  driverGetIdHandrer,
  driverPostHandler,
  idHandler,
  putDriversHandler,
};
