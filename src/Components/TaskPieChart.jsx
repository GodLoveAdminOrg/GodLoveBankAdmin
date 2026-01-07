// import React from "react";
// import { Pie } from "react-chartjs-2";
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
// import ChartDataLabels from "chartjs-plugin-datalabels";


// ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

// const TaskPieChart = ({ totalUsers, completedUsers }) => {
//   const notCompletedUsers = totalUsers - completedUsers;

//   const data = {
//     labels: ["Task Completed", "Task Not Completed"],
//     datasets: [
//       {
//         data: [completedUsers, notCompletedUsers],
//         backgroundColor: ["#4CAF50", "#F44336"], // green and red
//         hoverBackgroundColor: ["#66BB6A", "#EF5350"],
//       },
//     ],
//   };

//   const options = {
//     plugins: {
//       legend: {
//         position: "bottom",
//       },
      
//     },
//   };

//   return (
//     <div style={{ width: "300px", margin: "0 auto", textAlign: "center" }}>
//       <h5>Total Users: {totalUsers}</h5>
//       <Pie data={data} options={options} />
//     </div>
//   );
// };

// export default TaskPieChart;

import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const TaskPieChart = ({ totalUsers, completedUsers }) => {
  const notCompletedUsers = totalUsers - completedUsers;
  const completionPercentage = ((completedUsers / totalUsers) * 100).toFixed(1);

  const data = {
    labels: ["Task Completed", "Task Not Completed"],
    datasets: [
      {
        data: [completedUsers, notCompletedUsers],
        backgroundColor: ["#4CAF50", "#F44336"],
        hoverBackgroundColor: ["#66BB6A", "#EF5350"],
      },
    ],
  };

  const options = {
    plugins: {
      legend: { position: "bottom" },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const value = tooltipItem.raw;
            const percentage = ((value / totalUsers) * 100).toFixed(1);
            return `${tooltipItem.label}: ${value} (${percentage}%)`;
          },
        },
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div style={{ width: "300px", margin: "0 auto", textAlign: "center" }}>
      <h5 className="">Total Users: {totalUsers}</h5>
      <h6 className="fw-semibold">Completion: {completionPercentage}%</h6>
      <h6 className="fw-semibold">Incomplete: {notCompletedUsers}%</h6>
      
      <div style={{ height: "250px" }}>
        <Pie data={data} options={options} />
      </div>
    </div>
  );
};

export default TaskPieChart;
