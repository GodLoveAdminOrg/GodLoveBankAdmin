import Layout from "../../Components/Layout";
import CoreValuesCard from "../../Components/CoreValueCard";
import TaskPieChart from "../../Components/TaskPieChart";
import { useEffect,useState } from "react";
import { getAdminCoreValues } from "../../Services/coreValuesApi";

export default function CoreValues() {
  // const coreValues = [
  //   {title:"New Self Honesty", color: "#00A1D6"},
  //   {title:"New Self Courage", color: "#DB65A1"},
  //   {title:"New Self Forgiveness", color: "#41B35E"},
  //   {title:"New Self Power", color: "#050709"},
  //   {title:"New Self Purpose", color: "#C5CAE9"},
  //   {title:"New Self Excellence", color: "#0077BB"},
  //   {title:"New Self Image", color: "#BED8ED"},
  //   {title:"New Self Discipline", color: "#F78F3D"},
  //   {title:"New Self Confidence", color: "#7CCBC0"},
  //   {title:"New Self Worth", color: "#EE3F2D"},
  //   {title:"New Self Respect", color: "#403490"},
  //   {title:"New Self Love", color: "#8E3580"},
  //   {title:"New Self Prosperity", color: "#00816E"},
  //   {title:"New Self Integrity", color: "#DDC93B"},
  //   {title:"New Self Hapiness", color: "#FAC033"},
   
  // ];
  const [coreValues, setCoreValues] = useState([]);
  const [loading, setLoading] = useState(true);


// Pie chart example (baad me API se bhi ho sakta hai)
  const totalUsers = coreValues.length;
  const completedUsers = coreValues.filter(v => v.audioUrl).length;

  useEffect(() => {
    fetchCoreValues();
  }, []);

    const fetchCoreValues = async () => {
    try {
      setLoading(true);
      const res = await getAdminCoreValues();
      setCoreValues(res.data.data);
    } catch (error) {
      console.error("Core values fetch failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      {/* Pie Chart outside of row */}
  <div className="d-flex justify-content-center mt-5">
    <TaskPieChart totalUsers={totalUsers} completedUsers={completedUsers} />
  </div>
      <div className="container py-4">
        {/* <h2 className="fw-bold mb-4">Core Values (Audio Upload)</h2> */}
        {loading && <p>Loading core values...</p>}
        

        {/* Stack layout */}
        <div className="row">
          {coreValues.map((value, index) => (
            <CoreValuesCard
              key={value.id}
              coreValue={value}
              title={`${index + 1}- ${value.name}`}
              color={value.colorCode || "#000"}
              audioUrl={value.audioUrl}
              onClick={fetchCoreValues}
              onDelete={() => console.log("Delete id:", value.id)}
            />
          ))}
        </div>

        
      </div>
    </Layout>
  );
}
