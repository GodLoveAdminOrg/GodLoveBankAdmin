import API from './api';

export const adminLogin = (data) => {  
  return API.post("/admin-auth/login", data); 
};
