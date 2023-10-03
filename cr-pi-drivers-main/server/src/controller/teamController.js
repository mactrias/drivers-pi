const axios = require("axios");
const { Team } = require("../db");
const obtenerTeams = async () => {
  const obtener = await Team.findAll();
  const apiData = (await axios.get("http://localhost:5000/drivers")).data;

  const uniqueTeams = new Set(); // Usamos un conjunto para almacenar equipos únicos

  apiData.forEach(async ({ teams }) => {
    if (teams) {
      const arr = teams.split(",");
      arr.forEach(async (team) => {
        const trimmedTeam = team.trim();
        if (!uniqueTeams.has(trimmedTeam)) {
          // Verificamos si el equipo ya existe en el conjunto
          uniqueTeams.add(trimmedTeam); // Agregamos el equipo al conjunto para evitar duplicados
          await Team.findOrCreate({ where: { name: trimmedTeam } });
        }
      });
    }
  });
  return [...obtener];
};
module.exports = {
  obtenerTeams,
};
