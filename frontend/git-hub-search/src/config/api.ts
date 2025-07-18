import axios from "axios";

const BASE_API_URL = process.env.REACT_APP_API_URL;

const api = axios.create({
  baseURL: `${BASE_API_URL}`,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;