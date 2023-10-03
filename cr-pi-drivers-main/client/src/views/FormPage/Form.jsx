import { useState, useEffect } from "react";
import stayle from "../FormPage/Form.module.css";
import validation from "../../views/validation/validation";
import { useDispatch, useSelector } from "react-redux";
import { getTeamsAll, posDrivers } from "../../redux/action";

const Form = () => {
  const allDriver = useSelector((state) => state.Teams);
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    birthDate: "",
    nationality: "",
    image: "",
    description: "",
    teams: [],
  });
  const [errors, setErrors] = useState({
    firstName: "El nombre no debe estar vacio",
    lastName: "El Apellido no debe estar vacio",
    birthDate: "La fecha de nacimiento no debe estar vacía",
    nationality: "La nacionalidad no debe estar vacia",
    image: "La URL de la imagen no debe estar vacía",
    description: "La descripcion no  debe estar vacia",
    teams: "Deves selecionar al menos un equipo",
  });
  // const [teamIds, setTeamsId] = useState([]);
  const handleChange = (event) => {
    if (event.target.name === "teams") {
      setForm({
        ...form,
        [event.target.name]: [...form[event.target.name], event.target.value],
      });
    } else {
      setForm({
        ...form,
        [event.target.name]: event.target.value,
      });
    }
    setErrors(
      validation({
        ...form,
        [event.target.name]: event.target.value,
      })
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Convierte el array de equipos (form.teams) en una cadena JSON
    const teamsAsString = form.teams.join(", ");
    const formWithTeamsAsString = {
      ...form,
      teams: teamsAsString,
    };
    dispatch(posDrivers(formWithTeamsAsString));
  };

  const handleDisable = () => {
    let hasErrors = false;

    for (let err in errors) {
      if (errors[err] !== "") {
        hasErrors = true;
        break;
      }
    }

    return hasErrors;
  };
  useEffect(() => {
    dispatch(getTeamsAll());
  }, []);
  const handleDelete = (teamName) => {
    setForm({
      ...form,
      teams: form.teams.filter((team) => team !== teamName),
    });
  };
  return (
    <div className={stayle.form}>
      <h1 className={stayle.titulo}>Bienvenidos a tu creacion de tu equipo:</h1>
      {console.log(form)}
      <form className={stayle.custom_form} onSubmit={handleSubmit}>
        <label className={stayle.label} htmlFor="">
          firstName
        </label>
        <input
          onChange={handleChange}
          name="firstName"
          className={stayle.input}
          type="text"
          value={form.firstName}
        />
        <div className={stayle.danger}>
          {errors.firstName ? (
            <p>{errors.firstName}</p>
          ) : errors.e2 ? (
            <p>{errors.e2}</p>
          ) : null}
        </div>

        <label className={stayle.label} htmlFor="">
          lastName
        </label>
        <input
          onChange={handleChange}
          name="lastName"
          className={stayle.input}
          type="text"
        />
        <div className={stayle.danger}>
          {" "}
          {errors.lastName ? (
            <p>{errors.lastName}</p>
          ) : errors.a2 ? (
            <p>{errors.a2}</p>
          ) : null}
        </div>

        <label className={stayle.label} htmlFor="">
          {" "}
          birthDate
        </label>
        <input
          onChange={handleChange}
          name="birthDate"
          className={stayle.input}
          type="text"
        />
        <div className={stayle.danger}>
          {" "}
          {errors.birthDate ? (
            <p>{errors.birthDate}</p>
          ) : errors.birthDate ? (
            <p>{errors.birthDate}</p>
          ) : null}
        </div>

        <label className={stayle.label} htmlFor="">
          nationality
        </label>
        <input
          onChange={handleChange}
          name="nationality"
          className={stayle.input}
          type="text"
        />
        <div className={stayle.danger}>
          {" "}
          {errors.nationality ? (
            <p>{errors.nationality}</p>
          ) : errors.n1 ? (
            <p>{errors.n1}</p>
          ) : null}
        </div>

        <label className={stayle.label} htmlFor="">
          image
        </label>
        <input
          onChange={handleChange}
          name="image"
          className={stayle.input}
          type="text"
        />
        <div className={stayle.danger}>
          {errors.image ? (
            <p>{errors.image}</p>
          ) : errors.i1 ? (
            <p>{errors.i1}</p>
          ) : null}
        </div>
        <label className={stayle.label} htmlFor="">
          description
        </label>
        <textarea
          onChange={handleChange}
          name="description"
          className={stayle.textarea}
          type="text"
        />
        <div className={stayle.danger}>
          {errors.description ? (
            <p>{errors.description}</p>
          ) : errors.d1 ? (
            <p>{errors.d1}</p>
          ) : null}
        </div>

        <label className={stayle.label} htmlFor="">
          teams
        </label>

        <select
          multiple
          className={stayle.teams}
          defaultValue={form.teams} // Usar defaultValue en lugar de value
          name="teams"
          id="teams"
          onChange={handleChange}
        >
          {allDriver.map((te) => (
            <option key={te.id} value={te.name}>
              {te.name}
            </option>
          ))}
        </select>
        <div className={stayle.danger}>
          {errors.teams && <p>{errors.teams}</p>}
        </div>
        {form.teams?.map((team, index) => (
          <div key={index} className={stayle.selectedTeam}>
            <label> {team}</label>
            <button
              type="button"
              onClick={() => handleDelete(team)}
              className={stayle.deleteButton}
            >
              x
            </button>
          </div>
        ))}
        <div className={stayle.danger}></div>
        <input
          disabled={handleDisable()}
          className={stayle.input}
          type="submit"
        />
      </form>
    </div>
  );
};
export default Form;
