import React, { useState } from "react";
import styles from "../pages/pages.module.css";

const Page = ({ page, setPage, maximo }) => {
  const [input, setInput] = useState(1);

  const nextPage = () => {
    setInput(parseInt(input) + 1);
    setPage(parseInt(page) + 1);
  };

  const previousPage = () => {
    setInput(parseInt(input) - 1);
    setPage(parseInt(page) - 1);
  };

  const onKeyDown = (e) => {
    if (e.keyCode == 13) {
      setPage(parseInt(e.target.value));
      if (
        parseInt(e.target.value < 1) ||
        parseInt(e.target.value) > Math.ceil(maximo) ||
        isNaN(parseInt(e.target.value))
      ) {
        setPage(1);
        setInput(1);
      } else {
        setPage(parseInt(e.target.value));
      }
    }
  };

  const onChange = (e) => {
    setInput(e.target.value);
  };

  return (
    <div className={styles.container}>
      <button
        className={styles.button}
        disabled={page === 1 || page < 1}
        onClick={previousPage}
      >
        Anterior
      </button>
      <input
        className={styles.input}
        onChange={(e) => onChange(e)}
        onKeyDown={(e) => onKeyDown(e)}
        name="page"
        autoComplete="off"
        value={input}
      />
      <p className={styles.p}>de {Math.ceil(maximo)} </p>
      <button
        className={styles.button}
        disabled={page === Math.ceil(maximo) || page > Math.ceil(maximo)}
        onClick={nextPage}
      >
        Siguiente
      </button>
    </div>
  );
};

export default Page;
