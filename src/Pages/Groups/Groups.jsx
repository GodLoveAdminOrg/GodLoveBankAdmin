import React from "react";
import "../../App.css";
import Layout from "../../Components/Layout";
import { NavLink } from "react-router-dom";
import Button from "../../Components/Button";
import EmotionDropdown from "../../Components/EmotionDropdown";

const Groups = () => {
  // Data array for groups
  const groups = [
    {
      name: "Group 1",
      questions: [
        { q: "I often over-compensate in my life", a: "Answer 1" },
        { q: "I often play it safe in my life", a: "Answer 2" },
        { q: "I often disengage in my life", a: "Answer 3" },
        { q: "I often sabotage things in my life", a: "Answer 4" },
      ],
    },
    {
      name: "Group 2",
      questions: [
        { q: "I need affirmation from others", a: "Answer 1" },
        { q: "I need to be accurate around others", a: "Answer 2" },
        { q: "I need to get along with others", a: "Answer 3" },
        { q: "I need to achieve in the midst of others", a: "Answer 4" },
      ],
    },
    {
      name: "Group 3",
      questions: [
        { q: "I have difficulty relaxing around others", a: "Answer 1" },
        { q: "I have difficulty trusting others", a: "Answer 2" },
        { q: "I prefer being alone, during difficulties", a: "Answer 3" },
        { q: "I have difficulty feeling I am loved", a: "Answer 4" },
      ],
    },
    {
      name: "Group 4",
      questions: [
        { q: "I often under- estimate my worth", a: "Answer 1" },
        { q: "I often do just enough to get accepted", a: "Answer 2" },
        { q: "I often detach myself from others", a: "Answer 3" },
        { q: "I often fear being wronged by others", a: "Answer 4" },
      ],
    },
    {
      name: "Group 5",
      questions: [
        { q: "I control situations, so I won’t get hurt", a: "Answer 1" },
        { q: "I under-react and playthings down", a: "Answer 2" },
        { q: "I have difficulty focusing and engaging", a: "Answer 3" },
        { q: "I often feel unsafe around others", a: "Answer 4" },
      ],
    },
    {
      name: "Group 6",
      questions: [
        { q: "I often feel inadequate and insufficient", a: "Answer 1" },
        { q: "I often feel unaccepted and overlooked", a: "Answer 2" },
        { q: "I often feel alone and disconnected", a: "Answer 3" },
        { q: "I often feel wronged and mistreated", a: "Answer 4" },
      ],
    },
    {
      name: "Group 7",
      questions: [
        { q: "I often devalue myself and diminish my true feelings", a: "Answer 1" },
        { q: "I often settle for less and disregard my true feelings", a: "Answer 2" },
        { q: "I often disengage, deny, and avoid my true feelings", a: "Answer 3" },
        { q: "I often get angry and misrepresent my true feelings", a: "Answer 4" },
      ],
    },
  ];

  return (
    <Layout>
      <div className="container-fluid py-3 px-4" style={{ background: "#F7F8FA" }}>
        <div className="d-flex justify-content-between">
          <h1 className="fs-3 pb-2">Groups</h1>
          {/* <Button className="" variant="outline   " size="md">Add Group</Button> */}
          <EmotionDropdown /> 
        </div>

        {/* Table */}
        <div className="bookingtable pt-2">
          <table className="table bookingTableFont table-bordered">
            <thead>
              <tr className="coloumn">
                <th scope="col">Group</th>
                <th scope="col">Question</th>
                <th scope="col">Answer</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {groups.map((group, gIndex) =>
                group.questions.map((item, qIndex) => (
                  <tr key={`${gIndex}-${qIndex}`}>
                  {/* First column → Group name only once per group */}
                  {qIndex === 0 && (
                    <td
                      className="align-middle fs-6"
                      rowSpan={group.questions.length}
                    >
                      <b>{group.name}</b>
                    </td>
                  )}

                  {/* Question */}
                  <td className="align-middle descriptionCol" style={{ fontSize: 13 }}>
                    {item.q}
                  </td>

                  {/* Answer */}
                  <td className="align-middle">{item.a}</td>

                  {/* Action → show only once per group */}
                  {qIndex === 0 && (
                    <td
                      className="align-middle"
                      rowSpan={group.questions.length}
                    >
                      <NavLink
                        to="/JobDetails"
                        className="btn btn-sm buttonstyle me-2"
                      >
                        Edit
                      </NavLink>
                    </td>
                  )}
                </tr>
              ))
            )}
        </tbody>

          </table>
        </div>
      </div>
    </Layout>
  );
};

export default Groups;
