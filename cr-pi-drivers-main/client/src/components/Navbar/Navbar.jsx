import { Link } from "react-router-dom";
import stayle from "../Navbar/Navbar.module.css";
const Navbar = () => {
  return (
    <div className={stayle.mainNavbar}>
      <Link to="/home">
        <button className={stayle.button1}> Home</button>
      </Link>
      <Link to="/create">
        <button className={stayle.button2}>Form</button>
      </Link>
      <Link to="/">
        <img
          className={stayle.imgButton}
          src="https://brandemia.org/sites/default/files/inline/images/f1-logo-red-on-black-e1511528736760.png"
          alt=""
        />
      </Link>
    </div>
  );
};
export default Navbar;
