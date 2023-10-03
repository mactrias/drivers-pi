const { obtenerTeams } = require("../controller/teamController");

const teamsHandler = async (req, res) => {
  try {
    const filtro = await obtenerTeams();
    res.status(200).json(filtro);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
module.exports = {
  teamsHandler,
};
