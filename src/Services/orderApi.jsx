// src/api/orderApi.jsx
import API from "./api";

// 🔹 GET all orders (Paginated)
export const getAdminOrders = (page = 1, limit = 10) =>
  API.get(`/admin/orders?page=${page}&limit=${limit}`);

// 🔴 UPDATE order status by id (Admin)
export const updateOrderStatusApi = (orderId, status) =>
  API.put(`/admin/orders/${orderId}/status`, { status });