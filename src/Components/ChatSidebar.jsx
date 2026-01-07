import React, { useEffect, useState } from "react";
import ChatListItem from "./ChatListItem";
import { getAdminChats } from "../Services/chatApi";
// const API_BASE = "http://18.204.175.233:3001";

export default function ChatSidebar({ selectedUser, setSelectedUser }) {
  const [chats, setChats] = useState([]);

  // useEffect(() => {
  //   getAdminChats().then(res => {
  //     setChats(res.data?.data?.length ? res.data.data : []);
  //   });
  // }, []);

useEffect(() => {
  getAdminChats()
    .then(res => {
      setChats(Array.isArray(res.data?.data) ? res.data.data : []);
    })
    .catch(err => {
      console.error("Chat fetch error:", err);
      setChats([]);
    });
}, []);



  return (
    <div className="bg-white border-end" style={{ width: "330px" }}>
      <div className="p-3 border-bottom">
        <h5 className="fw-bold">Chat</h5>
        <input className="form-control mt-3" placeholder="Search..." />
      </div>

      <div style={{ overflowY: "auto", height: "calc(100vh - 100px)" }}>
        {chats.length === 0 && (
          <div className="text-center text-muted mt-4">
            No chats found
          </div>
        )}  

        {chats?.map((chat) => (
        <ChatListItem
          key={chat.id}
                user={{
                  id: chat.id, // chatId
                  name: `${chat.user?.firstName || ""} ${chat.user?.lastName || ""}`,
                  last: chat.lastMessage || "No messages yet",
                  time: chat.lastMessageAt
                    ? new Date(chat.lastMessageAt).toLocaleTimeString()
                    : "",
                  // avatar: chat.user?.image
                  // ? `http://18.204.175.233:3001/${chat.user.image}`
                  // : "/assets/fallback.png"
                  avatar: chat.user?.image || null
                                }}
                active={selectedUser?.id === chat.id}
                onClick={() => setSelectedUser(chat)}
              />
            ))}

      </div>
    </div>
  );
}
