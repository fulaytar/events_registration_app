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
