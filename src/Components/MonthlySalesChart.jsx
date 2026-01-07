import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const MonthlySalesChart = () => {
  const data = {
    labels: [
      "Jan","Feb","Mar","Apr","May","Jun",
      "Jul","Aug","Sep","Oct","Nov","Dec"
    ],
    datasets: [
      {
        label: "Revenue ($)",
        data: [150, 250, 400, 300, 500, 700, 650, 800, 900, 1000, 950, 1200],
        borderColor: "#4e73df",
        backgroundColor: "rgba(78, 115, 223, 0.2)",
        tension: 0.4,
      },
      {
        label: "Orders",
        data: [10, 15, 20, 18, 25, 30, 28, 35, 40, 38, 45, 50],
        borderColor: "#f6c23e",
        backgroundColor: "rgba(246, 194, 62, 0.2)",
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: {
      display: true,
      text: "Monthly Revenue & Orders",
      font: {
        size: 24, // increase font size
        weight: 'bold', // optional: make it bold
      },
      color: '#F55227' // optional: change color
    },
      tooltip: { mode: "index", intersect: false },
    },
    interaction: { mode: "nearest", axis: "x", intersect: false },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="card shadow-sm mb-4 p-4">
      <Line data={data} options={options} height={80} />
    </div>
  );
};

export default MonthlySalesChart;
