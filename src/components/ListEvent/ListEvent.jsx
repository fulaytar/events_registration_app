import Event from "../Event/Event";

import css from "./ListEvent.module.css";

export default function ListEvent({ events }) {
  return (
    <ul className={css.list}>
      {events.map((item) => (
        <Event
          key={item.id}
          title={item.title}
          description={item.description}
          date={item.date}
        />
      ))}
    </ul>
  );
}
