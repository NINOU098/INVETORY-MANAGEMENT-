import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    Accept: "application/json",
    Authorization: `Bearer ${
      localStorage.getItem("user") &&
      JSON.parse(localStorage.getItem("user")).token
    }`,
  },
});

export default axiosInstance;
