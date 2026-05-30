import API from "./api";

export const getAdminToolsOfThinking = () => {
  return API.get("/admin/tools/tools-of-thinking");
};

export const getAdminToolOfThinkingById = (id) => {
  return API.get(`/admin/tools/tools-of-thinking/${id}`);
};

export const updateAdminToolOfThinkingAudio = (id, payload) => {
  return API.put(`/admin/tools/tools-of-thinking/${id}`, payload, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "multipart/form-data",
    },
  });
};
