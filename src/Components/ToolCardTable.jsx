import React, { useState } from "react";

const ToolCardTable = ({ rows =[], thirdColumnTitle = "Dynamic Field", thirdColumnKey = "value", onRowClick }) => {
//   const [rows, setRows] = useState([
//     {
//       id: 1,
//       username: "Arbab Ahmed",
//       date: "2025-02-04",
//       value: "Dynamic Value 1",
//     },
//     {
//       id: 2,
//       username: "John Doe",
//       date: "2025-02-05",
//       value: "Dynamic Value 2",
//     },
//     {
//       id: 3,
//       username: "Bilal Khan",
//       date: "2025-02-06",
//       value: "Dynamic Value 3",
//     },
//   ]);

  return (
    <table className="table table-bordered align-middle">
      <thead className="table-light">
        <tr>
          <th className="fw-bold" style={{ width: "33%" }}>User Name</th>
          <th className="fw-bold" style={{ width: "33%" }}>Date</th>
          <th className="fw-bold" style={{ width: "33%" }}>{thirdColumnTitle}</th>
        </tr>
      </thead>

      <tbody>
        {rows.map((item) => (
          <tr 
          key={item.id}
          style={{cursor: "pointer"}}         // Pointer Cursor  
          onClick={() => onRowClick?.(item)}> 
            <td>
              <strong>{item.username}</strong>
            </td>

            <td>
              <span>{item.date}</span>
            </td>

            <td>
              <span>{item[thirdColumnKey]}</span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ToolCardTable;
