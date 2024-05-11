import css from "./Event.module.css";

export default function Event({ title, description, date }) {
  return (
    <>
      <li className={css.item}>
        <h2>{title}</h2>
        <p>{description}</p>
        <span>{date}</span>
        <ul className={css.btns}>
          <li>
            <button type="button">Register</button>
          </li>
          <li>
            <button type="button">View</button>
          </li>
        </ul>
      </li>
    </>
  );
}
