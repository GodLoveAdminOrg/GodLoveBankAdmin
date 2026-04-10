// subscriptionApi.js
import API from "./api";

export const getAdminSubscriptions = (page = 1) => {
    return API.get(`/admin/subscriptions?page=${page}&limit=10`);
};