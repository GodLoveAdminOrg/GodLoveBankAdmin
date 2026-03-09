// src/api/orderApi.jsx
import API from "./api";

// 🔹 GET all orders (Paginated)
export const getAdminOrders = (page , limit , search = "" ) => {
  return API.get("/admin/orders", {
    params: {
      page,
      limit,
      ...(search ? { searchKeywords: search } : {}) // ✅ ONLY when search exists
    }
  });
};

// 🔴 UPDATE order status by id (Admin)
export const updateOrderStatusApi = (orderId, status) =>
  API.put(`/admin/orders/${orderId}/status`, { status });