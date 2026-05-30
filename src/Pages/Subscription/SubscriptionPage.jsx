import { useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  Chip,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import ResponsiveDialog from "../../components/common/ResponsiveDialog";
import Layout from "../../components/layout/Layout";
import DataTable from "../../components/common/DataTable";
import PageHeader from "../../components/common/PageHeader";
import { getAdminSubscriptions } from "../../Services/subscriptionApi";

export default function SubscriptionPage() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(null);

  const fetchSubscriptions = async () => {
    setLoading(true);
    try {
      const res = await getAdminSubscriptions(1, 1000);
      setSubscriptions(res.data?.data?.subscriptions || []);
    } catch (err) {
      console.error("Error fetching subscriptions", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const rows = useMemo(
    () =>
      subscriptions.map((s) => ({
        ...s,
        name: `${s.user?.firstName || ""} ${s.user?.lastName || ""}`.trim(),
        email: s.user?.email,
        plan: s.subscriptionPlan?.name,
        price: s.subscriptionPlan?.price,
        trialDays: s.subscriptionPlan?.freeTrialDays,
      })),
    [subscriptions]
  );

  const columns = [
    { field: "name", headerName: "Name", flex: 1.2, minWidth: 160 },
    { field: "email", headerName: "Email", flex: 1.4, minWidth: 200 },
    { field: "plan", headerName: "Plan", flex: 1, minWidth: 120 },
    { field: "price", headerName: "Price", width: 100, renderCell: (p) => `$${p.value ?? 0}` },
    { field: "trialDays", headerName: "Trial Days", width: 110 },
    {
      field: "status",
      headerName: "Status",
      width: 120,
      renderCell: (p) => (
        <Chip
          label={p.value === 1 ? "Active" : "Inactive"}
          size="small"
          color={p.value === 1 ? "success" : "default"}
          variant={p.value === 1 ? "filled" : "outlined"}
        />
      ),
    },
  ];

  const detail = (label, value) => (
    <Box sx={{ mb: 1.5 }}>
      <Typography variant="caption" color="text.secondary">{label}</Typography>
      <Typography variant="body2" sx={{ fontWeight: 600 }}>{value ?? "-"}</Typography>
    </Box>
  );

  return (
    <Layout>
      <PageHeader title="Subscriptions" subtitle="Active and past user subscriptions" />
      <DataTable
        rows={rows}
        columns={columns}
        loading={loading}
        searchPlaceholder="Search subscriptions…"
        onRowClick={(params) => setSelected(params.row)}
      />

      <ResponsiveDialog open={Boolean(selected)} onClose={() => setSelected(null)} fullWidth maxWidth="sm">
        {selected && (
          <>
            <DialogTitle sx={{ fontWeight: 700 }}>Subscription Details</DialogTitle>
            <DialogContent dividers>
              <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 1 }}>
                {detail("Name", selected.name)}
                {detail("Email", selected.email)}
                {detail("Plan", selected.plan)}
                {detail("Price", `$${selected.price ?? 0}`)}
                {detail("Free Trial", `${selected.trialDays ?? 0} days`)}
                {detail("Status", selected.status === 1 ? "Active" : "Inactive")}
                {detail("Start Date", selected.startDate)}
                {detail("End Date", selected.endDate)}
              </Box>
            </DialogContent>
            <DialogActions sx={{ px: 3, py: 2 }}>
              <Button onClick={() => setSelected(null)}>Close</Button>
            </DialogActions>
          </>
        )}
      </ResponsiveDialog>
    </Layout>
  );
}
