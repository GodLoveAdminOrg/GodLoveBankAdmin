import { useEffect, useState } from "react";
import { Box, CircularProgress, Stack } from "@mui/material";
import Layout from "../../components/layout/Layout";
import PageHeader from "../../components/common/PageHeader";
import usePagination from "../../components/common/usePagination";
import CoreValuesCard from "../../components/shared/CoreValueCard";
import { getAdminCoreValues, updateAdminCoreValue } from "../../Services/coreValuesApi";

export default function CoreValues() {
  const [coreValues, setCoreValues] = useState([]);
  const [loading, setLoading] = useState(true);
  const { pageItems, Pager } = usePagination(coreValues, 9);

  useEffect(() => {
    fetchCoreValues();
  }, []);

  const fetchCoreValues = async () => {
    try {
      setLoading(true);
      const res = await getAdminCoreValues();
      setCoreValues(res.data.data || []);
    } catch (error) {
      console.error("Core values fetch failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <PageHeader title="Core Values" subtitle="Upload and manage core value audio" />

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
            {pageItems.map((value) => (
              <CoreValuesCard
                key={value.id}
                coreValue={value}
                title={`${coreValues.indexOf(value) + 1}. ${value.name}`}
                color={value.colorCode || "#631D15"}
                audioUrl={value.audioUrl}
                onUpload={updateAdminCoreValue}
                onUpdated={fetchCoreValues}
              />
            ))}
          </Box>
          <Pager />
        </>
      )}
    </Layout>
  );
}
