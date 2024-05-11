import css from "./App.module.css";
import ListEvent from "../ListEvent/ListEvent";
import Loader from "../Loader/Loader";
import { useEffect, useState } from "react";
import { fetchEvent } from "../../fetchEvent";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";

export default function App() {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function getEvents() {
      try {
        setIsLoading(true);
        const data = await fetchEvent(currentPage);
        /*         console.log(data.length); */
        setEvents(data);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    getEvents();
  }, [currentPage]);
  return (
    <>
      <h1 className={css.title}>Event</h1>
      {events.length > 0 && <ListEvent events={events} />}
      {isLoading && <Loader />}
      {error && (
        <ErrorMessage
          message={"Failed to load event. Please try again later."}
        />
      )}
      {events.length > 0 && <LoadMoreBtn />}
    </>
  );
}
