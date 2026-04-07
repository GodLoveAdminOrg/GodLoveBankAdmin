import { useEffect, useState } from "react";
import Layout from "../../Components/Layout";
import { Pagination } from "@mantine/core";
import { getAdminUsers, deleteUser } from "../../Services/homeApi";

const API_BASE_URL = "http://18.204.175.233:3001";

const SelfLoveTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const USERS_PER_PAGE = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchUsers = async (page = 1) => {
    try {
      setLoading(true);
      const res = await getAdminUsers(page, USERS_PER_PAGE);

      const fetchedUsers = res?.data?.data?.users || [];
      setUsers(fetchedUsers);
      setTotalPages(res?.data?.data?.totalPages || 1);
      setCurrentPage(res?.data?.data?.page || 1);

      console.log("Users fetched:", fetchedUsers);
    } catch (err) {
      console.error("Users fetch failed", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage]);

  const totalUsers = users.length;
  const activeUsers = users.filter((u) => u.status === 1).length;
  const nonActiveUsers = totalUsers - activeUsers;

  const getFullName = (user) =>
    `${user.firstName || ""} ${user.lastName || ""}`.trim() || "N/A";

  const getStatusLabel = (status) =>
    status === 1 ? "Active" : "Non-Active";

  const getUserImage = (image) => {
    if (!image) return "/src/assets/profile.png";
    if (image.startsWith("http")) return image;
    return `${API_BASE_URL}/${image}`;
  };

  const handleDelete = async (user) => {
    try {
      const userId = user._id || user.id;

      if (!userId) {
        alert("User ID not found");
        return;
      }

      const confirmDelete = window.confirm(
        `Delete ${getFullName(user)}?`
      );
      if (!confirmDelete) return;

      await deleteUser(userId);

      setUsers((prev) => prev.filter((u) => (u._id || u.id) !== userId));

    } catch (error) {
      console.error("Delete failed", error);
      alert("Delete API failed (check URL or ID)");
    }
  };

  return (
    <Layout>
      <div
        className="container-fluid py-2 px-4"
        style={{ background: "#F7F8FA" }}
      >
        <h1 className="fs-3 pb-3">Users</h1>

        <div className="row gx-3">
          <div className="col-md-3">
            <div className="card shadow-sm mb-4">
              <div className="card-body text-center">
                <h2>{totalUsers}</h2>
                <p className="text-muted">Total Users</p>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card shadow-sm mb-4">
              <div className="card-body text-center">
                <h2>{activeUsers}</h2>
                <p className="text-muted">Active Users</p>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card shadow-sm mb-4">
              <div className="card-body text-center">
                <h2>{nonActiveUsers}</h2>
                <p className="text-muted">Non-Active Users</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <table className="table table-bordered align-middle mt-3">
        <thead className="table-light">
          <tr>
            <th>User</th>
            <th>Gender</th>
            <th>Email</th>
            <th className="text-center">Status</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr
              key={user.id || user.email}
              style={{ cursor: "pointer" }}
              onClick={() => setSelectedUser(user)}
            >
              <td>
                <div className="d-flex align-items-center gap-3">
                  <img
                    src={getUserImage(user.image)}
                    alt={getFullName(user)}
                    width="40"
                    height="40"
                    className="rounded-circle"
                  />
                  <strong>{getFullName(user)}</strong>
                </div>
              </td>

              <td>{user.gender || "-"}</td>
              <td>{user.email}</td>

              {/* ✅ STATUS + TRASH ICON */}
              <td className="text-center">
                <div className="d-flex justify-content-center align-items-center gap-4">
                  <span
                    className={`badge ${user.status === 1 ? "bg-success" : "bg-secondary"
                      }`}
                  >
                    {getStatusLabel(user.status)}
                  </span>

                  <i
                    className="bi bi-trash text-danger"
                    style={{
                      cursor: "pointer",
                      fontSize: "18px",
                      transition: "0.2s",
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(user);
                    }}
                    onMouseOver={(e) =>
                      (e.currentTarget.style.transform = "scale(1.2)")
                    }
                    onMouseOut={(e) =>
                      (e.currentTarget.style.transform = "scale(1)")
                    }
                  ></i>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Mantine Pagination */}
      {totalPages > 1 && (
        <div className="d-flex justify-content-end mt-3">
          <Pagination
            total={totalPages}
            value={currentPage}
            onChange={setCurrentPage}
            size="md"
            radius="md"
            withEdges
            color="brand"
          />
        </div>
      )}

      {/* MODAL */}
      {selectedUser && (
        <>
          <div className="modal fade show d-block" tabIndex="-1" role="dialog">
            <div className="modal-dialog modal-dialog-centered modal-lg">
              <div className="modal-content">

                <div className="modal-header">
                  <h5 className="modal-title">User Details</h5>
                  <button
                    className="btn-close"
                    onClick={() => setSelectedUser(null)}
                  />
                </div>

                <div className="modal-body">
                  <div className="text-center mb-3">
                    <img
                      src={getUserImage(selectedUser.image) || "/src/assets/profile.png"}
                      width="80"
                      height="80"
                      className="rounded-circle mb-2"
                      alt="user"
                    />
                    <h5>{getFullName(selectedUser)}</h5>
                    <p className="text-muted">{selectedUser.email}</p>
                  </div>

                  <hr />

                  <div className="row">
                    <div className="col-md-6 mb-2">
                      <strong>Gender:</strong> {selectedUser.gender || "-"}
                    </div>

                    <div className="col-md-6 mb-2">
                      <strong>Status:</strong>{" "}
                      <span
                        className={`badge ${selectedUser.status === 1 ? "bg-success" : "bg-secondary"
                          }`}
                      >
                        {getStatusLabel(selectedUser.status)}
                      </span>
                    </div>

                    <div className="col-md-6 mb-2">
                      <strong>Country:</strong> {selectedUser.country || "-"}
                    </div>

                    <div className="col-md-6 mb-2">
                      <strong>City:</strong> {selectedUser.city || "-"}
                    </div>

                    <div className="col-md-6 mb-2">
                      <strong>Postal Code:</strong> {selectedUser.postalCode || "-"}
                    </div>

                    <div className="col-md-6 mb-2">
                      <strong>Relationship:</strong>{" "}
                      {selectedUser.relationshipStatus || "-"}
                    </div>

                    <div className="col-12 mt-2">
                      <strong>New Self Love Home Base:</strong>{" "}
                      {selectedUser.selfLoveBase || "-"}{" "}
                      <span className="badge bg-primary ms-2">
                        {selectedUser.newSelfStory || "-"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="modal-footer">
                  <button
                    className="btn btn-secondary"
                    onClick={() => setSelectedUser(null)}
                  >
                    Close
                  </button>
                </div>

              </div>
            </div>
          </div>

          <div className="modal-backdrop fade show"></div>
        </>
      )}
    </Layout>
  );
};

export default SelfLoveTable;