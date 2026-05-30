import React from "react";
import DataTable from "../../components/common/DataTable";

const ToolCardTable = ({
  rows = [],
  thirdColumnTitle = "Dynamic Field",
  thirdColumnKey = "value",
  onRowClick,
  loading = false,
}) => {
  const columns = [
    { field: "username", headerName: "User Name", flex: 1, minWidth: 160 },
    { field: "date", headerName: "Date", flex: 1, minWidth: 140 },
    { field: thirdColumnKey, headerName: thirdColumnTitle, flex: 1, minWidth: 160 },
  ];

  return (
    <DataTable
      rows={rows}
      columns={columns}
      loading={loading}
      searchPlaceholder="Search…"
      onRowClick={onRowClick ? (params) => onRowClick(params.row) : undefined}
      height="calc(100vh - 280px)"
    />
  );
};

export default ToolCardTable;
