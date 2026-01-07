import { Modal, Button } from "react-bootstrap";
import { getAdminOrders,updateOrderStatusApi  } from "../Services/orderApi.jsx";
import { useEffect, useState } from "react";
import fallback from "../assets/fallback.png";


const OrdersTable = () => {
  
  const [orders, setOrders] = useState([]);


  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const rowsPerPage = 10;

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // useEffect(() => {
  // fetchOrders();
  //   }, []);
    useEffect(() => {
    fetchOrders(currentPage);
  }, [currentPage]);

  const fetchOrders = async (page) => {
  try {
    const res = await getAdminOrders(page, rowsPerPage);
        // 👇 API se data
    const apiOrders = res.data.data;


    const formattedOrders = res.data.data.map((order) => ({
      id: order.id,
      orderNumber: order.orderNumber,
      orderDate: new Date(order.createdAt).toLocaleDateString(),
      customerName: `${order.user.firstName} ${order.user.lastName}`,
      city: order.address?.city || "N/A",
      status: order.status,
      deliveryAddress: order.address.address,
      phone: `${order.address.countryCode} ${order.address.phoneNumber}`,
      products: order.orderItems.map((item) => ({
        name: item.product.name,
        image: item.product.image
        ? `http://18.204.175.233:3001/${item.product.image}`
        : fallback,
        by: item.product.author,
        quantity: item.qty,
        price: Number(item.price),
        stock: item.product.inventory,
      })),
      deliveryFee: Number(order.deliveryCharges),
      subTotal: Number(order.subTotal),
    }));

    setOrders(formattedOrders);
    setTotalPages(res.data.totalPages || 1);
  } catch (error) {
    console.error("Orders fetch failed", error);
  }
};

  // Update order status to Completed
//   const updateStatus = async (orderId) => {
//     console.log("updateStatus called with ID:", orderId);
//   try {
//     await updateOrderStatusApi(orderId, "COMPLETED");

//     // 🔥 Update selectedOrder immediately
//     setSelectedOrder((prev) => ({
//       ...prev,
//       status: "COMPLETED",
//     }));

//     fetchOrders(currentPage);

//     setShowModal(false);
//   } catch (error) {
//     console.error("Status update failed", error);
//   }
// };
  const updateStatus = async (orderId) => {
  console.log("updateStatus called with ID:", orderId);

  try {
    const res = await updateOrderStatusApi(orderId, "COMPLETED");
    console.log("API SUCCESS RESPONSE:", res);

    fetchOrders(currentPage);
    setShowModal(false);
  } catch (error) {
    console.error("Status update failed", error);
    console.error("API ERROR RESPONSE:", error?.response);
  }
};
  
const formatStatus = (status) => {
  switch (status) {
    case "PENDING":
      return "Pending";
    case "PROCESSING":
      return "Processing";
    case "COMPLETED":
      return "Completed";
    default:
      return status;
  }
};


  // Handle modal open
  const handleRowClick = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };
  const handleClose = () => setShowModal(false);

  // SEARCH FILTER
  // const filteredOrders = orders.filter(
  //   (order) =>
  //     order.orderNumber.includes(searchTerm) ||
  //     order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     order.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     order.status.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  // PAGINATION
  // const totalPages = Math.ceil(filteredOrders.length / rowsPerPage);
  // const paginatedOrders = filteredOrders.slice(
  //   (currentPage - 1) * rowsPerPage,
  //   currentPage * rowsPerPage
  // );

  // Calculate amount for table display
  // const calculateAmount = (order) => {
  //   const itemsTotal = order.products.reduce((sum, p) => sum + p.price * p.quantity, 0);
  //   return (itemsTotal + order.deliveryFee + order.platformFee).toFixed(2);
  // };

  return (
    <div>
      <h3>Order Details</h3>
      {/* Search Box */}
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by order number, customer, city, or status"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

      {/* Table */}
      <table className="table table-bordered align-middle">
        <thead className="table-light">
          <tr>
            <th>Order Number</th>
            <th>Order Date</th>
            <th>Customer Name</th>
            <th>City</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} style={{ cursor: "pointer" }}>
              <td onClick={() => handleRowClick(order)}>{order.orderNumber}</td>
              <td onClick={() => handleRowClick(order)}>{order.orderDate}</td>
              <td onClick={() => handleRowClick(order)}>{order.customerName}</td>
              <td onClick={() => handleRowClick(order)}>{order.city}</td>
              <td onClick={() => handleRowClick(order)}>${order.subTotal}</td>
              <td onClick={() => handleRowClick(order)}>
                <span
                  className={`badge ${
                    order.status === "COMPLETED"
                      ? "bg-success"
                      : order.status === "PROCESSING"
                      ? "bg-primary"
                      : "bg-warning text-dark"
                  }`}
                >
                  {formatStatus(order.status)}
                </span>
              </td>
              
            </tr>
           ))} 
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <div>
          <button
            className="btn btn-sm btn-outline-primary me-2"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <button
            className="btn btn-sm btn-outline-primary"
            onClick={() => setCurrentPage((prev) => prev + 1)}
            disabled={orders.length < rowsPerPage}
          >
            Next
          </button>
        </div>
      </div>

      
      {/* Modal for Order Details */}
      
