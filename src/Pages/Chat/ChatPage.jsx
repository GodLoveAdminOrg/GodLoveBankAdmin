import React, { useEffect, useState } from "react";
import ChatSidebar from "../../Components/ChatSidebar";
import ChatWindow from "../../Components/ChatWindow";
import Layout from "../../Components/Layout";
import socket from "../../socket";

export default function ChatPage() {

    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
      socket.connect();
      return () => 
        socket.disconnect();
    }, []);
    
    const handleSelectUser = (user) => {
    setSelectedUser(user);

    // join user room
    socket.emit("joinRoom", {
      roomId: `chat_${user.id}`,
    });
    console.log("🟢 Joined room:", `chat_${user.id}`);
  };
    
    useEffect(() => {
  socket.connect();

  socket.on("connect", () => {
    console.log("✅ Socket connected:", socket.id);
  });

  socket.on("connect_error", (err) => {
    console.error("❌ Socket error:", err.message);
  });

  return () => socket.disconnect();
}, []);


  return (
    <Layout>
    <div className="d-flex" style={{ height: "80vh", background: "#bababcff" }}>
      <ChatSidebar 
      selectedUser={selectedUser} 
      setSelectedUser={handleSelectUser} 
      />
      <ChatWindow 
      selectedUser={selectedUser} />
    </div>
    </Layout>
  );
}
