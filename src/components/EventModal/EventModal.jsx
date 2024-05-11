import Modal from "react-modal";
import { Formik, Form, Field, ErrorMessage } from "formik";

import css from "./EventModal.module.css";
import { addPeople } from "../../fetchEvent";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function EventModal({ isOpen, onRequestClose, eventId }) {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const validateDate = (value) => {
    const selected = new Date(value);
    let today = new Date();
    if (selected < today) {
      const day = today.getDate().toString().padStart(2, "0");
      const month = (today.getMonth() + 1).toString().padStart(2, "0");
      const year = today.getFullYear();
      const formattedToday = `${year}-${month}-${day}`;

      return setSelectedDate(formattedToday);
    }
    toast("Select a date in the past", {
      style: {
        color: "#ffffff",
        backgroundColor: "#FF8C00",
      },
    });
  };

  const initialValues = {
    fullName: "",
    email: "",
    dateOfBirth: "",
    option: "",
  };

  const onSubmit = async (values) => {
    addPeople(values, eventId);
    onRequestClose();
    toast("Successfully!", {
      style: {
        color: "#ffffff",
        backgroundColor: "green",
      },
    });
  };

  const customStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.7)", // темний фон з прозорістю
    },
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      border: "none", // видаляємо рамку
      borderRadius: "10px", // закруглені кути
      maxWidth: "90%", // максимальна ширина контенту
      maxHeight: "90%", // максимальна висота контенту
      overflow: "hidden", // ховаємо зайвий контент, який може виходити за межі
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", // тінь для ефекту підняття
      display: "flex", // використовуємо flex для центрування фото
      alignItems: "center", // центруємо по вертикалі
      justifyContent: "center", // центруємо по горизонталі
    },
  };
  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        contentLabel="Modal form"
        shouldCloseOnEsc={true}
        shouldCloseOnOverlayClick={true}
        style={customStyles}
      >
        <div className={css.formContainer}>
          <Formik initialValues={initialValues} onSubmit={onSubmit}>
            <Form>
              <div className={css.formField}>
                <label htmlFor="fullName">Full name</label>
                <Field id="fullName" name="fullName" type="text" required />
                <ErrorMessage
                  name="fullName"
                  component="div"
                  className={css.errorMessage}
                />
              </div>
              <div className={css.formField}>
                <label htmlFor="email">Email</label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email"
                  required
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className={css.errorMessage}
                />
              </div>
              <div className={css.formField}>
                <label htmlFor="dateOfBirth">Date of birth</label>
                <Field
                  type="date"
                  id="dateOfBirth"
                  name="dateOfBirth"
                  onChange={(e) => {
                    validateDate(e.target.value);
                  }}
                  value={selectedDate}
                  required
                />
                <ErrorMessage
                  name="dateOfBirth"
                  component="div"
                  className={css.errorMessage}
                />
              </div>
              <div className={css.radioGroup}>
                <label>Where did you hear about this event?</label>
                <div>
                  <label>
                    <Field
                      type="radio"
                      name="option"
                      value="Social media"
                      required
                    />
                    Social media
                  </label>
                </div>
                <div>
                  <label>
                    <Field
                      type="radio"
                      name="option"
                      value="Friends"
                      required
                    />
                    Friends
                  </label>
                </div>
                <div>
                  <label>
                    <Field
                      type="radio"
                      name="option"
                      value="Found myself"
                      required
                    />
                    Found myself
                  </label>
                </div>
                <ErrorMessage
                  name="option"
                  component="div"
                  className={css.errorMessage}
                />
              </div>
              <button type="submit" className={css.submitButton}>
                Send
              </button>
            </Form>
          </Formik>
        </div>
      </Modal>
      <Toaster position="top-right" containerStyle={{ zIndex: 99999999 }} />
    </>
  );
}
