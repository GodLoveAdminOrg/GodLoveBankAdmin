// import Layout from "../../Components/Layout";
// import CoreValuesCard from "../../Components/CoreValueCard";
// import TaskPieChart from "../../Components/TaskPieChart";
// import { useEffect,useState } from "react";
// import { getAdminCoreValues } from "../../Services/coreValuesApi";

// export default function CoreValues() {
  
//   const [coreValues, setCoreValues] = useState([]);
//   const [loading, setLoading] = useState(true);


// // Pie chart example (baad me API se bhi ho sakta hai)
//   const totalUsers = coreValues.length;
//   const completedUsers = coreValues.filter(v => v.audioUrl).length;

//   useEffect(() => {
//     fetchCoreValues();
//   }, []);

//     const fetchCoreValues = async () => {
//     try {
//       setLoading(true);
//       const res = await getAdminCoreValues();
//       setCoreValues(res.data.data);
//     } catch (error) {
//       console.error("Core values fetch failed", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Layout>
//       {/* Pie Chart outside of row */}
//   <div className="d-flex justify-content-center mt-5">
//     <TaskPieChart totalUsers={totalUsers} completedUsers={completedUsers} />
//   </div>
//       <div className="container py-4">
//         {/* <h2 className="fw-bold mb-4">Core Values (Audio Upload)</h2> */}
//         {loading && <p>Loading core values...</p>}
        

//         {/* Stack layout */}
//         <div className="row">
//           {coreValues.map((value, index) => (
//             <CoreValuesCard
//               key={value.id}
//               coreValue={value}
//               title={`${index + 1}- ${value.name}`}
//               color={value.colorCode || "#000"}
//               audioUrl={value.audioUrl}
//               // onClick={fetchCoreValues}
//               // onDelete={() => console.log("Delete id:", value.id)}
//             />
//           ))}
//         </div>

        
//       </div>
//     </Layout>
//   );
// }

import Layout from "../../Components/Layout";
import CoreValuesCard from "../../Components/CoreValueCard";
import TaskPieChart from "../../Components/TaskPieChart";
import { useEffect, useState } from "react";
import { 
  getAdminCoreValues,
  updateAdminCoreValue 
} from "../../Services/coreValuesApi";

export default function CoreValues() {
  const [coreValues, setCoreValues] = useState([]);
  const [loading, setLoading] = useState(true);
  

  const totalUsers = coreValues.length;
  const completedUsers = coreValues.filter(v => v.audioUrl).length;

  useEffect(() => {
    fetchCoreValues();
  }, []);

  const fetchCoreValues = async () => {
    try {
      setLoading(true);
      const res = await getAdminCoreValues();
      setCoreValues(res.data.data || []);
    } catch (error) {
      console.error("Core values fetch failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      {/* <div className="d-flex justify-content-center mt-5">
        <TaskPieChart
          totalUsers={totalUsers}
          completedUsers={completedUsers}
        />
      </div> */}

      <div className="container py-4">
        {loading && <p>Loading core values...</p>}

        <div className="row">
          {coreValues.map((value, index) => (
            <CoreValuesCard
              key={value.id}
              coreValue={value}
              title={`${index + 1}- ${value.name}`}
              color={value.colorCode || "#000"}
              audioUrl={value.audioUrl}

              onUpload={updateAdminCoreValue}
              onUpdated={fetchCoreValues}

              // onDelete={() => console.log("Delete id:", value.id)}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
}
