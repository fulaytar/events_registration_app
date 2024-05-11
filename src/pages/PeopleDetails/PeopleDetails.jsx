import {
  Link,
  useLocation,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { getInfoPeople } from "../../fetchEvent";
import { useEffect, useRef, useState } from "react";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import PeopleInfo from "../../components/PeopleInfo/PeopleInfo";
import css from "./PeopleDetails.module.css";
import toast, { Toaster } from "react-hot-toast";

export default function PeopleDetails() {
  const { eventId } = useParams();
  const [people, setPeople] = useState([]);
  const [copyPeople, setCopyPeople] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [empty, setEmpty] = useState(false);
  const [query, setQuery] = useState("");

  const location = useLocation();
  const backLink = useRef(location.state || "/"); // Ініціалізуємо useRef з location.state або "/"

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
    const getPeople = async () => {
      try {
        setIsLoading(true);
        const data = await getInfoPeople(eventId);
        if (data.length === 0) {
          return setEmpty(true);
        }
        setPeople(data);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };
    getPeople();
  }, [eventId]);

  return (
    <div>
      <Link className={css.linkGoBack} to={backLink.current}>
        Go back{" "}
      </Link>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submitOwnerFilter(query);
          setQuery("");
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
      <ul className={css.list}>
        {people.length > 0 &&
          people.map((infoPeople, index) => (
            <PeopleInfo key={index} info={infoPeople} />
          ))}
      </ul>
      {error && <ErrorMessage message={"Oops, an error occurred."} />}
      {empty && (
        <ErrorMessage message={"Unfortunately, no one has registered."} />
      )}
      <Toaster position="top-right" containerStyle={{ zIndex: 99999999 }} />
    </div>
  );
}
