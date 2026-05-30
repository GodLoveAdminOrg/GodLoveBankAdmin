import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { toast } from "react-toastify";
import { fileUrl } from "../../config";

/**
 * Colored card with audio upload + preview.
 * Shared by Core Values and Tools of Thinking.
 */
const CoreValueCard = ({
  coreValue,
  title,
  color,
  audioUrl,
  onUpload, // (id, formData) => Promise
  onUpdated, // refresh callback
  onClick,
}) => {
  const [audioFile, setAudioFile] = useState(null);
  const [saving, setSaving] = useState(false);

  if (!coreValue) return null;

  const handleUpload = async (e) => {
    e.stopPropagation();
    if (!coreValue?.id) return;
    if (!audioFile) return toast.error("Please select an audio file");
    if (!onUpload) return;
    try {
      setSaving(true);
      const formData = new FormData();
      formData.append("audio", audioFile);
      await onUpload(coreValue.id, formData);
      setAudioFile(null);
      toast.success("Audio uploaded");
      onUpdated?.();
    } catch (err) {
      toast.error("Audio upload failed");
    } finally {
      setSaving(false);
    }
  };

  // Choose readable text color (these brand colors are dark → white text).
  const textColor = "#fff";

  return (
    <Card
      elevation={0}
      onClick={onClick}
      sx={{
        backgroundColor: color || "#333",
        color: textColor,
        borderRadius: 3,
        cursor: onClick ? "pointer" : "default",
        transition: "transform .15s, box-shadow .15s",
        "&:hover": onClick ? { transform: "translateY(-2px)", boxShadow: 4 } : {},
      }}
    >
      <CardContent>
        <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1.5 }}>
          {title}
        </Typography>

        {audioUrl && (
          <Box
            component="audio"
            controls
            src={fileUrl(audioUrl)}
            onClick={(e) => e.stopPropagation()}
            sx={{ width: "100%", mb: 1.5 }}
          />
        )}

        <Box sx={{ display: "flex", gap: 1, alignItems: "center", flexWrap: "wrap" }}>
          <Button
            component="label"
            size="small"
            variant="contained"
            startIcon={<UploadFileIcon />}
            onClick={(e) => e.stopPropagation()}
            sx={{ bgcolor: "rgba(255,255,255,0.18)", color: "#fff", "&:hover": { bgcolor: "rgba(255,255,255,0.3)" } }}
          >
            {audioFile ? "Change" : "Select Audio"}
            <input
              hidden
              type="file"
              accept="audio/*"
              onClick={(e) => e.stopPropagation()}
              onChange={(e) => setAudioFile(e.target.files[0])}
            />
          </Button>
          {audioFile && (
            <Typography variant="caption" sx={{ flexGrow: 1, opacity: 0.9 }} noWrap>
              {audioFile.name}
            </Typography>
          )}
          <Button
            size="small"
            variant="contained"
            color="success"
            disabled={saving || !audioFile}
            onClick={handleUpload}
          >
            {saving ? "Uploading…" : "Save"}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CoreValueCard;
