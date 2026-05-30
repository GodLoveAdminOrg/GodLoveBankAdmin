import React, { useState, useEffect, useRef } from "react";
import {
  Avatar,
  Box,
  Chip,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MessageBubble from "./MessageBubble";
import fallBack from "../../assets/fallback.png";
import socket from "../../socket";
import { fileUrl } from "../../config";
import { getChatMessages, sendChatMessage } from "../../Services/chatApi";

export default function ChatWindow({ selectedUser, onBack }) {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatContainerRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  const chatId = selectedUser?.id;
  const sameChat = (a, b) => String(a) === String(b);

  // Merge a message into state without ever creating duplicates.
  // Matches an incoming message to an existing one by, in order:
  //   1. tempId (optimistic ↔ API response)
  //   2. real id (any re-delivery of the same saved message)
  //   3. a still-pending optimistic bubble with identical content
  //      (this absorbs the server's socket echo of a message we just sent)
  const upsertMessage = (incoming) =>
    setMessages((prev) => {
      let idx = -1;

      if (incoming.tempId != null) {
        idx = prev.findIndex((m) => m.tempId != null && m.tempId === incoming.tempId);
      }
      if (idx === -1 && incoming.id != null) {
        idx = prev.findIndex((m) => m.id != null && String(m.id) === String(incoming.id));
      }
      if (idx === -1 && !incoming.pending) {
        idx = prev.findIndex(
          (m) =>
            m.pending &&
            m.senderType === incoming.senderType &&
            (m.content ?? "") === (incoming.content ?? "")
        );
      }

      if (idx !== -1) {
        const next = [...prev];
        // server fields win; clear the pending flag once confirmed
        next[idx] = { ...next[idx], ...incoming, pending: incoming.pending ?? false };
        return next;
      }
      return [...prev, incoming];
    });

  // Auto-scroll to the latest message.
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Load the message history for the selected chat.
  useEffect(() => {
    if (!chatId) {
      setMessages([]);
      return;
    }

    getChatMessages(chatId)
      .then((res) => {
        const msgs = Array.isArray(res.data?.data?.messages)
          ? res.data.data.messages
          : [];
        // oldest → newest (WhatsApp style)
        msgs.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        setMessages(msgs);
      })
      .catch((err) => {
        console.error("❌ Messages fetch error:", err);
        setMessages([]);
      });
  }, [chatId]);

  // Receive real-time messages.
  useEffect(() => {
    const handleReceive = (msg) => {
      if (sameChat(msg.chatId, chatId)) upsertMessage(msg);
    };

    socket.on("receiveMessage", handleReceive);
    return () => socket.off("receiveMessage", handleReceive);
  }, [chatId]);

  // Typing indicators.
  useEffect(() => {
    const handleTyping = ({ chatId: id }) => {
      if (sameChat(id, chatId)) setIsTyping(true);
    };
    const handleStopTyping = ({ chatId: id }) => {
      if (sameChat(id, chatId)) setIsTyping(false);
    };

    socket.on("typing", handleTyping);
    socket.on("stopTyping", handleStopTyping);

    return () => {
      socket.off("typing", handleTyping);
      socket.off("stopTyping", handleStopTyping);
    };
  }, [chatId]);

  // Emit "typing" then auto-emit "stopTyping" after a short idle.
  const handleInputChange = (e) => {
    setMessage(e.target.value);
    if (!chatId) return;

    socket.emit("typing", { chatId });
    clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => {
      socket.emit("stopTyping", { chatId });
    }, 1000);
  };

  const sendMessage = async () => {
    if (!message.trim() || !selectedUser) return;

    const text = message.trim();
    const tempId = `temp_${Date.now()}`;

    // Optimistic message so it shows instantly (fixes the on-screen delay).
    const optimistic = {
      tempId,
      id: tempId,
      chatId,
      senderType: "admin",
      content: text,
      type: "text",
      createdAt: new Date().toISOString(),
      pending: true,
    };
    upsertMessage(optimistic);
    setMessage("");
    socket.emit("stopTyping", { chatId });

    try {
      const res = await sendChatMessage({
        chatId,
        receiverId: selectedUser.user.id,
        content: text,
        type: "text",
      });

      const saved = res.data?.data;
      if (saved) {
        // reconcile the optimistic bubble with the server's real record
        upsertMessage({ ...saved, tempId });
        socket.emit("sendMessage", { chatId, message: saved });
      }
    } catch (err) {
      console.error("❌ Send message error:", err);
      // mark the optimistic message as failed
      setMessages((prev) =>
        prev.map((m) =>
          m.tempId === tempId ? { ...m, pending: false, failed: true } : m
        )
      );
    }
  };

  const headerImage = selectedUser?.user?.image
    ? fileUrl(selectedUser.user.image)
    : fallBack;

  return (
    <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
      {/* HEADER */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          p: 2,
          borderBottom: "1px solid #e7e7ea",
          bgcolor: "background.paper",
        }}
      >
        {onBack && (
          <IconButton onClick={onBack} edge="start" sx={{ mr: 0.5 }}>
            <ArrowBackIcon />
          </IconButton>
        )}
        <Avatar src={headerImage} sx={{ width: 44, height: 44 }} />
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            {selectedUser
              ? `${selectedUser.user.firstName} ${selectedUser.user.lastName}`
              : "Select a chat"}
          </Typography>
          {selectedUser && (
            <Typography variant="caption" color="success.main">
              ● Active
            </Typography>
          )}
        </Box>
      </Box>

      {/* CHAT AREA */}
      <Box
        ref={chatContainerRef}
        sx={{ flexGrow: 1, p: 2, overflowY: "auto", bgcolor: "#f4f5f7", display: "flex", flexDirection: "column" }}
      >
        {!selectedUser ? (
          <Typography variant="body2" color="text.secondary" sx={{ textAlign: "center", mt: 6 }}>
            Select a chat to start messaging
          </Typography>
        ) : messages.length === 0 ? (
          <Typography variant="body2" color="text.secondary" sx={{ textAlign: "center", mt: 6 }}>
            No messages yet
          </Typography>
        ) : (
          messages.map((msg, index) => {
            const currentDate = new Date(msg.createdAt).toDateString();
            const prevDate =
              index > 0 ? new Date(messages[index - 1].createdAt).toDateString() : null;
            const showDate = index === 0 || currentDate !== prevDate;

            return (
              <React.Fragment key={msg.tempId || msg.id}>
                {showDate && (
                  <Box sx={{ textAlign: "center", my: 1.5 }}>
                    <Chip
                      size="small"
                      label={currentDate === new Date().toDateString() ? "Today" : currentDate}
                    />
                  </Box>
                )}
                <MessageBubble {...msg} />
              </React.Fragment>
            );
          })
        )}
      </Box>

      {/* TYPING INDICATOR */}
      {isTyping && (
        <Typography variant="caption" color="text.secondary" sx={{ px: 2, py: 0.5 }}>
          User is typing…
        </Typography>
      )}

      {/* INPUT BAR */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          p: 1.5,
          borderTop: "1px solid #e7e7ea",
          bgcolor: "background.paper",
        }}
      >
        <TextField
          fullWidth
          placeholder="Type your message…"
          value={message}
          disabled={!selectedUser}
          onChange={handleInputChange}
          onBlur={() => chatId && socket.emit("stopTyping", { chatId })}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <IconButton color="primary" onClick={sendMessage} disabled={!selectedUser}>
          <SendIcon />
        </IconButton>
      </Box>
    </Box>
  );
}
