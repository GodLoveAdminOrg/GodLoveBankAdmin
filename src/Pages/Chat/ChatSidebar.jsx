import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  InputAdornment,
  List,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ChatListItem from "./ChatListItem";
import { getAdminChats } from "../../Services/chatApi";

const IMAGE_EXTENSIONS = [".jpg", ".jpeg", ".png", ".gif", ".webp"];

const previewText = (lastMessage) => {
  const msg = lastMessage || "";
  const isImage = IMAGE_EXTENSIONS.some((ext) => msg.toLowerCase().includes(ext));
  if (isImage) return "📷 Photo";
  return msg || "No messages yet";
};

export default function ChatSidebar({ selectedUser, setSelectedUser }) {
  const [chats, setChats] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getAdminChats()
      .then((res) => setChats(Array.isArray(res.data?.data) ? res.data.data : []))
      .catch((err) => {
        console.error("Chat fetch error:", err);
        setChats([]);
      });
  }, []);

  const filteredChats = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return chats;
    return chats.filter((chat) =>
      `${chat.user?.firstName || ""} ${chat.user?.lastName || ""}`.toLowerCase().includes(q)
    );
  }, [chats, search]);

  return (
    <Box
      sx={{
        width: { xs: "100%", md: 320 },
        flexShrink: 0,
        borderRight: { xs: "none", md: "1px solid #e7e7ea" },
        display: "flex",
        flexDirection: "column",
        bgcolor: "background.paper",
      }}
    >
      <Box sx={{ p: 2, borderBottom: "1px solid #e7e7ea" }}>
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 1.5 }}>
          Chat
        </Typography>
        <TextField
          fullWidth
          placeholder="Search…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <List sx={{ flexGrow: 1, overflowY: "auto", p: 0 }}>
        {filteredChats.length === 0 && (
          <Typography variant="body2" color="text.secondary" sx={{ textAlign: "center", mt: 4 }}>
            No chats found
          </Typography>
        )}
        {filteredChats.map((chat) => (
          <ChatListItem
            key={chat.id}
            user={{
              id: chat.id,
              name: `${chat.user?.firstName || ""} ${chat.user?.lastName || ""}`.trim(),
              last: previewText(chat.lastMessage),
              time: chat.lastMessageAt ? new Date(chat.lastMessageAt).toLocaleTimeString() : "",
              avatar: chat.user?.image || null,
            }}
            active={selectedUser?.id === chat.id}
            onClick={() => setSelectedUser(chat)}
          />
        ))}
      </List>
    </Box>
  );
}
