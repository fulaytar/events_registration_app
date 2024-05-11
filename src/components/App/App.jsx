import { Routes, Route } from "react-router-dom";
import Layout from "../Layout/Layout";
import HomePage from "../../pages/Home/Home";
import NotFoundPage from "../../pages/NotFoundPage/NotFoundPage";
import EventSearch from "../../pages/EventSearch/EventSearch";
import PeopleDetails from "../../pages/PeopleDetails/PeopleDetails";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/event" element={<EventSearch />} />
        <Route path="/event/:eventId" element={<PeopleDetails />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Layout>
  );
}
