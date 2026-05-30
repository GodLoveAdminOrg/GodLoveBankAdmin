import { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Chip,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import ResponsiveDialog from "../../components/common/ResponsiveDialog";
import { toast } from "react-toastify";
import DataTable from "../../components/common/DataTable";
import { updateOrderStatusApi } from "../../Services/orderApi";

const STATUS_COLOR = {
  COMPLETED: "success",
  PROCESSING: "info",
  PENDING: "warning",
};
const formatStatus = (s) =>
  ({ PENDING: "Pending", PROCESSING: "Processing", COMPLETED: "Completed" }[s] || s);

export default function OrdersTable({ orders = [], loading = false, onRefresh }) {
  const [selected, setSelected] = useState(null);
  const [updating, setUpdating] = useState(false);

  const updateStatus = async (orderId) => {
    setUpdating(true);
    try {
      await updateOrderStatusApi(orderId, "COMPLETED");
      toast.success("Order marked as completed");
      setSelected(null);
      onRefresh?.();
    } catch (error) {
      toast.error("Status update failed");
    } finally {
      setUpdating(false);
    }
  };

  const columns = [
    { field: "orderNumber", headerName: "Order #", flex: 1, minWidth: 130 },
    { field: "orderDate", headerName: "Date", width: 120 },
    { field: "customerName", headerName: "Customer", flex: 1.2, minWidth: 150 },
    { field: "city", headerName: "City", flex: 1, minWidth: 110 },
    {
      field: "subTotal",
      headerName: "Amount",
      width: 110,
      renderCell: (p) => `$${p.value}`,
    },
    {
      field: "status",
      headerName: "Status",
      width: 130,
      renderCell: (p) => (
        <Chip label={formatStatus(p.value)} size="small" color={STATUS_COLOR[p.value] || "default"} />
      ),
    },
  ];

  const itemsTotal = selected
    ? selected.products.reduce((s, p) => s + p.price * p.quantity, 0)
    : 0;

  return (
    <>
      <DataTable
        rows={orders}
        columns={columns}
        loading={loading}
        searchPlaceholder="Search by order #, customer, city…"
        onRowClick={(params) => setSelected(params.row)}
      />

      <ResponsiveDialog open={Boolean(selected)} onClose={() => setSelected(null)} fullWidth maxWidth="md">
        {selected && (
          <>
            <DialogTitle sx={{ fontWeight: 700 }}>
              <Stack direction="row" alignItems="center" spacing={2} flexWrap="wrap">
                <span>Order {selected.orderNumber}</span>
                <Chip label={formatStatus(selected.status)} size="small" color={STATUS_COLOR[selected.status] || "default"} />
                {selected.status === "PROCESSING" && (
                  <Button
                    size="small"
                    variant="contained"
                    color="success"
                    disabled={updating}
                    onClick={() => updateStatus(selected.id)}
                  >
                    {updating ? "Updating…" : "Mark as Completed"}
                  </Button>
                )}
              </Stack>
            </DialogTitle>
            <DialogContent dividers>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
                Customer Details
              </Typography>
              <Paper variant="outlined" sx={{ p: 2, mb: 3, bgcolor: "#faf7f7" }}>
                <Typography variant="body2"><b>Name:</b> {selected.customerName}</Typography>
                <Typography variant="body2"><b>Phone:</b> {selected.phone}</Typography>
                <Typography variant="body2"><b>Address:</b> {selected.deliveryAddress}</Typography>
                <Typography variant="body2"><b>City:</b> {selected.city}</Typography>
              </Paper>

              <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
                Products
              </Typography>
              <Stack spacing={1.5} sx={{ mb: 3 }}>
                {selected.products.map((product, idx) => (
                  <Paper key={idx} variant="outlined" sx={{ p: 1.5, display: "flex", gap: 2, alignItems: "center" }}>
                    <Avatar variant="rounded" src={product.image} sx={{ width: 64, height: 64 }} />
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="body2" sx={{ fontWeight: 700 }}>{product.name}</Typography>
                      <Typography variant="caption" color="text.secondary">By {product.by}</Typography>
                      <Typography variant="body2">Qty: {product.quantity} · In stock: {product.stock}</Typography>
                    </Box>
                    <Typography variant="body2" sx={{ fontWeight: 700 }}>${product.price.toFixed(2)}</Typography>
                  </Paper>
                ))}
              </Stack>

              <Divider sx={{ mb: 2 }} />
              <Stack spacing={0.5} sx={{ maxWidth: 280, ml: "auto" }}>
                <Stack direction="row" justifyContent="space-between">
                  <span>Items Total</span><b>${itemsTotal.toFixed(2)}</b>
                </Stack>
                <Stack direction="row" justifyContent="space-between">
                  <span>Delivery Fee</span><b>${selected.deliveryFee}</b>
                </Stack>
                <Stack direction="row" justifyContent="space-between">
                  <Typography sx={{ fontWeight: 700 }}>Total Payment</Typography>
                  <Typography sx={{ fontWeight: 700 }}>${selected.subTotal}</Typography>
                </Stack>
              </Stack>
            </DialogContent>
            <DialogActions sx={{ px: 3, py: 2 }}>
              <Button onClick={() => setSelected(null)}>Close</Button>
            </DialogActions>
          </>
        )}
      </ResponsiveDialog>
    </>
  );
}
