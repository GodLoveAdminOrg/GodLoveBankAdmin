import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  IconButton,
  MenuItem,
  Stack,
  Switch,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import ResponsiveDialog from "../../components/common/ResponsiveDialog";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";

import Layout from "../../components/layout/Layout";
import PageHeader from "../../components/common/PageHeader";
import usePagination from "../../components/common/usePagination";
import { fileUrl } from "../../config";
import fallback from "../../assets/fallback.png";
import {
  getAdminVideos,
  deleteAdminVideo,
  createAdminVideo,
  updateAdminVideo,
  getVideoCategories,
} from "../../Services/mediaApi";

const resolveUrl = (u) =>
  !u ? null : String(u).startsWith("http") ? u : fileUrl(u);

const EMPTY = {
  tags: "",
  title: "",
  shortDescription: "",
  description: "",
  categoryId: "",
  status: 1,
  video: null,
  thumbnail: null,
};

export default function MediaControl() {
  const [form, setForm] = useState(EMPTY);
  const [mediaList, setMediaList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [playVideo, setPlayVideo] = useState(null);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [editItem, setEditItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errors, setErrors] = useState({});

  const { pageItems, Pager } = usePagination(mediaList, 8);

  const validate = () => {
    const e = {};
    if (!form.title.trim()) e.title = "Title is required";
    if (!form.categoryId) e.categoryId = "Category is required";
    if (!editItem && !form.video) e.video = "Video is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const fetchVideos = async () => {
    try {
      const res = await getAdminVideos();
      setMediaList(Array.isArray(res.data?.data) ? res.data.data : []);
    } catch (error) {
      console.error("Media fetch error", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await getVideoCategories();
      setCategories(Array.isArray(res.data?.data) ? res.data.data : []);
    } catch (error) {
      /* non-blocking */
    }
  };

  useEffect(() => {
    fetchVideos();
    fetchCategories();
  }, []);

  const openAdd = () => {
    setEditItem(null);
    setForm(EMPTY);
    setErrors({});
    setIsModalOpen(true);
  };

  const openEdit = (item) => {
    setEditItem(item);
    setErrors({});
    setForm({
      tags: item.tags || "",
      title: item.title || "",
      shortDescription: item.shortDescription || "",
      description: item.description || "",
      categoryId: item.categoryId ?? "",
      status: item.status ?? 1,
      video: null,
      thumbnail: null,
    });
    setIsModalOpen(true);
  };

  const buildFormData = () => {
    const fd = new FormData();
    fd.append("tags", form.tags);
    fd.append("title", form.title);
    fd.append("shortDescription", form.shortDescription);
    fd.append("description", form.description);
    fd.append("categoryId", form.categoryId);
    fd.append("status", form.status);
    if (form.video) fd.append("video", form.video);
    if (form.thumbnail) fd.append("thumbnail", form.thumbnail);
    return fd;
  };

  const handleAdd = async () => {
    if (!validate()) return;
    setSaving(true);
    try {
      await createAdminVideo(buildFormData());
      await fetchVideos();
      toast.success("Video added successfully");
      setForm(EMPTY);
      setIsModalOpen(false);
    } catch (error) {
      toast.error("Video upload failed");
    } finally {
      setSaving(false);
    }
  };

  const handleUpdate = async () => {
    if (!editItem) return;
    if (!validate()) return;
    setSaving(true);
    try {
      await updateAdminVideo(editItem.id, buildFormData());
      await fetchVideos();
      toast.success("Video updated successfully");
      setEditItem(null);
      setForm(EMPTY);
      setIsModalOpen(false);
    } catch (error) {
      toast.error("Update failed");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this video?")) return;
    const previous = mediaList;
    setMediaList((prev) => prev.filter((v) => v.id !== id));
    setDeletingId(id);
    try {
      await deleteAdminVideo(id);
      toast.success("Video deleted successfully");
      fetchVideos();
    } catch (error) {
      setMediaList(previous);
      toast.error("Failed to delete video");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <Layout>
      <PageHeader
        title="Media Control"
        subtitle="Manage videos shown across the app"
        actions={
          <Button variant="contained" startIcon={<AddIcon />} onClick={openAdd}>
            Add Media
          </Button>
        }
      />

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "repeat(2,1fr)", md: "repeat(3,1fr)", xl: "repeat(4,1fr)" },
          gap: 3,
        }}
      >
        {pageItems.map((item) => (
          <Card
            key={item.id}
            elevation={0}
            sx={{
              border: "1px solid #e7e7ea",
              borderRadius: 3,
              overflow: "hidden",
              transition: "transform .2s ease, box-shadow .2s ease",
              "&:hover": { transform: "translateY(-4px)", boxShadow: 4 },
            }}
          >
            {/* Thumbnail with play overlay */}
            <Box
              sx={{ position: "relative", height: 180, cursor: "pointer", bgcolor: "#000" }}
              onClick={() => {
                if (!item.videoUrl) return toast.error("Video not ready yet");
                setPlayVideo(resolveUrl(item.videoUrl));
              }}
            >
              <Box
                component="img"
                src={resolveUrl(item.thumbnailUrl) || fallback}
                alt={item.title}
                sx={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <Box
                sx={{
                  position: "absolute", inset: 0, display: "flex", alignItems: "center",
                  justifyContent: "center", bgcolor: "rgba(0,0,0,0.15)",
                }}
              >
                <Box
                  sx={{
                    width: 52, height: 52, borderRadius: "50%", bgcolor: "rgba(0,0,0,0.55)",
                    color: "#fff", display: "flex", alignItems: "center", justifyContent: "center",
                  }}
                >
                  <PlayArrowIcon />
                </Box>
              </Box>
            </Box>

            <CardContent>
              {item.tags && <Chip label={item.tags} size="small" sx={{ mb: 1 }} />}
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }} noWrap>
                {item.title}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mb: 2, minHeight: 40, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}
              >
                {item.shortDescription}
              </Typography>
              <Stack direction="row" spacing={1}>
                <Tooltip title="Edit">
                  <IconButton color="primary" onClick={() => openEdit(item)}>
                    <EditIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                  <IconButton color="error" disabled={deletingId === item.id} onClick={() => handleDelete(item.id)}>
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Stack>
            </CardContent>
          </Card>
        ))}
      </Box>

      <Pager />

      {/* ADD / EDIT FORM */}
      <ResponsiveDialog open={isModalOpen} onClose={() => setIsModalOpen(false)} fullWidth maxWidth="md">
        <DialogTitle sx={{ fontWeight: 700 }}>
          {editItem ? "Edit Media / Video" : "Add Media / Video"}
        </DialogTitle>
        <DialogContent dividers>
          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 2, pt: 1 }}>
            <TextField label="Tags" value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} />
            <TextField
              label="Title"
              required
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              error={Boolean(errors.title)}
              helperText={errors.title}
            />
            <TextField
              label="Short Description"
              value={form.shortDescription}
              onChange={(e) => setForm({ ...form, shortDescription: e.target.value })}
              sx={{ gridColumn: { sm: "1 / -1" } }}
            />
            <TextField
              label="Description"
              multiline
              rows={3}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              sx={{ gridColumn: { sm: "1 / -1" } }}
            />
            <TextField
              select
              label="Category"
              required
              value={form.categoryId ?? ""}
              onChange={(e) => setForm({ ...form, categoryId: Number(e.target.value) })}
              error={Boolean(errors.categoryId)}
              helperText={errors.categoryId}
            >
              <MenuItem value="">Select Category</MenuItem>
              {categories.filter((c) => c.status === 1).map((c) => (
                <MenuItem key={c.id} value={c.id}>{c.name}</MenuItem>
              ))}
            </TextField>
            <FormControlLabel
              control={
                <Switch
                  checked={form.status === 1}
                  onChange={(e) => setForm({ ...form, status: e.target.checked ? 1 : 0 })}
                  color="success"
                />
              }
              label={form.status === 1 ? "Active" : "Inactive"}
            />
            <Button component="label" variant="outlined" startIcon={<UploadFileIcon />}>
              {editItem ? "Replace Video" : "Upload Video"}
              <input hidden type="file" accept="video/*" onChange={(e) => setForm({ ...form, video: e.target.files[0] })} />
            </Button>
            <Button component="label" variant="outlined" startIcon={<UploadFileIcon />}>
              Upload Thumbnail
              <input hidden type="file" accept="image/*" onChange={(e) => setForm({ ...form, thumbnail: e.target.files[0] })} />
            </Button>
            <Box sx={{ gridColumn: { sm: "1 / -1" }, color: "text.secondary", fontSize: 13 }}>
              {form.video && <span>🎬 {form.video.name}&nbsp;&nbsp;</span>}
              {form.thumbnail && <span>🖼 {form.thumbnail.name}</span>}
              {errors.video && (
                <Box component="span" sx={{ color: "error.main" }}>
                  {errors.video}
                </Box>
              )}
            </Box>
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button onClick={() => setIsModalOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={editItem ? handleUpdate : handleAdd} disabled={saving}>
            {saving ? "Saving…" : editItem ? "Update" : "Save"}
          </Button>
        </DialogActions>
      </ResponsiveDialog>

      {/* VIDEO PLAYER */}
      <ResponsiveDialog open={Boolean(playVideo)} onClose={() => setPlayVideo(null)} maxWidth="md" fullWidth>
        <Box sx={{ position: "relative", bgcolor: "#000" }}>
          <IconButton
            onClick={() => setPlayVideo(null)}
            sx={{ position: "absolute", top: 8, right: 8, zIndex: 1, color: "#fff", bgcolor: "rgba(0,0,0,0.5)" }}
          >
            <CloseIcon />
          </IconButton>
          {playVideo && <video src={playVideo} controls autoPlay style={{ width: "100%", display: "block" }} />}
        </Box>
      </ResponsiveDialog>
    </Layout>
  );
}
