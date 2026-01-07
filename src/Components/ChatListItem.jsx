import React from "react";
import fallBack from "../assets/fallback.png";

export default function ChatListItem({ user,active,onClick }) {
  if (!user) return null; // 🛡 safety

  console.log("🖼 avatar value:", user?.avatar);
  return (
    <div
    onClick={onClick}
      className="d-flex align-items-center p-3 border-bottom"
      style={{ cursor: "pointer", background: "#fff", gap: "10px" }}
    >
      {/* Profile Picture */}
      <img
        // src={user.avatar}
        src={
    user.avatar
      ? `http://18.204.175.233:3001/${user.avatar}`
      : fallBack
  }

        alt={user.name}
        className="rounded-circle"
        style={{ width: "50px", height: "50px", objectFit: "cover" }}
      />

      {/* Chat Info */}
      <div className="flex-grow-1">
        <h6 className="fw-bold mb-1">{user.name} </h6>
        <div className="text-muted small">{user.last}</div>
      </div>

      {/* Time */}
      <div className="text-muted small">{user.time}</div>
    </div>
  );
}
