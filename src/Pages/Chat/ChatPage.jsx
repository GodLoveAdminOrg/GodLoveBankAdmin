import React, { useEffect, useState } from "react";
import { Paper, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ChatSidebar from "./ChatSidebar";
import ChatWindow from "./ChatWindow";
import Layout from "../../components/layout/Layout";
import socket from "../../socket";

export default function ChatPage() {
  const [selectedUser, setSelectedUser] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // Single source of truth for the socket connection lifecycle.
  useEffect(() => {
    socket.connect();

    const onConnect = () => console.log("✅ Socket connected:", socket.id);
    const onConnectError = (err) => console.error("❌ Socket error:", err.message);

    socket.on("connect", onConnect);
    socket.on("connect_error", onConnectError);

    return () => {
      socket.off("connect", onConnect);
      socket.off("connect_error", onConnectError);
      socket.disconnect();
    };
  }, []);

  const handleSelectUser = (chat) => {
    setSelectedUser(chat);
    socket.emit("joinRoom", { roomId: `chat_${chat.id}` });
  };

  // On mobile show one pane at a time; on desktop show both.
  const showSidebar = !isMobile || !selectedUser;
  const showWindow = !isMobile || Boolean(selectedUser);

  return (
    <Layout>
      <Paper
        elevation={0}
        sx={{
          display: "flex",
          height: "calc(100vh - 140px)",
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 4,
          overflow: "hidden",
        }}
      >
        {showSidebar && (
          <ChatSidebar selectedUser={selectedUser} setSelectedUser={handleSelectUser} />
        )}
        {showWindow && (
          <ChatWindow
            selectedUser={selectedUser}
            onBack={isMobile ? () => setSelectedUser(null) : undefined}
          />
        )}
      </Paper>
    </Layout>
  );
}
