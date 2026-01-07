import API from './api';

export const adminLogin = (data) =>
  API.post("/admin-auth/login", data); 
