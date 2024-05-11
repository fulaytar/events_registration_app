import { useEffect, useState } from "react";
import { fetchAllEventByQuery } from "../../fetchEvent";
import Loader from "../../components/Loader/Loader";
import { Toaster, toast } from "react-hot-toast";
import ListEvent from "../../components/ListEvent/ListEvent";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import css from ".//EventSearch.module.css";
import { useSearchParams } from "react-router-dom";

export default function EventSearch() {
  const [query, setQuery] = useState("");
  const [searchEvent, setSearchEvent] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [params, setParams] = useSearchParams();

  const submitOwnerFilter = (newFilter) => {
    if (!newFilter) {
      return toast("Please enter a text", {
        style: {
          color: "#ffffff",
          backgroundColor: "#FF8C00",
        },
      });
    }
    setParams({ searchEvent: newFilter }); // Оновлення параметрів з використанням нового значення
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const searchRequest = params.get("searchEvent");
        if (!searchRequest) {
          // Якщо searchRequest пустий або не визначений, очистити список фільмів
          setSearchEvent([]);
          return;
        }

        const data = await fetchAllEventByQuery(searchRequest);
        if (data.length === 0) {
          return setError(true);
        }
        setSearchEvent(data);
        setError(false);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    if (params !== "") {
      fetchData();
    }
  }, [params]);

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submitOwnerFilter(query);
        }}
        className={css.form}
      >
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          name="search"
          className={css.input}
        />
        <button type="submit" className={css.button}>
          Search
        </button>
      </form>
      {isLoading && <Loader />}
      {searchEvent.length > 0 && <ListEvent events={searchEvent} />}
      {error && (
        <ErrorMessage
          message={"Failed to search event. Please try again later."}
        />
      )}
      <Toaster position="top-right" containerStyle={{ zIndex: 99999999 }} />
    </div>
  );
}
