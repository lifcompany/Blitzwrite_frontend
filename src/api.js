import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL;
const token = localStorage.getItem("accessToken");
const api = axios.create({
  baseURL: apiUrl,
  headers: {
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
  },
});

// Add a response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Redirect to the login page
      // Optionally, you can clear the token from localStorage or any other state
      localStorage.removeItem("accessToken");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
