import axios from "axios";

// create axios instance with base URL and default headers
const axiosInstance = axios.create({
  baseURL: "http://localhost:2003/api",
  headers: {
    "Content-Type": "application/json", // Default content type
  },
});

export default axiosInstance;
