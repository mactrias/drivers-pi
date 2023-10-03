import {
  GET_DRIVERS,
  ORDER,
  SEARCH_DRIVERS_SUCCESS,
  ORDENBYDOB,
  ORDENBYID,
  GET_TEAMS,
  GET_ALL_API_BD,
  FILTERTEAMS,
} from "./type";
import axios from "axios";
export const getDrivers = () => {
  return async function (dispatch) {
    const apiDrivers = await axios.get("http://localhost:3001/drivers");
    const drivers = apiDrivers.data;

    dispatch({ type: GET_DRIVERS, payload: drivers });
  };
};
export const getTeamsAll = () => {
  try {
    return async function (dispatch) {
      const team = await axios.get("http://localhost:3001/teams");
      const obTeams = team.data;
      dispatch({
        type: GET_TEAMS,
        payload: obTeams,
      });
    };
  } catch (error) {
    dispatch(error.message);
  }
};

export const searchDrivers = (name) => {
  try {
    return async function (dispatch) {
      const DriverName = await axios.get(
        `http://localhost:3001/drivers?name=${name}`
      );
      const drivers = DriverName.data;
      dispatch({ type: SEARCH_DRIVERS_SUCCESS, payload: drivers });
    };
  } catch (error) {
    dispatch(alert(`No se encontro el conductor con el ${name}`));
  }
};
export const posDrivers = (formData) => {
  return async function () {
    try {
      console.log("Creando conductor...");
      // En lugar de enviar una solicitud POST vacía, envía los datos en el cuerpo de la solicitud
      await axios.post("http://localhost:3001/drivers", formData);

      alert("Conductor creado:", formData);
    } catch (error) {
      console.error("Error al crear el conductor:", error);
    }
  };
};

export const filTrarTeams = (ordenTeams) => {
  return function (dispatch) {
    try {
      dispatch({
        type: FILTERTEAMS,
        payload: ordenTeams,
      });
    } catch (error) {
      dispatch(error.message);
    }
  };
};
export const getAllApiBd = (apiAllBd) => {
  return {
    type: GET_ALL_API_BD,
    payload: apiAllBd,
  };
};
export const ordenDriver = (orden) => {
  return {
    type: ORDER,
    payload: orden,
  };
};
export const ordenDriverDod = (dod) => {
  return {
    type: ORDENBYDOB,
    payload: dod,
  };
};
export const ordenDriverId = (id) => {
  return {
    type: ORDENBYID,
    payload: id,
  };
};
