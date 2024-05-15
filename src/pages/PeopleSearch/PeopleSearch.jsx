import { useState } from "react";
import { getSearchPeople } from "../../fetchEvent";
import css from "./PeopleSearch.module.css";
import { useEffect } from "react";
import SearchList from "../../components/SearchList/SearchList";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../../components/Loader/Loader";
import { useSearchParams } from "react-router-dom";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

export default function PeopleSearch() {
  const [search, setSearch] = useState("");
  const [dataPeople, setDataPeople] = useState([]);
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
    setParams({ searchPeople: newFilter }); // Оновлення параметрів з використанням нового значення
  };

  useEffect(() => {
    const SearchPeople = async () => {
      try {
        setError(false);
        setIsLoading(true);

        const searchRequest = params.get("searchPeople");
        if (!searchRequest) {
          // Якщо searchRequest пустий або не визначений, очистити список фільмів
          setDataPeople([]);
          return;
        }

        const data = await getSearchPeople(searchRequest);

        if (data.length === 0) {
          setDataPeople([]);
          return toast("Unfortunately, not found.", {
            style: {
              color: "#ffffff",
              backgroundColor: "red",
            },
          });
        } else {
          setDataPeople(data);
        }
      } catch (error) {
        setError(true);
        setDataPeople([]);
      } finally {
        setIsLoading(false);
      }
    };
    SearchPeople();
  }, [params]);

  return (
    <>
      <form
        className={css.form}
        onSubmit={(e) => {
          e.preventDefault();
          submitOwnerFilter(search);
        }}
      >
        <input
          type="text"
          name="search"
          className={css.input}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit" className={css.button}>
          People search
        </button>
      </form>
      {isLoading && <Loader />}
      {dataPeople.length > 0 && <SearchList people={dataPeople} />}
      {error && (
        <ErrorMessage
          message={"Failed to search people. Please try again later."}
        />
      )}
      <Toaster position="top-right" containerStyle={{ zIndex: 99999999 }} />
    </>
  );
}
