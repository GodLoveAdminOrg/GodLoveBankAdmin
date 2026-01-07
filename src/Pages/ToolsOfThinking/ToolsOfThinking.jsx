import Layout from "../../Components/Layout";
import CoreValuesCard from "../../Components/CoreValueCard";
import { useNavigate } from "react-router-dom";


export default function ToolsOfThinking({ title }) {
    const navigate = useNavigate();

  const coreValues = [
    {title:"THE DAILY PRAYER MACRO STRATEGY", color: "rgba(179, 179, 179, 1)"},
    {title:"THE A-M-E-N PRINCIPLE", color: "rgba(179, 179, 179, 1)"},
    {title:"OPENING AND CLOSING SPIRIT", color: "rgba(179, 179, 179, 1)"},
    {title:"LOVE DEPOSIT  COMPOUNDING INTEREST REPS", color: "rgba(179, 179, 179, 1)"},
    {title:"THE HOLY SPIRIT AAA CARDS", color: "rgba(179, 179, 179, 1)"},
    {title:"THE DAILY PURPOSE PLANNER AND JOURNAL", color: "rgba(179, 179, 179, 1)"},
    {title:"LOVE DEPOSITS AND WITHDRAWALS", color: "rgba(179, 179, 179, 1)"},
    {title:"GOD'S PURPOSE TOOLBOX", color: "rgba(179, 179, 179, 1)"},
    {title:"THE SEVEN LAWS OF SOWING REAPING FAITH", color: "rgba(179, 179, 179, 1)"},
    {title:"GLB RATIONALE: THREEFOLD SPIRITUAL BEING ", color: "rgba(179, 179, 179, 1)"},
    {title:"PURPOSE INSTRUMENTAL GOALS", color: "rgba(179, 179, 179, 1)"},
    {title:"THE FIVE STATIONS OF THE GIFT JOURNEY", color: "rgba(179, 179, 179, 1)"},
    {title:"THE FIVE CARING DEEDS OF THE BODY", color: "rgba(179, 179, 179, 1)"},
    {title:"THE 100% PYRAMID!", color: "rgba(179, 179, 179, 1)"},
    {title:"THE THERMOSTAT OF YOUR SOUL!", color: "rgba(179, 179, 179, 1)"},
    {title:"THE FIVE STAGES OF SPIRITUAL GROWTH", color: "rgba(179, 179, 179, 1)"},
    {title:"THE GOLDEN RULE OF EFFECTIVE COMMUNICATION", color: "rgba(179, 179, 179, 1)"},
    {title:"GOD'S LOVE BANK CURRICULUM", color: "rgba(179, 179, 179, 1)"},
   
  ];
  // Only these cards should open a table
  const tablePages = {
    2: "No. of Request",
    5: "Subject",
    4: "Goal Name",
    6: "Goal Name",
  };

  const handleCardClick = (id) => {
    if (tablePages[id]) {
      navigate(`/tools-of-thinking/${id}?title=${encodeURIComponent(tablePages[id])}`);
    }
  }

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
           
        

        {/* Stack layout */}
        <div className="row">
          {coreValues.map((value, index) => (
            <CoreValuesCard
              key={index}
              title={`${index + 1}- ${value.title}`}
              color={value.color}
              onDelete={() => console.log(`Delete clicked for card ${index + 1}`)}
              onClick={() => handleCardClick(index + 1)}

            />
          ))}
        </div>
      </div>
    </Layout>
  );
}
