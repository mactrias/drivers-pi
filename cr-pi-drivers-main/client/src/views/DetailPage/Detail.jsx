import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import style from "../DetailPage/Detail.module.css";
const URL = "http://localhost:3001/drivers/";
import axios from "axios";

const Detail = () => {
  const { id } = useParams();
  const [driverDetails, setCharacter] = useState({});
  useEffect(() => {
    axios(`${URL}${id}`).then(({ data }) => {
      if (data.firstName) {
        setCharacter(data);
      } else {
        window.alert("No hay personajes con ese id");
      }
    });
    return setCharacter({});
  }, [id]);
  console.log("Valor de driverDetails.team:", driverDetails.teams);
  return (
    <div className={style.divDetail}>
      <div className={style.img}>
        <img
          className={style.imge}
          src={driverDetails.image && driverDetails.image}
          alt={driverDetails.firstName && driverDetails.firstName}
        />
      </div>
      <div className={style.description}>
        <div className={style.description1}>
          <h1>ID: {driverDetails.id && driverDetails.id}</h1>
          <h1> Nombre: {driverDetails.firstName && driverDetails.firstName}</h1>
          <h2>Apellido: {driverDetails.lastName && driverDetails.lastName}</h2>
          <h3>
            Nacionalidad:{" "}
            {driverDetails.nationality && driverDetails.nationality}
          </h3>
          <h3>
            Fecha De Nacimiento:{" "}
            {driverDetails.birthDate && driverDetails.birthDate}
          </h3>
          <h3>Equipo: {driverDetails.team && driverDetails.team}</h3>
          <p>
            Descripcion:{" "}
            {driverDetails.description && driverDetails.description}
          </p>
        </div>
      </div>
    </div>
  );
};
export default Detail;
