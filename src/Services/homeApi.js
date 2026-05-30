import API from "./api";

// GET users list (Admin)
export const getAdminUsers = (page = 1, limit = 10) => {
  return API.get(`/admin/users?page=${page}&limit=${limit}`);
};

// GET users questions
export const getAdminUsersQuestions = () => {
  return API.get("/admin/users/questions");
};

// UPDATE question text
export const updateAdminUserQuestion = (id, payload) => {
  return API.patch(`/admin/users/questions/${id}`, payload);
};


export const deleteUser = (id) => {
  return API.delete(`/admin/users/${id}`);
};