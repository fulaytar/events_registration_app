import { useState, useEffect } from "react";
import css from "./Pagination.module.css";
import { totalPageNavigation } from "../../fetchEvent";

export default function Pagination({ onPage }) {
  const [arrayPage, setArrayPage] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const totalPages = Math.ceil((await totalPageNavigation()) / 10);
      const pagesArray = [];
      for (let i = 1; i <= totalPages; i++) {
        pagesArray.push(i);
      }
      setArrayPage(pagesArray);
    };

    fetchData();
  }, []);

  return (
    <ul className={css.list}>
      {arrayPage.map((element) => (
        <button
          key={element}
          onClick={() => onPage(element)}
          className={css.clickBtn}
        >
          {element}
        </button>
      ))}
    </ul>
  );
}
