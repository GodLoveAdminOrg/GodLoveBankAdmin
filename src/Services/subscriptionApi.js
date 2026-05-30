// subscriptionApi.js
import API from "./api";

export const getAdminSubscriptions = (page = 1, limit = 10) => {
    return API.get(`/admin/subscriptions?page=${page}&limit=${limit}`);
};