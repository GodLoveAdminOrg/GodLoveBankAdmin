import API from "./api";

// Get Video (Paginated)
export const getAdminVideos = () => {
  return API.get("/admin/videos");
};

// 🔹 POST create new video
export const createAdminVideo = (formData) => {
  return API.post("/admin/videos", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// 🔴 DELETE video by id (Admin)
export const deleteAdminVideo = (id) => {
  return API.delete(`/admin/videos/${id}`);
};

// UPDATE VIDEO
export const updateAdminVideo = (id, data) =>
  API.put(`/admin/videos/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

// Api to get video categories
export const getVideoCategories = () => {
  return API.get("/admin/videos/categories");
};
