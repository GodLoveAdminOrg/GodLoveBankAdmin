import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, CircularProgress, Stack } from "@mui/material";
import Layout from "../../components/layout/Layout";
import PageHeader from "../../components/common/PageHeader";
import usePagination from "../../components/common/usePagination";
import CoreValuesCard from "../../components/shared/CoreValueCard";
import {
  getAdminToolsOfThinking,
  updateAdminToolOfThinkingAudio,
} from "../../Services/toolofthinkingApi";

// Only these cards open a detail table.
const tablePages = {
  36: "No. of Request",
  37: "Subject",
  39: "Goal Name",
  41: "Goal Name",
};

export default function ToolsOfThinking() {
  const navigate = useNavigate();
  const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(true);
  const { pageItems, Pager } = usePagination(tools, 9);

  useEffect(() => {
    fetchTools();
  }, []);

  const fetchTools = async () => {
    try {
      setLoading(true);
      const res = await getAdminToolsOfThinking();
      setTools(res.data.data || []);
    } catch (err) {
      console.error("Tools fetch failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCardClick = (id) => {
    if (tablePages[id]) {
      navigate(`/tools-of-thinking/${id}?title=${encodeURIComponent(tablePages[id])}`);
    }
  };

  return (
    <Layout>
      <PageHeader title="Tools of Thinking" subtitle="Manage tools and their audio" />

      {loading ? (
        <Stack alignItems="center" sx={{ py: 8 }}>
          <CircularProgress />
        </Stack>
      ) : (
        <>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "repeat(2,1fr)", xl: "repeat(3,1fr)" },
              gap: 3,
            }}
          >
            {pageItems.map((tool) => (
              <CoreValuesCard
                key={tool.id}
                coreValue={tool}
                title={`${tools.indexOf(tool) + 1}. ${tool.name}`}
                color="#6b6b6b"
                audioUrl={tool.audioUrl}
                onUpload={updateAdminToolOfThinkingAudio}
                onUpdated={fetchTools}
                onClick={tablePages[tool.id] ? () => handleCardClick(tool.id) : undefined}
              />
            ))}
          </Box>
          <Pager />
        </>
      )}
    </Layout>
  );
}
