import axios from 'axios';

const API = axios.create({
//   baseURL: "http://18.204.175.233:3001",
  baseURL: "/",          // 👈 VERY IMPORTANT
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Token interceptor
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
