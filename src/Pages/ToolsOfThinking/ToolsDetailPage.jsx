import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { Typography } from "@mui/material";
import Layout from "../../components/layout/Layout";
import ToolCardTable from "./ToolCardTable";
import { getAdminToolOfThinkingById } from "../../Services/toolofthinkingApi";

export default function ToolsDetailPage() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const thirdColumnTitle = searchParams.get("title");

  const [tableRows, setTableRows] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) fetchTableData();
  }, [id]);

  const fetchTableData = async () => {
    try {
      setLoading(true);
      const res = await getAdminToolOfThinkingById(id);
      const tool = res.data.data;
      setTableRows([
        {
          id: tool.id,
          username: "Admin",
          date: tool.createdAt?.split("T")[0],
          value: tool.name,
          formType: tool.formType,
          isLogable: tool.isLogable,
        },
      ]);
    } catch (err) {
      console.error("Table data fetch failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
        Tool #{id}{thirdColumnTitle ? ` — ${thirdColumnTitle}` : ""}
      </Typography>

      <ToolCardTable
        rows={tableRows}
        loading={loading}
        thirdColumnTitle={thirdColumnTitle || "Value"}
        thirdColumnKey="value"
        onRowClick={(row) => console.log("Row clicked:", row)}
      />
    </Layout>
  );
}
