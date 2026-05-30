

import API from "./api";

// 1️⃣ GET ADMIN CHAT LIST
export const getAdminChats = () => {
  return API.get("/admin/chat");
};

// 2️⃣ GET CHAT MESSAGES (IMPORTANT FIX)
export const getChatMessages = (chatId, page = 1, limit = 20) => {
  return API.post("/admin/chat/messages", {
    chatId,
    page,
    limit
  });
};

// 3️⃣ SEND MESSAGE (ALREADY CORRECT ENDPOINT, FIX PAYLOAD)
export const sendChatMessage = (data) => {
  return API.post("/admin/chat/send", data);
};
