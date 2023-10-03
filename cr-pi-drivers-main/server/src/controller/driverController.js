const { Driver, Team } = require("../db");
const { Op } = require("sequelize");
const axios = require("axios");
const IMAGEN =
  "https://a1.espncdn.com/combiner/i?img=%2Fphoto%2F2022%2F0311%2Fr984952_1296x864_3%2D2.jpg";
//-----------------------------------//
//PARA MANDAR LA MISMA INFORMACION QUE TIENE EL BDD
const cleanArray = (arr) => {
  const clean = arr.map((elem) => {
    return {
      id: elem.id,
      firstName: elem.name.forename,
      lastName: elem.name.surname,
      description: elem.description,
      image: elem.image.url,
      nationality: elem.nationality,
      birthDate: elem.dob,
      team: elem.teams,
      created: false,
    };
  });
  return clean;
};
//---------------------------------------------//
//buscar todos los drivers
const getDriver = async () => {
  const dataDriver = await Driver.findAll({
    include: [
      {
        model: Team,
        through: {
          attributes: [],
        },
      },
    ],
  });

  const DriverBD = dataDriver.map(
    ({
      id,
      firstName,
      lastName,
      description,
      image,
      nationality,
      birthDate,
      Teams,
    }) => {
      const team = Teams.map((t) => t.name).join(", ");
      return {
        id,
        firstName,
        lastName,
        description,
        image,
        nationality,
        birthDate,
        team,
      };
    }
  );
  const apiDriverRaw = (await axios.get("http://localhost:5000/drivers")).data;

  const apiDriver = cleanArray(apiDriverRaw);
  const driversImagenDefault = apiDriver.map((driver) => {
    if (!driver.image) {
      return {
        ...driver,
        image: IMAGEN,
      };
    }
    return driver;
  });
  return [...DriverBD, ...driversImagenDefault];
};
//--------------------------------------------------//
//buscar por nombre
const searhName = async (name) => {
  const driveName = await Driver.findAll({
    where: { firstName: { [Op.iLike]: name } },
    include: [
      {
        model: Team,
        through: {
          attributes: [],
        },
      },
    ],
    limit: 15,
  });
  const DriverBD = driveName.map(
    ({
      id,
      firstName,
      lastName,
      description,
      image,
      nationality,
      birthDate,
      Teams,
    }) => {
      const team = Teams.map((t) => t.name).join(", ");
      return {
        id,
        firstName,
        lastName,
        description,
        image,
        nationality,
        birthDate,
        team,
      };
    }
  );
  const apiDriverRaw = (await axios.get("http://localhost:5000/drivers")).data;

  const apiDriver = cleanArray(apiDriverRaw);
  const filterdApi = apiDriver.filter(
    (driver) => driver.firstName.toLowerCase() === name.toLowerCase()
  );
  if (!driveName.length && !filterdApi.length) {
    return [];
  }

  if (driveName.length >= 15) {
    return driveName;
  }
  const completarQuince = 15 - driveName.length;
  const limites = filterdApi.slice(0, completarQuince);
  const driversImagenDefault = limites.map((driver) => {
    if (!driver.image) {
      return {
        ...driver,
        image: IMAGEN,
      };
    }
    return driver;
  });
  return [...DriverBD, ...driversImagenDefault];
};

//BUSCAR POR ID
const getDriverId = async (idDriver, origin) => {
  let driver;

  if (origin === "api") {
    // Obtener conductor desde la API y mapear los datos
    const apiDriver = (
      await axios.get(`http://localhost:5000/drivers/${idDriver}`)
    ).data;

    driver = {
      id: apiDriver.id,
      firstName: apiDriver.name.forename,
      lastName: apiDriver.name.surname,
      description: apiDriver.description,
      image: apiDriver.image.url,
      nationality: apiDriver.nationality,
      birthDate: apiDriver.dob,
      team: apiDriver.teams,
      created: false,
    };

    if (apiDriver.image && apiDriver.image.url) {
      driver.image = apiDriver.image.url;
    } else {
      driver.image = IMAGEN;
    }
  } else {
    // Obtener conductor desde la base de datos
    driver = await Driver.findByPk(idDriver, {
      include: [
        {
          model: Team,
          through: {
            attributes: [],
          },
        },
      ],
    });

    if (driver) {
      // Mapear los datos del conductor y sus equipos
      const team = driver.Teams.map((t) => t.name).join(", ");
      driver = {
        id: driver.id,
        firstName: driver.firstName,
        lastName: driver.lastName,
        description: driver.description,
        image: driver.image,
        nationality: driver.nationality,
        birthDate: driver.birthDate,
        team: team,
        created: false,
      };
    }
  }

  return driver;
};
//-------------------------------------//
//Para eliminar
const deleteId = async (id) => {
  const driverId = await Driver.destroy({ where: { id } });
  if (!driverId) return { error: "driver inexistente!" };
  else {
    return { message: "Driver eliminado exitosamente" };
  }
};

//CREACION DE LOS DRIVERS EN LA BASE DE DATOS
const createDriver = async (
  firstName,
  lastName,
  description,
  image,
  nationality,
  birthDate,
  teams
) => {
  if (!image) {
    image = IMAGEN;
  }

  const [newDriver, create] = await Driver.findOrCreate({
    where: {
      firstName,
      lastName,
      description,
      image,
      nationality,
      birthDate,
    },
  });
  const teamNames = teams.split(", ");

  // Encuentra los registros de equipos en la base de datos
  const teamRecords = await Team.findAll({
    where: {
      name: teamNames,
    },
  });

  // Asocia los equipos al conductor
  await newDriver.addTeams(teamRecords);

  return newDriver;
};
//Actualizar informacion
const putDriver = async (
  id,
  firstName,
  lastName,
  description,
  image,
  nationality,
  birthDate,
  teamIds,
  teams
) => {
  if (!image) {
    image = IMAGEN;
  }
  const driversFind = await Driver.update(
    {
      firstName: firstName,
      lastName: lastName,
      description: description,
      image: image,
      nationality: nationality,
      birthDate: birthDate,
      teamIds: teamIds,
      teams: teams,
    },
    { where: { id } }
  );
  if (!driversFind) return { error: "usuario inexistente" };
  else {
    return driversFind;
  }
};
module.exports = {
  getDriverId,
  createDriver,
  getDriver,
  searhName,
  deleteId,
  putDriver,
};
