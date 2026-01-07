import API from "./api";

// 🔹 GET all products (Paginated)

export const getProductCategories = () =>
  API.get("/admin/products/categories");
    // 🔹 GET all products (Paginated)
export const getAdminProducts = () => {
  return API.get("/admin/products", {
    headers: {
        autherization: 'Bearer ' + localStorage.getItem("token")
    }
  });   
  
};

// 🔹 POST create new product
export const createAdminProduct = (data) => {
  return API.post("/admin/products", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const updateAdminProduct = (id, data) => {
  return API.put(`/admin/products/${id}`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

// 🔴 DELETE video by id (Admin)
export const deleteProductVideo = (id) => {
  return API.delete(`/admin/products/${id}`);
};
