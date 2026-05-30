import { useState } from "react";
import { Box, Typography } from "@mui/material";
import BrokenImageOutlinedIcon from "@mui/icons-material/BrokenImageOutlined";
import { fileUrl } from "../../config";

export default function MessageBubble({
  senderType,
  content,
  createdAt,
  type,
  pending,
  failed,
}) {
  const isAdmin = senderType === "admin";
  const isImage = type === "image" && Boolean(content);
  const imgSrc = isImage ? fileUrl(content) : null;
  const [imgError, setImgError] = useState(false);

  return (
    <Box sx={{ display: "flex", justifyContent: isAdmin ? "flex-end" : "flex-start", mb: 1.5 }}>
      <Box
        sx={{
          maxWidth: "65%",
          px: 1.5,
          py: 1,
          borderRadius: 2.5,
          bgcolor: isAdmin ? "primary.main" : "#fff",
          color: isAdmin ? "#fff" : "text.primary",
          border: isAdmin ? "none" : "1px solid #e7e7ea",
          opacity: pending ? 0.7 : 1,
          boxShadow: isAdmin ? "none" : "0 1px 2px rgba(0,0,0,0.04)",
        }}
      >
        {/* Text message */}
        {content && !isImage && (
          <Typography variant="body2" sx={{ wordBreak: "break-word" }}>
            {content}
          </Typography>
        )}

        {/* Image message */}
        {isImage &&
          (imgError ? (
            // Graceful placeholder when the image can't be loaded.
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                px: 1.5,
                py: 1.25,
                borderRadius: 1.5,
                bgcolor: isAdmin ? "rgba(255,255,255,0.15)" : "#f1f2f4",
                color: isAdmin ? "#fff" : "text.secondary",
                minWidth: 160,
              }}
            >
              <BrokenImageOutlinedIcon fontSize="small" />
              <Typography variant="caption">Image unavailable</Typography>
            </Box>
          ) : (
            <Box
              component="img"
              src={imgSrc}
              alt="Shared image"
              loading="lazy"
              onError={() => setImgError(true)}
              sx={{
                display: "block",
                maxWidth: "100%",
                maxHeight: 280,
                objectFit: "cover",
                borderRadius: 1.5,
                mt: 0.5,
              }}
            />
          ))}

        <Typography
          variant="caption"
          sx={{ display: "block", textAlign: isAdmin ? "right" : "left", opacity: 0.7, mt: 0.25 }}
        >
          {failed
            ? "Failed to send"
            : pending
            ? "Sending…"
            : new Date(createdAt).toLocaleTimeString()}
        </Typography>
      </Box>
    </Box>
  );
}
