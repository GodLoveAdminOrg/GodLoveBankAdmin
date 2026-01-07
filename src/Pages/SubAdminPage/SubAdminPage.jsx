import React, { useState } from "react";
import SubAdminTable from "./SubAdminTable";
import SubAdminModal from "./SubAdminModal";
import Layout from "../../Components/Layout";

const initialData = [
  {
    id: 1,
    name: "John Doe",
    role: "Sub-Admin",
    region: "UK",
    city: "London",
    email: "john@example.com",
    password: "password123",
  },
  {
    id: 2,
    name: "Sarah Khan",
    role: "Console",
    region: "Malta",
    city: "Sliema",
    email: "sarah@example.com",
    password: "password123",
  },
];

const SubAdminPage = () => {
  const [data, setData] = useState(initialData);
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState(null);

  const handleSave = (form) => {
    if (form.id) {
      // Edit
      setData(data.map((item) => (item.id === form.id ? form : item)));
    } else {
      // Create
      setData([...data, { ...form, id: Date.now() }]);
    }
    setShowModal(false);
  };

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  return (
    <Layout>
      <div className="mt-4 p-4" style={{backgroundColor: "rgb(247, 248, 250)"}}>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4>Role Management Tab</h4>
          <button
            className="btn btn-danger"
            onClick={() => {
              setEditData(null);
              setShowModal(true);
            }}
          >
            + Create New Role
          </button>
        </div>

        <SubAdminTable
          data={data}
          onEdit={(row) => {
            setEditData(row);
            setShowModal(true);
          }}
          onDelete={handleDelete}
        />

        <SubAdminModal
          show={showModal}
          onClose={() => setShowModal(false)}
          editData={editData}
          onSave={handleSave}
        />
      </div>
    </Layout>
  );
};

export default SubAdminPage;
