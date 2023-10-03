import { Link } from "react-router-dom";
import stayle from "./Lading.module.css";

const Landing = () => {
  return (
    <div className={stayle.landing}>
      <div className={stayle.content}>
        <Link to={"/home"}>
          <button className={stayle.button}>Página principal</button>
        </Link>
      </div>
    </div>
  );
};

export default Landing;
