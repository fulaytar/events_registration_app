import css from "./People.module.css";
import { GrStatusGood } from "react-icons/gr";

export default function People({ title, description, date }) {
  return (
    <li className={css.item}>
      <h2>{title}</h2>
      <p>{description}</p>
      <span>{date}</span>
      <GrStatusGood className={css.icons} fontSize={"35px"} />
    </li>
  );
}
