import Layout from "../../Components/Layout";
// import MonthlySalesChart from "../../Components/MonthlySalesChart";
import OrdersTable from "../../Components/OrderTable";
import { getAdminOrders } from "../../Services/orderApi";
import { useEffect, useState } from "react";


const Orders = () => {
  const [orders, setOrders] = useState([]);

  const [stats, setStats] = useState({
    totalSales: 0,
    totalOrders: 0,
    completedOrders: 0,
    pendingOrders: 0,
  });

  useEffect(() => {
  fetchOrdersForDashboard();
}, []);

const fetchOrdersForDashboard = async () => {
  try {
    const res = await getAdminOrders(1, 1000); // large limit
    const ordersData = res.data.data;

    let totalSales = 0;
    let completedOrders = 0;
    let pendingOrders = 0;

    ordersData.forEach((order) => {
      totalSales += Number(order.subTotal || 0);

      if (order.status === "COMPLETED") completedOrders++;
      if (order.status === "PENDING" || order.status === "PROCESSING")
        pendingOrders++;
    });

    setOrders(ordersData);

    setStats({
      totalSales,
      totalOrders: ordersData.length,
      completedOrders,
      pendingOrders,
    });
  } catch (error) {
    console.error("Dashboard orders fetch failed", error);
  }
};


  return (
    <Layout>
      <div className="container-fluid py-3 px-4" style={{ background: "#F7F8FA" }}>
        <h1 className="fs-3 pb-3">Ecommerce</h1>

        <div className="row gx-3">
          <div className="col-md-3">
            <div className="card shadow-sm mb-4">
              <div className="card-body text-center">
                <h2 className="mb-2">${stats.totalSales.toFixed(2)}</h2>
                <p className="mb-3 text-muted">Total Sales</p>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card shadow-sm mb-4">
              <div className="card-body text-center">
                <h2 className="mb-2">{stats.totalOrders}</h2>
                <p className="mb-3 text-muted">Total Orders</p>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card shadow-sm mb-4">
              <div className="card-body text-center">
                <h2 className="mb-2">{stats.completedOrders}</h2>
                <p className="mb-3 text-muted">Completed Orders</p>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card shadow-sm mb-4">
              <div className="card-body text-center">
                <h2 className="mb-2">{stats.pendingOrders}</h2>
                <p className="mb-3 text-muted">Pending Orders</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="mt-4 container-fluid py-3 px-4" style={{ background: "#F7F8FA" }}>
        <MonthlySalesChart />
      </div> */}
      {/* --- Orders Table Goes Here --- */}
        <div className="mt-4 container-fluid " style={{ background: "#F7F8FA" }}>
          <OrdersTable orders={orders} />
        </div>
    </Layout>
  );
};

export default Orders;
