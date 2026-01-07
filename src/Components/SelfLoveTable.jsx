import React from "react";
import { useState } from "react";

const SelfLoveTable = () => {

    const [rows, setRows] = useState([
    {
      id: 1,
      old: "Rejection",
      oldDesc: "Description for Rejection",
      new: "Choseness",
      newDesc: "Description for Choseness",
    },
    {
      id: 2,
      old: "Abandonment",
      oldDesc: "Description for Abandonment",
      new: "Atonement",
      newDesc: "Description for Atonement",
    },
    {
      id: 3,
      old: "Abuse",
      oldDesc: "Description for Abuse",
      new: "Purpose",
      newDesc: "Description for Purpose",
    },
    {
      id: 4,
      old: "Worthlessness",
      oldDesc: "Description for Worthlessness",
      new: "Greatness",
      newDesc: "Description for Greatness",
    },
  ]);

  // DELETE FUNCTION
  const handleDelete = (id) => {
    const updatedList = rows.filter((item) => item.id !== id);
    setRows(updatedList);
  };

  return (
    <table className="table table-bordered align-middle">
      <thead className="table-light">
        <tr>
          <th className=" fw-bold" style={{width: "40%"}}>Old Self-Love</th>
          <th className=" fw-bold" style={{width: "40%"}}>New Self-Love</th>
          <th className="text-center  fw-bold" style={{width: "15%"}}>Actions</th>
        </tr>
      </thead>

      <tbody>
        {rows.map((item, index) => (
          <tr key={index}>
            {/* Old Self Love */}
            <td>
              <strong>{item.old}</strong>
              <div className="text-muted" style={{ fontSize: "13px" }}>
                {item.oldDesc}
              </div>
            </td>

            {/* New Self Love */}
            <td>
              <strong>{item.new}</strong>
              <div className="text-muted" style={{ fontSize: "13px" }}>
                {item.newDesc}
              </div>
            </td>

            {/* Actions */}
            <td className="text-center">
              <button className="btn btn-sm btn-outline-primary me-2">
                Edit
              </button>
              <button className="btn btn-sm btn-outline-danger"
              onClick={() => handleDelete(item.id)}
              >Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SelfLoveTable;
