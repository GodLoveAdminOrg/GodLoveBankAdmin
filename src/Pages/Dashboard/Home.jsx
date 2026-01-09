  import { useEffect, useState } from "react";
  import Layout from "../../Components/Layout";
  import { getAdminUsers } from "../../Services/homeApi";
  const API_BASE_URL = "http://18.204.175.233:3001";


  const SelfLoveTable = () => {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedUser, setSelectedUser] = useState(null);
    const USERS_PER_PAGE = 5;
    const [currentPage, setCurrentPage] = useState(1);

    const fetchUsers = async () => {
      try {
        setLoading(true);
        const res = await getAdminUsers();
        const fetchedUsers = res.data.data.users || []; // ✅ declare variable
        setUsers(res.data.data.users || []);
        // 🔥 Debug logs
    console.log("Users fetched:", fetchedUsers);
    console.log("Total pages:", Math.ceil(fetchedUsers.length / USERS_PER_PAGE));
            setCurrentPage(1); // 👈 YAHAN lagana hai (page reset)
      } catch (err) {
        console.error("Users fetch failed", err);
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {
      fetchUsers();
    }, []);

    const totalPages = Math.ceil(users.length / USERS_PER_PAGE);

const paginatedUsers = users.slice(
  (currentPage - 1) * USERS_PER_PAGE,
  currentPage * USERS_PER_PAGE
);

    const totalUsers = users.length;
    const activeUsers = users.filter(u => u.status === 1).length;

    const nonActiveUsers = totalUsers - activeUsers;

    const getFullName = (user) =>
    `${user.firstName || ""} ${user.lastName || ""}`.trim() || "N/A";

  const getStatusLabel = (status) =>
    status === 1 ? "Active" : "Non-Active";

  const getUserImage = (image) => {
  if (!image) return "/src/assets/profile.png";

  // agar full URL already ho
  if (image.startsWith("http")) return image;

  // backend relative path ho
  return `${API_BASE_URL}/${image}`;
};
    // const pendingOrders = 40;



    // const [rows] = useState([
    //   {
    //     id: 1,
    //     name: "Lindsey Curtis",
    //     image: "/src/assets/avatar1.png",
    //     gender: "Female",
    //     email: "lindsey@gmail.com",
    //     status: "Active",
    //     country: "USA",
    //     city: "New York",
    //     postalCode: "10001",
    //     relationshipStatus: "Married",
    //     selfLoveBase: "Chosen-Ness",
    //   },
    //   {
    //     id: 2,
    //     name: "Michael Gough",
    //     image: "/src/assets/avatar2.png",
    //     gender: "Male",
    //     email: "michael@gmail.com",
    //     status: "Non-Active",
    //     country: "UK",
    //     city: "London",
    //     postalCode: "SW1A",
    //     relationshipStatus: "Un-Married",
    //     selfLoveBase: "Chosen-Ness",
    //   },
    //   {
    //     id: 3,
    //     name: "Gowrk Gough",
    //     image: "/src/assets/profile.png",
    //     gender: "Male",
    //     email: "gowrk@gmail.com",
    //     status: "Non-Active",
    //     country: "UK",
    //     city: "London",
    //     postalCode: "SW1A",
    //     relationshipStatus: "Un-Married",
    //     selfLoveBase: "Chosen-Ness",
    //   },
    //   {
    //     id: 3,
    //     name: "Shelly tim",
    //     image: "/src/assets/avatar3.png",
    //     gender: "Female",
    //     email: "shally@gmail.com",
    //     status: "Active",
    //     country: "UK",
    //     city: "London",
    //     postalCode: "SW1A",
    //     relationshipStatus: "Un-Married",
    //     selfLoveBase: "Chosen-Ness",
    //   },{
    //     id: 5,
    //     name: "Robert Smith",
    //     image: "/src/assets/profile.png",
    //     gender: "Male",
    //     email: "robert@gmail.com",
    //     status: "Active",
    //     country: "UK",
    //     city: "London",
    //     postalCode: "SW1A",
    //     relationshipStatus: "Un-Married",
    //     selfLoveBase: "Chosen-Ness",
    //   },
    // ]);

    


    // const [selectedUser, setSelectedUser] = useState(null);

    

    return (
      <Layout>
        <div className="container-fluid py-2 px-4" style={{ background: "#F7F8FA" }}>
          <h1 className="fs-3 pb-3">Users</h1>

          <div className="row gx-3">
            <div className="col-md-3">
              <div className="card shadow-sm mb-4">
                <div className="card-body text-center">
                  <h2 className="mb-2">{totalUsers}</h2>
                  <p className="mb-3 text-muted">Total Users</p>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card shadow-sm mb-4">
                <div className="card-body text-center">
                  <h2 className="mb-2">{activeUsers}</h2>
                  <p className="mb-3 text-muted">Active Users</p>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card shadow-sm mb-4">
                <div className="card-body text-center">
                  <h2 className="mb-2">{nonActiveUsers}</h2>
                  <p className="mb-3 text-muted">Non-Active Users</p>
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
            {paginatedUsers.map((user) => (
              <tr
                key={user.id || user.email}
                style={{ cursor: "pointer" }}
                onClick={() => setSelectedUser(user)}
              >
                <td>
                  <div className="d-flex align-items-center gap-3">
                    <img
                      src={ getUserImage(user.image)}
                      alt={getFullName(user)}
                      width="40"
                      height="40"
                      className="rounded-circle"
                    />
                    <strong>{`${user.firstName || ""} ${user.lastName || ""}`.trim()}</strong>
                  </div>
                </td>

                <td>{user.gender || "-"}</td>
                <td>{user.email}</td>

                <td className="text-center">
                  <span
            className={`badge ${
              user.status === 1 ? "bg-success" : "bg-secondary"
            }`}
          >
                    {getStatusLabel(user.status)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Pagination */}
        {totalPages > 1 && (
  <div className="d-flex justify-content-end mt-3">
    <nav>
      <ul className="pagination">

        {/* Prev */}
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <button
            className="page-link"
            onClick={() => setCurrentPage(prev => prev - 1)}
          >
            Prev
          </button>
        </li>

        {/* Page Numbers */}
        {[...Array(totalPages)].map((_, index) => (
          <li
            key={index}
            className={`page-item ${
              currentPage === index + 1 ? "active" : ""
            }`}
          >
            <button
              className="page-link"
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          </li>
        ))}

        {/* Next */}
        <li
          className={`page-item ${
            currentPage === totalPages ? "disabled" : ""
          }`}
        >
          <button
            className="page-link"
            onClick={() => setCurrentPage(prev => prev + 1)}
          >
            Next
          </button>
        </li>

      </ul>
    </nav>
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
                    ></button>
                  </div>

                  <div className="modal-body">
                    <div className="text-center mb-3">
                      <img
                        src={getUserImage(selectedUser.image) || "/src/assets/profile.png"}
                        
                        width="80"
                        height="80"
                        className="rounded-circle mb-2"
                      />
                      <h5>{getFullName(selectedUser)}</h5>
                      <p className="text-muted">{selectedUser.email}</p>
                    </div>

                    <hr />

                    <div className="row">
                      <div className="col-md-6 mb-2">
                        <strong>Gender:</strong> {selectedUser.gender}
                      </div>

                      <div className="col-md-6 mb-2">
                        <strong>Status:</strong>{" "}
                        <span
                            className={`badge ${
                              selectedUser.status === 1 ? "bg-success" : "bg-secondary"
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
                        <strong>Postal Code:</strong>{" "}
                        {selectedUser.postalCode || "-"}
                      </div>

                      <div className="col-md-6 mb-2">
                        <strong>Relationship:</strong>{" "}
                        {selectedUser.relationshipStatus || "-"}
                      </div>

                      <div className="col-12 mt-2">
                        <strong>New Self Love Home Base:</strong>
                        {selectedUser.selfLoveBase || "-"}{" "}
                        <span className="badge bg-primary">
                          {selectedUser.newSelfStory}
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

