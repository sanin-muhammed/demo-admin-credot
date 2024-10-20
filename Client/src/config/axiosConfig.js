import axios from "axios";

// create axios instance with base URL and default headers
const axiosInstance = axios.create({
  baseURL: "https://demo-admin-credot.onrender.com/api", // base url
  headers: {
    "Content-Type": "application/json", // Default content type
  },
});

export default axiosInstance;
