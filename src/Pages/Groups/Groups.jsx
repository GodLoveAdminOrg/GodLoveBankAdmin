import React, { useState, useEffect } from "react";
import "../../App.css";
import Layout from "../../Components/Layout";
import { NavLink } from "react-router-dom";
import Button from "../../Components/Button";
import EmotionDropdown from "../../Components/EmotionDropdown";
import { getAdminUsersQuestions, updateAdminUserQuestion } from "../../Services/homeApi";


const Groups = () => {
  //   const [groups, setGroups] = useState([
  //   {
  //     name: "Group 1",
  //     questions: [
  //       { q: "I often over-compensate in my life", a: "Answer 1" },
  //       { q: "I often play it safe in my life", a: "Answer 2" },
  //       { q: "I often disengage in my life", a: "Answer 3" },
  //       { q: "I often sabotage things in my life", a: "Answer 4" },
  //     ],
  //   },
  //   {
  //     name: "Group 2",
  //     questions: [
  //       { q: "I need affirmation from others", a: "Answer 1" },
  //       { q: "I need to be accurate around others", a: "Answer 2" },
  //       { q: "I need to get along with others", a: "Answer 3" },
  //       { q: "I need to achieve in the midst of others", a: "Answer 4" },
  //     ],
  //   },
  //   {
  //     name: "Group 3",
  //     questions: [
  //       { q: "I have difficulty relaxing around others", a: "Answer 1" },
  //       { q: "I have difficulty trusting others", a: "Answer 2" },
  //       { q: "I prefer being alone, during difficulties", a: "Answer 3" },
  //       { q: "I have difficulty feeling I am loved", a: "Answer 4" },
  //     ],
  //   },
  //   {
  //     name: "Group 4",
  //     questions: [
  //       { q: "I often under- estimate my worth", a: "Answer 1" },
  //       { q: "I often do just enough to get accepted", a: "Answer 2" },
  //       { q: "I often detach myself from others", a: "Answer 3" },
  //       { q: "I often fear being wronged by others", a: "Answer 4" },
  //     ],
  //   },
  //   {
  //     name: "Group 5",
  //     questions: [
  //       { q: "I control situations, so I won’t get hurt", a: "Answer 1" },
  //       { q: "I under-react and playthings down", a: "Answer 2" },
  //       { q: "I have difficulty focusing and engaging", a: "Answer 3" },
  //       { q: "I often feel unsafe around others", a: "Answer 4" },
  //     ],
  //   },
  //   {
  //     name: "Group 6",
  //     questions: [
  //       { q: "I often feel inadequate and insufficient", a: "Answer 1" },
  //       { q: "I often feel unaccepted and overlooked", a: "Answer 2" },
  //       { q: "I often feel alone and disconnected", a: "Answer 3" },
  //       { q: "I often feel wronged and mistreated", a: "Answer 4" },
  //     ],
  //   },
  //   {
  //     name: "Group 7",
  //     questions: [
  //       { q: "I often devalue myself and diminish my true feelings", a: "Answer 1" },
  //       { q: "I often settle for less and disregard my true feelings", a: "Answer 2" },
  //       { q: "I often disengage, deny, and avoid my true feelings", a: "Answer 3" },
  //       { q: "I often get angry and misrepresent my true feelings", a: "Answer 4" },
  //     ],
  //   },
  // ]);

    const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

    // Fetch groups/questions on mount
  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    setLoading(true);
    try {
      const res = await getAdminUsersQuestions();
      // API response: res.data.data
      const grouped = res.data.data.map((g) => ({
        name: g.group,
        questions: g.questions.map((q) => ({
          id: q.id,
          q: q.question,
          category: q.category,
          isActive: q.isActive,
        })),
      }));
      setGroups(grouped);
    } catch (err) {
      console.error("Failed to fetch questions:", err);
    } finally {
      setLoading(false);
    }
  };

  // Open modal for group
  const handleEdit = (groupIndex) => {
    setSelectedGroup({ ...groups[groupIndex], index: groupIndex });
    setShowModal(true);
  };

  const handleInputChange = (qIndex, field, value) => {
  const updatedGroup = { ...selectedGroup };
  updatedGroup.questions[qIndex] = {
    ...updatedGroup.questions[qIndex],
    [field]: value,
  };
  setSelectedGroup(updatedGroup);
};

  const handleSave = async () => {
  setSaving(true);
  try {
    for (const q of selectedGroup.questions) {
      // ✅ payload should have 'question', not 'q'
      await updateAdminUserQuestion(q.id, { question: q.q });
    }

    const updatedGroups = [...groups];
    updatedGroups[selectedGroup.index] = selectedGroup;
    setGroups(updatedGroups);
    setShowModal(false);
    alert("Questions updated successfully!");
  } catch (err) {
    console.error("Failed to update questions:", err);
    alert("Failed to save changes.");
  } finally {
    setSaving(false);
  }
};



  return (
    <Layout>
      <div className="container-fluid py-3 px-4" style={{ background: "#F7F8FA" }}>
        <div className="d-flex justify-content-between">
          <h1 className="fs-3 pb-2">Groups</h1>
          <EmotionDropdown />
        </div>
      {loading ? (
          <p>Loading...</p>
        ) : (
        <div className="bookingtable pt-2">
          <table className="table bookingTableFont table-bordered">
            <thead>
              <tr className="coloumn">
                <th scope="col">Group</th>
                <th scope="col">Question</th>
                <th scope="col">Category</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {groups.map((group, gIndex) =>
                group.questions.map((item, qIndex) => (
                  <tr key={`${gIndex}-${qIndex}`}>
                    {qIndex === 0 && (
                      <td className="align-middle fs-6" rowSpan={group.questions.length}>
                        <b>{group.name}</b>
                      </td>
                    )}
                    <td className="align-middle descriptionCol" style={{ fontSize: 13 }}>
                      {item.q}
                    </td>
                    <td className="align-middle">{item.category || "-"}</td>
                    {qIndex === 0 && (
                      <td className="align-middle" rowSpan={group.questions.length}>
                        <button
                          className="btn btn-sm buttonstyle"
                          onClick={() => handleEdit(gIndex)}
                        >
                          Edit
                        </button>
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        )}

        {/* Modal */}
        {/* Modal */}
        {showModal && selectedGroup && (
          <div
            className="modal fade show d-block"
            tabIndex="-1"
            style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Edit {selectedGroup.name}</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowModal(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  {selectedGroup.questions.map((q, idx) => (
                    <div key={q.id} className="mb-3">
                      <label className="form-label">Question {idx + 1}</label>
                      <input
                        type="text"
                        className="form-control mb-1"
                        value={q.q}
                        onChange={(e) => handleInputChange(idx, "q", e.target.value)}
                      />
                      <input
                        type="text"
                        className="form-control"
                        value={q.category}
                        onChange={(e) => handleInputChange(idx, "category", e.target.value)}
                      />
                    </div>
                  ))}
                </div>
                <div className="modal-footer">
                  <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
                    Cancel
                  </button>
                  <button className="btn btn-primary" onClick={handleSave} disabled={saving}>
                    {saving ? "Saving..." : "Save"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Groups;
