import React from "react";
import { Avatar, ListItemAvatar, ListItemButton, ListItemText, Typography } from "@mui/material";
import fallBack from "../../assets/fallback.png";
import { fileUrl } from "../../config";

export default function ChatListItem({ user, active, onClick }) {
  if (!user) return null;

  return (
    <ListItemButton
      onClick={onClick}
      selected={active}
      sx={{ px: 2, py: 1.25, borderBottom: "1px solid #f0f0f0", alignItems: "flex-start" }}
    >
      <ListItemAvatar>
        <Avatar src={user.avatar ? fileUrl(user.avatar) : fallBack} alt={user.name} />
      </ListItemAvatar>
      <ListItemText
        primary={
          <Typography variant="subtitle2" sx={{ fontWeight: 700 }} noWrap>
            {user.name || "Unknown"}
          </Typography>
        }
        secondary={
          <Typography variant="body2" color="text.secondary" noWrap>
            {user.last}
          </Typography>
        }
      />
      {user.time && (
        <Typography variant="caption" color="text.secondary" sx={{ ml: 1, whiteSpace: "nowrap" }}>
          {user.time}
        </Typography>
      )}
    </ListItemButton>
  );
}
