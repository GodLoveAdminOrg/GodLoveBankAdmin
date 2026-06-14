import { useEffect, useMemo, useState } from "react";
import {
  Avatar,
  Box,
  Button,
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
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import ResponsiveDialog from "../../components/common/ResponsiveDialog";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { toast } from "react-toastify";

import Layout from "../../components/layout/Layout";
import DataTable from "../../components/common/DataTable";
import PageHeader from "../../components/common/PageHeader";
import { fileUrl } from "../../config";
import fallback from "../../assets/fallback.png";
import {
  getProductCategories,
  getAdminProducts,
  createAdminProduct,
  updateAdminProduct,
  deleteProductVideo,
} from "../../Services/productApi";

const EMPTY_FORM = {
  publishedDate: "",
  name: "",
  author: "",
  price: "",
  description: "",
  categoryId: "",
  image: null,
  inventory: "",
  status: 1,
};

export default function Product() {
  const [form, setForm] = useState(EMPTY_FORM);
  const [productList, setProductList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Product name is required";
    if (form.price === "" || form.price === null) e.price = "Price is required";
    else if (Number(form.price) < 0) e.price = "Price cannot be negative";
    if (!form.categoryId) e.categoryId = "Category is required";
    if (!editItem && !form.image) e.image = "Product image is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await getAdminProducts();
      setProductList(Array.isArray(res.data?.data) ? res.data.data : []);
    } catch (error) {
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await getProductCategories();
      setCategories(Array.isArray(res.data?.data) ? res.data.data : []);
    } catch (error) {
      /* non-blocking */
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  const categoryMap = useMemo(
    () => Object.fromEntries(categories.map((c) => [c.id, c.name])),
    [categories]
  );

  // Rows enriched with category name for display/search/sort.
  const rows = useMemo(
    () =>
      productList.map((p) => ({
        ...p,
        categoryName: categoryMap[p.categoryId] || "—",
      })),
    [productList, categoryMap]
  );

  const openAdd = () => {
    setEditItem(null);
    setForm(EMPTY_FORM);
    setErrors({});
    setIsModalOpen(true);
  };

  const openEdit = (item) => {
    setEditItem(item);
    setErrors({});
    setForm({
      publishedDate: item.publishedDate || "",
      name: item.name || "",
      author: item.author || "",
      price: item.price || "",
      description: item.description || "",
      categoryId: item.categoryId ?? "",
      image: null,
      inventory: item.inventory || "",
      status: item.status ?? 1,
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditItem(null);
  };

  const buildFormData = (includeImageRequired) => {
    const fd = new FormData();
    fd.append("publishedDate", form.publishedDate);
    fd.append("name", form.name);
    fd.append("author", form.author);
    fd.append("price", form.price);
    fd.append("description", form.description);
    fd.append("categoryId", form.categoryId);
    fd.append("inventory", form.inventory);
    fd.append("status", form.status);
    if (form.image) fd.append("image", form.image);
    return fd;
  };

  const handleAdd = async () => {
    if (!validate()) return;
    setSaving(true);
    try {
      await createAdminProduct(buildFormData());
      await fetchProducts();
      toast.success("Product added successfully");
      closeModal();
      setForm(EMPTY_FORM);
    } catch {
      toast.error("Product creation failed");
    } finally {
      setSaving(false);
    }
  };

  const handleUpdate = async () => {
    if (!editItem) return;
    if (!validate()) return;
    setSaving(true);
    try {
      await updateAdminProduct(editItem.id, buildFormData());
      await fetchProducts();
      toast.success("Product updated successfully");
      closeModal();
      setForm(EMPTY_FORM);
    } catch (error) {
      toast.error("Update failed");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    const previous = productList;
    setProductList((prev) => prev.filter((v) => v.id !== id));
    try {
      await deleteProductVideo(id);
      toast.success("Product deleted successfully");
      fetchProducts();
    } catch (error) {
      setProductList(previous); // revert
      toast.error("Failed to delete product");
    }
  };

  const columns = [
    {
      field: "image",
      headerName: "",
      width: 64,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Avatar
          variant="rounded"
          src={params.value ? fileUrl(params.value) : fallback}
          alt={params.row.name}
          sx={{ width: 40, height: 40 }}
        />
      ),
    },
    { field: "name", headerName: "Product", flex: 1.4, minWidth: 160 },
    { field: "author", headerName: "Author", flex: 1, minWidth: 120 },
    { field: "categoryName", headerName: "Category", flex: 1, minWidth: 120 },
    {
      field: "price",
      headerName: "Price",
      width: 100,
      renderCell: (p) => `$${p.value ?? 0}`,
    },
    { field: "inventory", headerName: "Stock", width: 90, type: "number" },
    {
      field: "status",
      headerName: "Status",
      width: 110,
      renderCell: (p) => (
        <Chip
          label={p.value === 1 ? "Active" : "Inactive"}
          color={p.value === 1 ? "success" : "default"}
          size="small"
          variant={p.value === 1 ? "filled" : "outlined"}
        />
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 110,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Stack direction="row" spacing={0.5}>
          <Tooltip title="Edit">
            <IconButton color="primary" onClick={() => openEdit(params.row)}>
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton color="error" onClick={() => handleDelete(params.row.id)}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Stack>
      ),
    },
  ];

  return (
    <Layout>
      <PageHeader
        title="Products"
        subtitle="Manage your product catalog"
        actions={
          <Button variant="contained" startIcon={<AddIcon />} onClick={openAdd}>
            Add Product
          </Button>
        }
      />
      <DataTable
        rows={rows}
        columns={columns}
        loading={loading}
        searchPlaceholder="Search products…"
      />

      {/* ADD / EDIT FORM */}
      <ResponsiveDialog open={isModalOpen} onClose={closeModal} fullWidth maxWidth="md">
        <DialogTitle sx={{ fontWeight: 700 }}>
          {editItem ? "Edit Product" : "Add Product"}
        </DialogTitle>
        <DialogContent dividers>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
              gap: 2,
              pt: 1,
            }}
          >
            <DatePicker
              label="Publish Date"
              format="MM/DD/YYYY"
              value={form.publishedDate ? dayjs(form.publishedDate) : null}
              onChange={(newValue) =>
                setForm({
                  ...form,
                  publishedDate: newValue && newValue.isValid() ? newValue.format("YYYY-MM-DD") : "",
                })
              }
              slotProps={{ textField: { fullWidth: true } }}
            />
            <TextField
              label="Product Name"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              error={Boolean(errors.name)}
              helperText={errors.name}
            />
            <TextField
              label="Price"
              type="number"
              required
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              error={Boolean(errors.price)}
              helperText={errors.price}
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
              {categories
                .filter((c) => c.status === 1)
                .map((c) => (
                  <MenuItem key={c.id} value={c.id}>
                    {c.name}
                  </MenuItem>
                ))}
            </TextField>
            <TextField
              label="Author"
              value={form.author}
              onChange={(e) => setForm({ ...form, author: e.target.value })}
            />
            <TextField
              label="Inventory"
              type="number"
              value={form.inventory}
              onChange={(e) => setForm({ ...form, inventory: e.target.value })}
            />
            <TextField
              label="Description"
              multiline
              rows={4}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              sx={{ gridColumn: { sm: "1 / -1" } }}
            />
            <Box sx={{ gridColumn: { sm: "1 / -1" }, display: "flex", alignItems: "center", gap: 2, flexWrap: "wrap" }}>
              <Button
                component="label"
                variant="outlined"
                startIcon={<UploadFileIcon />}
              >
                {editItem ? "Replace Image" : "Upload Image"}
                <input
                  hidden
                  type="file"
                  accept="image/*"
                  onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
                />
              </Button>
              {form.image && <span style={{ color: "#555" }}>{form.image.name}</span>}
              {errors.image && <span style={{ color: "#d32f2f" }}>{errors.image}</span>}
              <FormControlLabel
                sx={{ ml: "auto" }}
                control={
                  <Switch
                    checked={form.status === 1}
                    onChange={(e) => setForm({ ...form, status: e.target.checked ? 1 : 0 })}
                    color="success"
                  />
                }
                label={form.status === 1 ? "Active" : "Inactive"}
              />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button onClick={closeModal}>Cancel</Button>
          <Button
            variant="contained"
            onClick={editItem ? handleUpdate : handleAdd}
            disabled={saving}
          >
            {saving ? "Saving…" : editItem ? "Update" : "Save"}
          </Button>
        </DialogActions>
      </ResponsiveDialog>
    </Layout>
  );
}
