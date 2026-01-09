import Layout from "../../Components/Layout";
import CoreValuesCard from "../../Components/CoreValueCard";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { getAdminToolsOfThinking, updateAdminToolOfThinkingAudio } from "../../Services/toolofthinkingApi";




export default function ToolsOfThinking() {
    const navigate = useNavigate();
    const [tools, setTools] = useState([]);
    const [loading, setLoading] = useState(true);
    

  
  // Only these cards should open a table
  const tablePages = {
    2: "No. of Request",
    5: "Subject",
    4: "Goal Name",
    6: "Goal Name",
  };

   useEffect(() => {
    fetchTools();
  }, []);

  const fetchTools = async () => {
    try {
      setLoading(true);
      const res = await getAdminToolsOfThinking();
      setTools(res.data.data || []);
    } catch (err) {
      console.error("Tools fetch failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCardClick = (id) => {
    if (tablePages[id]) {
      navigate(`/tools-of-thinking/${id}?title=${encodeURIComponent(tablePages[id])}`);
    }
  };

  return (
    <Layout>
      {/* Pie Chart outside of row */}
  {/* <div className="d-flex justify-content-center mt-5">
    <TaskPieChart totalUsers={totalUsers} completedUsers={completedUsers} />
  </div> */}
  <div className="d-flex justify-content-center mb-4 py-3 px-3 border rounded" style={{ background: "rgb(247, 248, 250)"}}>
      <h2 className="fw-bold text-danger fs-2">Tools of Thinking</h2>
    </div> 
      <div className="container py-0 " >
      {loading && <p>Loading tools...</p>}

        {/* Stack layout */}
        {/* <div className="row">
          {coreValues.map((value, index) => (
            <CoreValuesCard
              key={index}
              title={`${index + 1}- ${value.title}`}
              color={value.color}
              onDelete={() => console.log(`Delete clicked for card ${index + 1}`)}
              onClick={() => handleCardClick(index + 1)}

            />
          ))}
        </div> */}
        <div className="row">
          {tools.map((tool, index) => (
            <CoreValuesCard
              key={tool.id}
              coreValue={tool}
              title={`${index + 1}- ${tool.name}`}
              color="rgba(179,179,179,1)"
              audioUrl={tool.audioUrl}

              enableAudioUpload={!tool.audioUrl}                  // disable upload if audio exists
              onUpload={updateAdminToolOfThinkingAudio}          // API call
              onUpdated={fetchTools}                              // refresh after upload

              onClick={() => handleCardClick(index + 1)}
              onDelete={() => console.log(`Delete clicked for tool ${tool.id}`)}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
}
