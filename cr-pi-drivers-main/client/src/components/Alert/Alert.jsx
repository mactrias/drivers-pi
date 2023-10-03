import React from "react";
import { useSelector } from "react-redux";
import style from "../Alert/Alert.module.css";
const Alert = () => {
  const notFound = useSelector((state) => state.Driver.notFound);

  return notFound ? (
    <div className={style.Alert}>
      <h1>Nombre no encontrado</h1>
    </div>
  ) : null;
};

export default Alert;
