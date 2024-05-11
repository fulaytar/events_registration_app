import axios from "axios";

axios.defaults.baseURL = "https://663f2632e3a7c3218a4c3cc7.mockapi.io";

export const fetchEvent = async (currentPage) => {
  const response = await axios.get("/api/v1/events", {
    params: {
      page: currentPage,
      limit: 10,
    },
  });

  return response.data;
};

export const totalPageNavigation = async () => {
  const response = await axios.get("/api/v1/events");
  const totalEvents = response.data.length;
  return totalEvents;
};

export const fetchAllEventByQuery = async (query) => {
  const response = await axios.get("/api/v1/events");
  const filteredEvents = response.data.filter(
    (item) => item.title.includes(query) || item.date.includes(query)
  );
  return filteredEvents;
};

export const addPeople = async (person, eventId) => {
  try {
    const response = await axios.get(`/api/v1/events/${eventId}`);
    const eventData = response.data;

    eventData.people.push(person);

    await axios.put(`/api/v1/events/${eventId}`, eventData);
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const getInfoPeople = async (eventId) => {
  try {
    const response = await axios.get(`/api/v1/events/${eventId}`);
    return response.data.people;
  } catch (error) {
    console.error("Error", error);
    throw error;
  }
};