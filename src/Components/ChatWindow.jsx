
import React from "react";
import MessageBubble from "./MessageBubble";
import fallBack from "../assets/fallback.png";
import { useState, useEffect, useRef } from "react";
import socket from "../socket";
import { getChatMessages, sendChatMessage } from "../Services/chatApi";

export default function ChatWindow({ selectedUser }) {


  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (!selectedUser) return;

    console.log("🟢 Selected chat:", selectedUser); // ✅ YAHAN


    getChatMessages(selectedUser.id).then(res => {
      console.log("📦 FULL API RESPONSE:", res.data);
  console.log("📦 DATA:", res.data.data);
  console.log("📦 FIRST MESSAGE:", res.data.data?.messages?.[0]);

      // setMessages(res.data?.data?.messages || []);
      setMessages(
        Array.isArray(res.data?.data?.messages) ? res.data.data.messages : []
      );

    });
  }, [selectedUser]);

  // Receive real-time messages
  useEffect(() => {
    const handleReceive = (msg) => {
      console.log("📥 Received message:", msg);
      if (msg.chatId === selectedUser?.id) {
        setMessages((prev) => [...prev, msg]);
      }
    };

    socket.on("receiveMessage", handleReceive);
    return () => socket.off("receiveMessage", handleReceive);
  }, [selectedUser]);


  // Handle Typing Indicators
  useEffect(() => {
    const handleTyping = ({ chatId }) => {
      if (chatId === selectedUser?.id) setIsTyping(true);
    };
    const handleStopTyping = ({ chatId }) => {
      if (chatId === selectedUser?.id) setIsTyping(false);
    };

    socket.on("typing", handleTyping);
    socket.on("stopTyping", handleStopTyping);

    return () => {
      socket.off("typing", handleTyping);
      socket.off("stopTyping", handleStopTyping);
    };
  }, [selectedUser]);

  // SEND MESSAGE FUNCTION
  const sendMessage = async () => {
    if (!message.trim() || !selectedUser) return;

    console.log("📤 Sending message:", message, "Chat:", selectedUser);

    const payload = {
      chatId: selectedUser.id,
      receiverId: selectedUser.user.id,
      content: message,
      type: "text",
    };

    const res = await sendChatMessage(payload);
    console.log("✅ Send API response:", res.data);

    // Add locally
    setMessages((prev) => [...prev, res.data.data]);

    // Emit socket
    socket.emit("sendMessage", {
      chatId: selectedUser.id,
      message: res.data.data,
    });

    setMessage("");
  };

  useEffect(() => {
    console.log("Messages state:", messages);
  }, [messages]);
 
  // Date Helper Function
  const formatDateLabel = (dateString) => {
  const date = new Date(dateString);
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  const isToday = date.toDateString() === today.toDateString();
  const isYesterday = date.toDateString() === yesterday.toDateString();

  if (isToday) return "Today";
  if (isYesterday) return "Yesterday";

  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};




  return (
    <div className="flex-grow-1 d-flex flex-column">
      {/* HEADER */}
      <div className="d-flex align-items-center p-3 border-bottom bg-white" style={{ gap: "10px" }}>
        <img
          src={selectedUser
            ? selectedUser.user.image
              ? `http://18.204.175.233:3001/${selectedUser.user.image}`
              : fallBack
            : fallBack}

          // alt={user.name}
          className="rounded-circle"
          style={{ width: "50px", height: "50px", objectFit: "cover" }}
        />
        <div className="flex-grow-1">
          <h6 className="fw-bold mb-0">

            {selectedUser
              ? `${selectedUser.user.firstName} ${selectedUser.user.lastName}`
              : "Select a chat"}
          </h6>

          <small className="text-success">Active</small>
        </div>
      </div>

      {/* CHAT AREA */}

      
      <div
        id="chat-container"
        ref={chatContainerRef}
        className="flex-grow-1 p-3 d-flex flex-column-reverse"
        style={{ overflowY: "auto", background: "#f7f7f7" }}
      >
        {/* {messages.length === 0 ? (
          <div className="text-center mt-5 text-muted">No messages yet</div>
        ) : (
          messages.map((msg) => <MessageBubble key={msg.id} {...msg} />)
        )} */}
        {messages.length === 0 ? (
  <div className="text-center mt-5 text-muted">No messages yet</div>
) : (
  messages.map((msg, index) => {
    const currentDate = formatDateLabel(msg.createdAt);
    const prevDate =
      index > 0
        ? formatDateLabel(messages[index - 1].createdAt)
        : null;

    const showDate = currentDate !== prevDate;

    return (
      <React.Fragment key={msg.id}>
        {showDate && (
          <div
            className="text-center my-2"
            style={{ fontSize: "12px", color: "#666" }}
          >
            <span
              style={{
                background: "#e0e0e0",
                padding: "4px 10px",
                borderRadius: "10px",
              }}
            >
              {currentDate}
            </span>
          </div>
        )}

        <MessageBubble {...msg} />
      </React.Fragment>
    );
  })
)}

      </div>

      {/* TYPING INDICATOR */}

      {isTyping && (
        <div className="text-muted small ms-2">
          User is typing...
        </div>
      )}


      {/* INPUT BAR */}
      <div className="p-3 border-top bg-white d-flex align-items-center gap-2">

        <input
          type="text"
          placeholder="Type your message..."
          className="form-control"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            socket.emit("typing", { chatId: selectedUser.id });
          }}
          onBlur={() => socket.emit("stopTyping", { chatId: selectedUser.id })}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button className="btn btn-primary" onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}