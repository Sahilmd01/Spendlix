import axios from "axios";
import { BASE_URL } from "./apiPaths";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

//Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("token");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

//Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // If server issued an auto-refreshed token, store it seamlessly so user never logs out
    const refreshedToken = response.headers?.["x-refreshed-token"];
    if (refreshedToken) {
      localStorage.setItem("token", refreshedToken);
    }
    return response;
  },
  (error) => {
    //Handle common errors globally
    if (error.response) {
      if (error.response.status === 401) {
        localStorage.removeItem("token");
        if (window.location.pathname !== "/login" && window.location.pathname !== "/signUp") {
          window.location.replace("/login");
        }
      } else if (error.response.status === 500) {
        console.error("Server error. Please try again later");
      }
    } else if (error.code === "ECONNABORTED") {
      console.error("Request timeout. Please try again");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
