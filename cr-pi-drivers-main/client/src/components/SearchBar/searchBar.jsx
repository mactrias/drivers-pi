import stayle from "../SearchBar/Search.module.css";
import { useDispatch, useSelector } from "react-redux";
import { searchDrivers, getDrivers } from "../../redux/action";
import { useState } from "react";
const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const name = useSelector((state) => state.copyDriver);
  const dispatch = useDispatch();
  const handleSearch = () => {
    // Despacha la acción de búsqueda con el término de búsqueda actual
    if (searchTerm) {
      dispatch(searchDrivers(searchTerm));
    }
  };
  const handleShowAll = () => {
    dispatch(getDrivers());
    setSearchTerm(""); // Opcional: limpia el campo de búsqueda
  };
  return (
    <div className={stayle.divSearvbar}>
      <select
        className={stayle.name}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      >
        <option value="">Seleccionar un nombre</option>
        {name?.map((te) => (
          <option key={te.id} value={te.firstName}>
            {te.firstName}
          </option>
        ))}
      </select>

      <input
        className={stayle.input}
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button className={stayle.buscar} onClick={handleSearch}>
        Buscar
      </button>
      <button className={stayle.todo} onClick={handleShowAll}>
        Mostrar Todos
      </button>
    </div>
  );
};
export default SearchBar;
