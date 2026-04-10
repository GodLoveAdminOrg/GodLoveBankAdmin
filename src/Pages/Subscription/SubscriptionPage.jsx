import { useState, useEffect } from "react";
import Layout from "../../Components/Layout";
import { getAdminSubscriptions } from "../../Services/subscriptionApi";


const SubscriptionTable = () => {
    const [selectedUser, setSelectedUser] = useState(null);
    const [subscriptions, setSubscriptions] = useState([]);

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchSubscriptions = async (currentPage = 1) => {
        try {
            const res = await getAdminSubscriptions(currentPage);
            setSubscriptions(res.data.data.subscriptions); // 👈 IMPORTANT
            setTotalPages(res.data.data.totalPages); // 👈 set total pages from API response
        } catch (err) {
            console.error("Error fetching subscriptions", err);
        }
    };

    useEffect(() => {
        fetchSubscriptions(page);
    }, [page]);

    const getStatusLabel = (status) =>
        status === 1 ? "Active" : "Inactive";

    return (
        <Layout>
            <div className="container-fluid py-3 px-4">
                <h2 className="mb-3">Subscriptions</h2>

                {/* TABLE */}
                <table className="table table-bordered align-middle">
                    <thead className="table-light">
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Plan</th>
                            <th>Price</th>
                            <th>Trial Days</th>
                            <th>Status</th>
                        </tr>
                    </thead>

                    <tbody>
                        {subscriptions.map((sub) => (
                            <tr
                                key={sub.id}
                                style={{ cursor: "pointer" }}
                                onClick={() => setSelectedUser(sub)}
                            >
                                <td>
                                    {/* <img
                  src={`https://god-love-api.deployment.cc/${sub.user.image}`}
                  width="40"
                  rounded
            /> */}
                                    {sub.user.firstName} {sub.user.lastName}</td>
                                <td>{sub.user.email}</td>
                                <td>{sub.subscriptionPlan.name}</td>
                                <td>{sub.subscriptionPlan.price}</td>
                                <td>{sub.subscriptionPlan.freeTrialDays}</td>

                                <td>
                                    <span
                                        className={`badge ${sub.status === 1 ? "bg-success" : "bg-secondary"
                                            }`}
                                    >
                                        {getStatusLabel(sub.status)}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* PAGINATION */}
                <div className="d-flex justify-content-end mt-3">
                    <button
                        className="btn me-2"
                        style={{
                            borderColor: "#631D15",
                            color: "#631D15"
                        }}
                        disabled={page === 1}
                        onClick={() => setPage(page - 1)}
                    >
                        Prev
                    </button>

                    <span className="align-self-center">
                        Page {page} of {totalPages}
                    </span>

                    <button
                        className="btn ms-2"
                        style={{
                            borderColor: "#631D15",
                            color: "#631D15"
                        }}
                        disabled={page === totalPages}
                        onClick={() => setPage(page + 1)}
                    >
                        Next
                    </button>
                </div>


                {/* MODAL */}
                {selectedUser && (
                    <>
                        <div className="modal fade show d-block">
                            <div className="modal-dialog modal-dialog-centered">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title">Subscription Details</h5>
                                        <button
                                            className="btn-close"
                                            onClick={() => setSelectedUser(null)}
                                        ></button>
                                    </div>

                                    <div className="modal-body">
                                        <p>
                                            <strong>Name:</strong>{" "} {selectedUser.user.firstName} {" "}
                                            {selectedUser.user.lastName}
                                        </p>
                                        <p>
                                            <strong>Email:</strong>{" "}
                                            {selectedUser.user.email}
                                        </p>
                                        <p>
                                            <strong>Plan:</strong> {" "}
                                            {selectedUser.subscriptionPlan.name}
                                        </p>
                                        <p>
                                            <strong>Price:</strong> {" "}
                                            {selectedUser.subscriptionPlan.price}
                                        </p>
                                        <p>
                                            <strong>Free Trial:</strong> {" "}
                                            {selectedUser.subscriptionPlan.freeTrialDays}days
                                        </p>
                                        <p>
                                            <strong>Status:</strong>{" "}
                                            <span
                                                className={`badge ${selectedUser.status === 1
                                                    ? "bg-success"
                                                    : "bg-secondary"
                                                    }`}
                                            >
                                                {getStatusLabel(selectedUser.status)}
                                            </span>
                                        </p>
                                        <p>
                                            <strong>Start Date:</strong> {" "}
                                            {selectedUser.startDate}
                                        </p>
                                        <p><strong>End Date:</strong> {" "}
                                            {selectedUser.endDate}
                                        </p>
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
            </div>
        </Layout>
    );
};

export default SubscriptionTable;