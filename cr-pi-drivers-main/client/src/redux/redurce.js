import {
  GET_DRIVERS,
  SEARCH_DRIVERS_SUCCESS,
  ORDER,
  ORDENBYDOB,
  ORDENBYID,
  GET_ALL_API_BD,
  GET_TEAMS,
  FILTERTEAMS,
} from "./type";

const initialState = {
  Driver: [],
  copyDriver: [],
  Teams: [],
  postDriver: [],
};

const redurce = (state = initialState, action) => {
  switch (action.type) {
    case GET_DRIVERS:
      return {
        ...state,
        Driver: action.payload,
        copyDriver: action.payload,
      };
    case GET_TEAMS:
      return {
        ...state,
        Teams: action.payload,
      };
    case SEARCH_DRIVERS_SUCCESS:
      return { ...state, Driver: action.payload, copyDriver: action.payload };

    case GET_ALL_API_BD:
      return {
        ...state,
        copyDriver:
          action.payload === "api"
            ? state.Driver.filter((drivers) => typeof drivers.id === "number")
            : action.payload === "bd"
            ? state.Driver.filter((drivers) => typeof drivers.id !== "number")
            : state.Driver,
      };
    case FILTERTEAMS:
      return {
        ...state,
        copyDriver: state.Driver.filter((t) => {
          if (t.team) {
            return t.team.includes(action.payload);
          }
        }),
      };
    case ORDER:
      const ordenDriver = [...state.copyDriver];

      return {
        ...state,
        copyDriver:
          action.payload === "A"
            ? ordenDriver.sort((a, b) => a.firstName.localeCompare(b.firstName))
            : ordenDriver.sort((a, b) =>
                b.firstName.localeCompare(a.firstName)
              ),
      };
    case ORDENBYDOB:
      const ordenByDod = [...state.copyDriver];

      return {
        ...state,
        copyDriver:
          action.payload === "A"
            ? ordenByDod.sort((a, b) => a.birthDate.localeCompare(b.birthDate))
            : ordenByDod.sort((a, b) => b.birthDate.localeCompare(a.birthDate)),
      };
    case ORDENBYID:
      const ordenById = [...state.copyDriver];

      return {
        ...state,
        copyDriver:
          action.payload === "A"
            ? ordenById.sort((a, b) => a.id - b.id)
            : ordenById.sort((a, b) => b.id - a.id),
      };

    default:
      return { ...state };
  }
};
export default redurce;
