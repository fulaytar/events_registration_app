import { useState } from "react";
import EventModal from "../EventModal/EventModal";
import css from "./Event.module.css";
import Modal from "react-modal";
import { Link, useLocation } from "react-router-dom";

export default function Event({ title, description, date, eventId }) {
  Modal.setAppElement("#root");
  // modal states
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const location = useLocation();

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleClick = () => {
    openModal();
  };
  return (
    <>
      <li className={css.item}>
        <h2>{title}</h2>
        <p>{description}</p>
        <span>{date}</span>
        <ul className={css.btns}>
          <li>
            <button
              type="button"
              onClick={handleClick}
              className={css.clickBtn}
            >
              Register
            </button>
          </li>
          <li>
            <Link to={`/event/${eventId}`} state={location}>
              <button type="button" className={css.clickBtn}>
                View
              </button>
            </Link>
          </li>
        </ul>
      </li>
      <EventModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        eventId={eventId}
      />
    </>
  );
}
