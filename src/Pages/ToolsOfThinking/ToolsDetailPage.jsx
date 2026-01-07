import { useParams, useSearchParams } from "react-router-dom";
import ToolCardTable from "../../Components/ToolCardTable";
import Layout from "../../Components/Layout";
import AmenModal from "../../Components/AmenModal";
import LoveDepositModal from "../../Components/LoveDepositModal";
import HolySpiritAAAModal from "../../Components/HolySpiritAAAModal";
import PurposePresentModal from "../../Components/PurposePresentModal";
import PlannedGoalModal from "../../Components/PlannedGoalModal";
import JournalModal from "../../Components/JournalModal";
import { useState } from "react";

export default function ToolsDetailPage() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();

  const [showAmenModal, setShowAmenModal] = useState(false);
  const [showLoveModal, setShowLoveModal] = useState(false);  
  const [selectedRow, setSelectedRow] = useState(null);
  const [showPurposeModal, setShowPurposeModal] = useState(false);
  const [showPlannedModal, setShowPlannedModal] = useState(false);
  const [showJournalModal, setShowJournalModal] = useState(false);
  const [showAAAModal, setShowAAAModal] = useState(false);
  const [aaaData, setAaaData] = useState({});

  const toolsData = {
  2: [
    { id: 1, username: "Arbab", date: "2025-02-04", value: "Subject 1" },
    { id: 2, username: "John", date: "2025-02-04", value: "Subject 2" },
    { id: 3, username: "John", date: "2025-02-04", value: "Subject 2" },

  ],

  5: [
    { id: 1, username: "Maria", date: "2025-02-04", value: "NSL MindFullness" },
    { id: 2, username: "Dis'ouza", date: "2025-02-04", value: "NSL MindFullness" },

  ],

  4: [
    { id: 1, username: "Arbab", date: "2025-02-04", value: "Goal 1" },
    { id: 2, username: "John", date: "2025-02-04", value: "Goal 2" },
  ],

  6: [
    { id: 1, username: "Planner User", date: "2025-02-10", value: "Purpose and Present Time Goal" },
    { id: 2, username: "Shawn", date: "2025-02-10", value: "Planned Time Goals" },
    { id: 3, username: "Robert", date: "2025-02-10", value: "Daily Purpose Journal" },
  ]
};


  // const handleRowClick = (row) => {
  //   setSelectedRow(row);

  // if (id === "2") {        // 2 = A-M-E-N Principle
  //   setShowAmenModal(true);
  // }else if(id === "4"){  // 4 = Love Deposit Componding Interest Reps
  //   setShowLoveModal(true);
  // } else if (id === "5") {  // 5 = Holy Spirit AAA Cards
  //   setAaaData({
  //     requestNo: row.id,
  //     acknowledge: row.value,
  //     ask: row.value,
  //     abide: row.value,
  //   });
  //   setShowAAAModal(true);
  // }
  // };
  const thirdColumnTitle = searchParams.get("title");
  const handleRowClick = (row) => {
  setSelectedRow(row);

  // --------------------------------
  // OLD MODALS (already in your flow)
  // --------------------------------
  if (id === "2") {   // 2 = A-M-E-N Principle
    setShowAmenModal(true);
    return;
  }

  if (id === "4") {   // 4 = Love Deposit Compounding Interest
    setShowLoveModal(true);
    return;
  }

  if (id === "5") {   // 5 = Holy Spirit AAA Cards
    setAaaData({
      requestNo: row.id,
      acknowledge: row.value,
      ask: row.value,
      abide: row.value,
    });
    setShowAAAModal(true);
    return;
  }

  // --------------------------------
  // NEW DAILY PURPOSE PLANNER MODALS
  // --------------------------------
    console.log("thirdColumnTitle:", thirdColumnTitle); // debug output
  if (row.value === "Purpose and Present Time Goal") {
    setShowPurposeModal(true);
    return;
  }

  if (row.value === "Planned Time Goals") {
    setShowPlannedModal(true);
    return;
  }

  if (row.value === "Daily Purpose Journal") {
    setShowJournalModal(true);
    return;
  }
};



  // const thirdColumnTitle = searchParams.get("title");

  return (
    <Layout>
      <div><h2 className="fw-bold mb-4">
        Tool #{id} — {thirdColumnTitle}
      </h2></div>
    <div className="container py-4">
      

      <ToolCardTable
        rows={toolsData[id] || []}
        thirdColumnTitle={thirdColumnTitle}
        thirdColumnKey="value"
        onRowClick={handleRowClick}
      />
    </div>

    {/* 👇 Amen Modal */}
      <AmenModal 
        show={showAmenModal} 
        onClose={() => setShowAmenModal(false)} 
      />
    {/* 👇 Love Deposit Modal */}
      <LoveDepositModal
        show={showLoveModal}
        onClose={() => setShowLoveModal(false)}
        title={selectedRow?.username}
        reps={selectedRow?.value}
      />
      {/* 👇 AAA Modal */}
      <HolySpiritAAAModal
        show={showAAAModal}
        onClose={() => setShowAAAModal(false)}
        data={aaaData}
      />
            {/* Journal Modals */}

      <PurposePresentModal 
        show={showPurposeModal}
        onClose={() => setShowPurposeModal(false)}
        data={selectedRow}
      />

      <PlannedGoalModal
        show={showPlannedModal}
        onClose={() => setShowPlannedModal(false)}
        data={selectedRow}
      />

      <JournalModal
        show={showJournalModal}
        onClose={() => setShowJournalModal(false)}
        data={selectedRow}
      />
    </Layout>
  );
}
