import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import { toast } from "react-toastify";
import Layout from "../../components/layout/Layout";

const titleCase = (slug = "") =>
  slug
    .replace(/-/g, " ")
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

const FieldCard = ({ title, value, onChange, placeholder }) => (
  <Card elevation={0} sx={{ border: "1px solid #e7e7ea", borderRadius: 3, height: "100%" }}>
    <CardContent>
      <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>
        {title}
      </Typography>
      <TextField
        fullWidth
        multiline
        rows={5}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </CardContent>
  </Card>
);

export default function EmotionPage() {
  const { emotion } = useParams();
  const displayEmotion = titleCase(emotion || "");

  const [oldValue, setOldValue] = useState("");
  const [newValue, setNewValue] = useState("");

  const handleSave = () => {
    // UI demo — wire to an API when available.
    toast.success(`Changes for ${displayEmotion} saved`);
  };

  return (
    <Layout>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", sm: "center" }}
        spacing={2}
        sx={{ mb: 3 }}
      >
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          {displayEmotion} Reconciliation
        </Typography>
        <Button variant="contained" color="error" startIcon={<SaveIcon />} onClick={handleSave}>
          Save Changes
        </Button>
      </Stack>

      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", lg: "1fr 1fr" }, gap: 2.5 }}>
        <FieldCard
          title="Old Self Love"
          value={oldValue}
          onChange={(e) => setOldValue(e.target.value)}
          placeholder="Describe how this emotion was experienced before. What were the old patterns or limiting beliefs associated with it?"
        />
        <FieldCard
          title="New Self Love"
          value={newValue}
          onChange={(e) => setNewValue(e.target.value)}
          placeholder="Describe the new empowered belief, mindset, or behavior you choose to adopt for this emotion."
        />
      </Box>
    </Layout>
  );
}
