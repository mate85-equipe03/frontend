import axios from "axios";

const api = axios.create({
  baseURL: "https://radiant-cliffs-95153.herokuapp.com",
});

export default api;
