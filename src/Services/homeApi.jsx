import API from "./api";

// GET users list (Admin)
export const getAdminUsers = (params = {}) => {
  return API.get("/admin/users", { params });
};

// GET users questions
export const getAdminUsersQuestions = () => {
  return API.get("/admin/users/questions");
};

// UPDATE question text
export const updateAdminUserQuestion = (id, payload) => {
  return API.patch(`/admin/users/questions/${id}`, payload);
};
