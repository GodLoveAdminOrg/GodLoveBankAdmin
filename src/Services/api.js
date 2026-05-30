import axios from 'axios';
import { toast } from 'react-toastify';

const API = axios.create({
  baseURL: "/",
  withCredentials: true,
});

// Attach auth token to every request.
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Global response error handling.
// - 401: session expired -> clear token + redirect to login (once).
// - Network errors: surface a toast.
// - Other errors are re-thrown so callers can show context-specific messages.
let redirecting = false;

API.interceptors.response.use(
  (response) => response,
  (error) => {
    // No response = network/timeout/server-unreachable.
    if (!error.response) {
      if (error.code !== "ERR_CANCELED") {
        toast.error("Network error — please check your connection.");
      }
      return Promise.reject(error);
    }

    const status = error.response.status;

    if (status === 401) {
      if (!redirecting && !window.location.pathname.startsWith("/login")) {
        redirecting = true;
        localStorage.removeItem("token");
        toast.error("Your session has expired. Please log in again.");
        setTimeout(() => {
          window.location.href = "/login";
        }, 800);
      }
    } else if (status >= 500) {
      toast.error("Server error — please try again later.");
    }

    return Promise.reject(error);
  }
);

export default API;