{selectedOrder && (
  <Modal show={showModal} onHide={handleClose} size="lg" centered>
    <Modal.Header closeButton>
  <div className="d-flex flex-column w-100">
    <Modal.Title>Order Details - {selectedOrder.orderNumber}</Modal.Title>
    {/* Status Badge + Update Button */}
    <div className="d-flex align-items-center mt-2">
      <span
    className={`badge ${
          selectedOrder.status === "COMPLETED"
            ? "bg-success"
            : selectedOrder.status === "PROCESSING"
            ? "bg-info"
            : "bg-warning text-dark"
        }`}
      >
        {formatStatus(selectedOrder.status)}
      </span>
      {selectedOrder.status === "PROCESSING" && (
        <Button
          size="sm"
          variant="success"
          onClick={() => {
            console.log("CLICKED Mark as Completed");
            console.log("Order ID:", selectedOrder.id);
            console.log("Current Status:", selectedOrder.status);
            updateStatus(selectedOrder.id);
          }}
        >
          Mark as Completed
        </Button>
      )}
    </div>
  </div>
</Modal.Header>

    <Modal.Body>
      {/* Customer Details */}
      <div className="mb-4">
        <h5>Customer Details</h5>
        <div className="p-3 border rounded bg-light">
          <p className="mb-1"><strong>Name:</strong> {selectedOrder.customerName}</p>
          <p className="mb-1"><strong>Phone:</strong> {selectedOrder.phone}</p>
          <p className="mb-1"><strong>Address:</strong> {selectedOrder.deliveryAddress}</p>
          <p className="mb-0"><strong>City:</strong> {selectedOrder.city}</p>
        </div>
      </div>

      {/* Product Details */}
      <div className="mb-4">
        <h5>Order / Product Details</h5>
        <div className="d-flex flex-column gap-3">
          {selectedOrder.products.map((product, idx) => (
            <div
              key={idx}
              className="d-flex align-items-center p-2 border rounded shadow-sm bg-white"
            >
              <div className="me-3" style={{ minWidth: 80, minHeight: 80 }}>
                <img
                  src={product.image || fallback}
                  alt={product.name}
                  width={80}
                  height={80}
                  className="rounded"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="flex-grow-1">
                <p className="mb-1 fw-bold">{product.name}</p>
                <p className="mb-1 text-muted">By {product.by}</p>
                <p className="mb-1">Qty: {product.quantity}, In Stock: {product.stock}</p>
                <p className="mb-0">Price: ${product.price.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Order Summary */}
      <div className="mb-2">
        <h5>Order Summary</h5>
        <div className="p-3 border rounded bg-light">
          <p className="mb-1">
            Items Total: $
            {selectedOrder.products
              .reduce((sum, p) => sum + p.price * p.quantity, 0)
              .toFixed(2)}
          </p>
          <p className="mb-1">Delivery Fee: ${selectedOrder.deliveryFee}</p>
          {/* <p className="mb-1">Platform Fee: ${selectedOrder.platformFee}</p> */}
          <p className=" mb-0 fw-bold">Total Payment: ${selectedOrder.subTotal}</p>
          {/* <p className="mb-0 fw-bold">
            Total Payment: $
            {(
              selectedOrder.products.reduce((sum, p) => sum + p.price * p.quantity, 0) +
              selectedOrder.deliveryFee +
              selectedOrder.platformFee
            ).toFixed(2)}
          </p> */}
        </div>
      </div>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>
        Close
      </Button>
    </Modal.Footer>
  </Modal>
)}

    </div>
  );
};

export default OrdersTable;
    