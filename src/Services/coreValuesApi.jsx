import API from "./api";

export const getAdminCoreValues = () => {
  return API.get("/admin/core-values");
};

export const getAdminCoreValueById = (id) => {
  return API.get(`/admin/core-values/${id}`);
};

export const updateAdminCoreValue = (id, payload) => {
  return API.put(`/admin/core-values/${id}`, payload, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};
