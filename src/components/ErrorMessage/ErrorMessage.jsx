import css from "./ErrorMessage.module.css";

export default function ErrorMessage({ message }) {
  return (
    <div>
      <b className={css.error}>{message}</b>
    </div>
  );
}
