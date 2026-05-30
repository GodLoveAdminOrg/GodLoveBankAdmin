import { useEffect, useMemo, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Chip,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import ResponsiveDialog from "../../components/common/ResponsiveDialog";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import PeopleIcon from "@mui/icons-material/People";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import { toast } from "react-toastify";

import Layout from "../../components/layout/Layout";
import DataTable from "../../components/common/DataTable";
import StatCard from "../../components/common/StatCard";
import PageHeader from "../../components/common/PageHeader";
import { fileUrl } from "../../config";
import fallback from "../../assets/profile.png";
import { getAdminUsers, deleteUser } from "../../Services/homeApi";

const getFullName = (u) =>
  `${u?.firstName || ""} ${u?.lastName || ""}`.trim() || "N/A";

const userImage = (image) => {
  if (!image) return fallback;
  if (String(image).startsWith("http")) return image;
  return fileUrl(image);
};

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await getAdminUsers(1, 1000);
      setUsers(res?.data?.data?.users || []);
    } catch (err) {
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const stats = useMemo(() => {
    const total = users.length;
    const active = users.filter((u) => u.status === 1).length;
    return { total, active, inactive: total - active };
  }, [users]);

  // enrich rows for search/sort
  const rows = useMemo(
    () =>
      users.map((u) => ({
        ...u,
        fullName: getFullName(u),
        statusLabel: u.status === 1 ? "Active" : "Non-Active",
      })),
    [users]
  );

  const handleDelete = async (user) => {
    const userId = user._id || user.id;
    if (!userId) return toast.error("User ID not found");
    if (!window.confirm(`Delete ${getFullName(user)}?`)) return;
    const previous = users;
    setUsers((prev) => prev.filter((u) => (u._id || u.id) !== userId));
    try {
      await deleteUser(userId);
      toast.success("User deleted");
    } catch {
      setUsers(previous);
      toast.error("Delete failed");
    }
  };

  const columns = [
    {
      field: "fullName",
      headerName: "User",
      flex: 1.4,
      minWidth: 200,
      renderCell: (p) => (
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Avatar src={userImage(p.row.image)} sx={{ width: 34, height: 34 }} />
          <Typography variant="body2" sx={{ fontWeight: 600 }}>
            {p.value}
          </Typography>
        </Stack>
      ),
    },
    { field: "gender", headerName: "Gender", width: 110, valueGetter: (v) => v || "-" },
    { field: "email", headerName: "Email", flex: 1.4, minWidth: 200 },
    {
      field: "statusLabel",
      headerName: "Status",
      width: 130,
      renderCell: (p) => (
        <Chip
          label={p.value}
          size="small"
          color={p.row.status === 1 ? "success" : "default"}
          variant={p.row.status === 1 ? "filled" : "outlined"}
        />
      ),
    },
    {
      field: "actions",
      headerName: "",
      width: 70,
      sortable: false,
      filterable: false,
      renderCell: (p) => (
        <Tooltip title="Delete">
          <IconButton
            color="error"
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(p.row);
            }}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      ),
    },
  ];

  const detail = (label, value) => (
    <Box sx={{ mb: 1 }}>
      <Typography variant="caption" color="text.secondary">
        {label}
      </Typography>
      <Typography variant="body2" sx={{ fontWeight: 600 }}>
        {value || "-"}
      </Typography>
    </Box>
  );

  return (
    <Layout>
      <PageHeader title="Users" subtitle="All registered app users" />
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "repeat(3, 1fr)" },
          gap: 3,
          mb: 3,
        }}
      >
        <StatCard label="Total Users" value={stats.total} icon={<PeopleIcon />} color="primary.main" />
        <StatCard label="Active Users" value={stats.active} icon={<HowToRegIcon />} color="success.main" />
        <StatCard label="Non-Active Users" value={stats.inactive} icon={<PersonOffIcon />} color="#9e9e9e" />
      </Box>

      <DataTable
        rows={rows}
        columns={columns}
        loading={loading}
        searchPlaceholder="Search users…"
        onRowClick={(params) => setSelectedUser(params.row)}
      />

      {/* USER DETAILS */}
      <ResponsiveDialog open={Boolean(selectedUser)} onClose={() => setSelectedUser(null)} fullWidth maxWidth="sm">
        {selectedUser && (
          <>
            <DialogTitle sx={{ fontWeight: 700 }}>User Details</DialogTitle>
            <DialogContent dividers>
              <Stack alignItems="center" spacing={1} sx={{ mb: 2 }}>
                <Avatar src={userImage(selectedUser.image)} sx={{ width: 80, height: 80 }} />
                <Typography variant="h6">{getFullName(selectedUser)}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {selectedUser.email}
                </Typography>
                <Chip
                  label={selectedUser.status === 1 ? "Active" : "Non-Active"}
                  color={selectedUser.status === 1 ? "success" : "default"}
                  size="small"
                />
              </Stack>
              <Divider sx={{ mb: 2 }} />
              <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 1 }}>
                {detail("Gender", selectedUser.gender)}
                {detail("Country", selectedUser.country)}
                {detail("City", selectedUser.city)}
                {detail("Postal Code", selectedUser.postalCode)}
                {detail("Relationship", selectedUser.relationshipStatus)}
                {detail("Self Love Base", selectedUser.selfLoveBase)}
              </Box>
            </DialogContent>
            <DialogActions sx={{ px: 3, py: 2 }}>
              <Button onClick={() => setSelectedUser(null)}>Close</Button>
            </DialogActions>
          </>
        )}
      </ResponsiveDialog>
    </Layout>
  );
}
