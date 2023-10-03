import stayle from "../Card/card.module.css";
import { Link } from "react-router-dom";
const Card = (props) => {
  return (
    <div className={stayle.card}>
      <div className={stayle.cardImg}>
        <Link to={`/detail/${props.id}`}>
          <img src={props.image} alt={props.firstName} />
        </Link>
      </div>
      <h1>{props.firstName}</h1>
      <h4>{props.team}</h4>
      <h5>{props.birthDate}</h5>
    </div>
  );
};
export default Card;
