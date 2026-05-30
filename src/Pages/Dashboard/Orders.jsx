import { useEffect, useMemo, useState } from "react";
import { Box } from "@mui/material";
import PaidIcon from "@mui/icons-material/Paid";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PendingActionsIcon from "@mui/icons-material/PendingActions";

import Layout from "../../components/layout/Layout";
import StatCard from "../../components/common/StatCard";
import PageHeader from "../../components/common/PageHeader";
import OrdersTable from "./OrderTable";
import { fileUrl } from "../../config";
import fallback from "../../assets/fallback.png";
import { getAdminOrders } from "../../Services/orderApi";

const formatOrder = (order) => ({
  id: order.id,
  orderNumber: order.orderNumber,
  orderDate: new Date(order.createdAt).toLocaleDateString(),
  customerName: `${order.user?.firstName || ""} ${order.user?.lastName || ""}`.trim(),
  city: order.address?.city || "N/A",
  status: order.status,
  deliveryAddress: order.address?.address || "-",
  phone: `${order.address?.countryCode || ""} ${order.address?.phoneNumber || ""}`.trim(),
  products: (order.orderItems || []).map((item) => ({
    name: item.product?.name,
    image: item.product?.image ? fileUrl(item.product.image) : fallback,
    by: item.product?.author,
    quantity: item.qty,
    price: Number(item.price),
    stock: item.product?.inventory,
  })),
  deliveryFee: Number(order.deliveryCharges || 0),
  subTotal: Number(order.subTotal || 0),
});

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await getAdminOrders(1, 1000);
      const data = Array.isArray(res.data?.data) ? res.data.data : [];
      setOrders(data.map(formatOrder));
    } catch (error) {
      console.error("Orders fetch failed", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const stats = useMemo(() => {
    let totalSales = 0,
      completed = 0,
      pending = 0;
    orders.forEach((o) => {
      totalSales += o.subTotal;
      if (o.status === "COMPLETED") completed++;
      if (o.status === "PENDING" || o.status === "PROCESSING") pending++;
    });
    return { totalSales, total: orders.length, completed, pending };
  }, [orders]);

  return (
    <Layout>
      <PageHeader title="Ecommerce" subtitle="Sales overview and order management" />
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "repeat(2,1fr)", lg: "repeat(4,1fr)" },
          gap: 3,
          mb: 3,
        }}
      >
        <StatCard label="Total Sales" value={`$${stats.totalSales.toFixed(2)}`} icon={<PaidIcon />} color="success.main" />
        <StatCard label="Total Orders" value={stats.total} icon={<ReceiptLongIcon />} color="primary.main" />
        <StatCard label="Completed Orders" value={stats.completed} icon={<CheckCircleIcon />} color="#2e7d32" />
        <StatCard label="Pending Orders" value={stats.pending} icon={<PendingActionsIcon />} color="#ed6c02" />
      </Box>

      <OrdersTable orders={orders} loading={loading} onRefresh={fetchOrders} />
    </Layout>
  );
}
