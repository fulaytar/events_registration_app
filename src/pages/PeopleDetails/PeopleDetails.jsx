import { Link, useLocation, useParams } from "react-router-dom";
import { getInfoPeople } from "../../fetchEvent";
import { useEffect, useRef, useState } from "react";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import PeopleInfo from "../../components/PeopleInfo/PeopleInfo";
import css from "./PeopleDetails.module.css";

export default function PeopleDetails() {
  const { eventId } = useParams();
  const [people, setPeople] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [empty, setEmpty] = useState(false);


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
       {isLoading && <Loader />}
      <ul className={css.list}>
        {people.length > 0 &&
          people.map((infoPeople, index) => (
            <PeopleInfo key={index} info={infoPeople} />
          ))}
      </ul>
      {error && (
        <ErrorMessage message={"Unfortunately, no one has registered."} />
      )}
      {empty && (
        <ErrorMessage message={"Unfortunately, no one has registered."} />
      )}
    </div>
  );
}
