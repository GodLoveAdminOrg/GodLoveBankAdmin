import React from "react";
import { Avatar, Box, Paper, Typography } from "@mui/material";

/**
 * Compact Material stat tile.
 * Props: label, value, icon (node), color (theme color string e.g. "primary.main")
 */
export default function StatCard({ label, value, icon, color = "primary.main" }) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2.5,
        border: "1px solid #e7e7ea",
        borderRadius: 3,
        display: "flex",
        alignItems: "center",
        gap: 2,
        height: "100%",
        transition: "transform .2s ease, box-shadow .2s ease",
        "&:hover": { transform: "translateY(-3px)", boxShadow: 3 },
      }}
    >
      {icon && (
        <Avatar
          variant="rounded"
          sx={{ bgcolor: `${color}`, width: 48, height: 48, opacity: 0.95 }}
        >
          {icon}
        </Avatar>
      )}
      <Box>
        <Typography variant="h5" sx={{ fontWeight: 700, lineHeight: 1.1 }}>
          {value}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {label}
        </Typography>
      </Box>
    </Paper>
  );
}
