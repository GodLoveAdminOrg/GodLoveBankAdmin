import React, { useMemo, useState } from "react";
import {
  Box,
  InputAdornment,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { DataGrid } from "@mui/x-data-grid";

/**
 * Reusable Material data table.
 * - Built-in client-side SEARCH (across all string/number cells)
 * - Built-in PAGINATION + column SORTING (DataGrid)
 *
 * Props:
 *   title           page/section title
 *   rows            array of row objects
 *   columns         DataGrid column defs
 *   loading         boolean
 *   actions         node rendered on the right of the header (e.g. Add button)
 *   searchPlaceholder
 *   getRowId        optional row id resolver (defaults to row.id)
 *   pageSize        default page size (10)
 *   height          grid height (default responsive)
 */
export default function DataTable({
  title,
  rows = [],
  columns = [],
  loading = false,
  actions = null,
  searchPlaceholder = "Search…",
  getRowId,
  onRowClick,
  pageSize = 10,
  height = { xs: "calc(100vh - 330px)", sm: "calc(100vh - 290px)", md: "calc(100vh - 250px)" },
}) {
  const [search, setSearch] = useState("");

  const filteredRows = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return rows;
    const fields = columns.map((c) => c.field).filter(Boolean);
    return rows.filter((row) =>
      fields.some((f) => {
        const v = row[f];
        return v != null && String(v).toLowerCase().includes(q);
      })
    );
  }, [rows, columns, search]);

  return (
    <Paper elevation={0} sx={{ p: { xs: 2, md: 3 }, border: "1px solid", borderColor: "divider", borderRadius: 4 }}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        alignItems={{ xs: "stretch", sm: "center" }}
        justifyContent="space-between"
        spacing={2}
        sx={{ mb: 2.5 }}
      >
        {title && (
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            {title}
          </Typography>
        )}
        <Stack direction="row" spacing={1.5} alignItems="center" sx={{ ml: "auto" }}>
          <TextField
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={searchPlaceholder}
            sx={{ minWidth: { xs: "100%", sm: 300 } }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
          />
          {actions}
        </Stack>
      </Stack>

      <Box sx={{ height, minHeight: 360, width: "100%" }}>
        <DataGrid
          rows={filteredRows}
          columns={columns}
          loading={loading}
          getRowId={getRowId}
          onRowClick={onRowClick}
          density="standard"
          rowHeight={62}
          columnHeaderHeight={54}
          disableRowSelectionOnClick
          pagination
          pageSizeOptions={[5, 10, 25, 50]}
          initialState={{
            pagination: { paginationModel: { pageSize, page: 0 } },
          }}
          sx={{
            border: "none",
            "--DataGrid-rowBorderColor": "#f0f1f4",
            "& .MuiDataGrid-columnHeaders": { fontWeight: 700 },
            "& .MuiDataGrid-columnHeader": { bgcolor: "#fafbfc" },
            "& .MuiDataGrid-columnHeaderTitle": { fontWeight: 700, color: "text.secondary" },
            "& .MuiDataGrid-cell": { fontSize: "0.9rem" },
            "& .MuiDataGrid-cell:focus, & .MuiDataGrid-cell:focus-within": { outline: "none" },
            "& .MuiDataGrid-row:hover": { bgcolor: "rgba(99,29,21,0.035)" },
            "& .MuiDataGrid-footerContainer": { borderTop: "1px solid #f0f1f4" },
            ...(onRowClick && { "& .MuiDataGrid-row": { cursor: "pointer" } }),
          }}
        />
      </Box>
    </Paper>
  );
}
