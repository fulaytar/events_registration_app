
import css from "./PeopleInfo.module.css";


export default function PeopleInfo({ info }) {
  return (
    <>
      <li className={css.item}>
        <h2>{info.fullName}</h2>
        <p>{info.email}</p>
      </li>
    </>
  );
}
