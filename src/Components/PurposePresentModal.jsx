import React from "react";
import { Modal, Button } from "react-bootstrap";

export default function PurposePresentModal({ show, onClose, data }) {

    const purposeGoals = [
    { text: "Renew Your Spirit", checked: true },
    { text: "Renew Your Spirit", checked: false },
    { text: "Renew Your Spirit", checked: true },
    { text: "Renew Your Spirit", checked: false },
    { text: "Renew Your Spirit", checked: true },
    { text: "Renew Your Spirit", checked: false },
    { text: "Renew Your Spirit", checked: true },
  ];

  const presentGoals = [
    { text: "Time Goals", checked: false },
    { text: "Time Goals", checked: true },
    { text: "Time Goals", checked: false },
    { text: "Time Goals", checked: true },
    { text: "Time Goals", checked: false },
    { text: "Time Goals", checked: true },
    { text: "Time Goals", checked: false },
  ];
  return (
    <Modal show={show} onHide={onClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Purpose & Present Time Goals</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <h5 className="fw-bold text-warning">PURPOSE TIME GOALS</h5>
        {purposeGoals.map((goal, i) => (
          <div key={i} className="d-flex align-items-center mb-2">
            <input type="checkbox" className="me-2" defaultChecked={goal.checked} />
            <div className="flex-grow-1 border p-2">{goal.text}</div>
            
          </div>
        ))}

        <h5 className="fw-bold text-warning mt-4">PRESENT TIME GOALS</h5>
        {presentGoals.map((goal, i) => (
          <div key={i} className="d-flex align-items-center mb-2">
            <input type="checkbox" className="me-2" defaultChecked={goal.checked}/>
            <div className="flex-grow-1 border p-2">{goal.text}</div>
            
          </div>
        ))}
      </Modal.Body>

      <Modal.Footer>
        <Button variant="danger" onClick={onClose}>Done</Button>
      </Modal.Footer>
    </Modal>
  );
}

// import React from "react";
// import { Modal, Button, Form } from "react-bootstrap";

// export default function PurposePresentModal({ show, onClose, data }) {
//   // Only one pre-filled text field per row
//   const purposeGoals = [
//     { text: "Renew Your Spirit", checked: true },
//     { text: "Renew Your Spirit", checked: false },
//     { text: "Renew Your Spirit", checked: true },
//     { text: "Renew Your Spirit", checked: false },
//     { text: "Renew Your Spirit", checked: true },
//     { text: "Renew Your Spirit", checked: false },
//     { text: "Renew Your Spirit", checked: true },
//   ];

//   const presentGoals = [
//     { text: "Time Goals", checked: false },
//     { text: "Time Goals", checked: true },
//     { text: "Time Goals", checked: false },
//     { text: "Time Goals", checked: true },
//     { text: "Time Goals", checked: false },
//     { text: "Time Goals", checked: true },
//     { text: "Time Goals", checked: false },
//   ];

//   return (
//     <Modal show={show} onHide={onClose} size="lg" centered>
//       <Modal.Header closeButton>
//         <Modal.Title>Purpose & Present Time Goals</Modal.Title>
//       </Modal.Header>

//       <Modal.Body>
//         <h5 className="fw-bold text-warning">PURPOSE TIME GOALS</h5>
//         {purposeGoals.map((goal, i) => (
//           <div key={i} className="d-flex align-items-center mb-2">
//             <Form.Check 
//               type="checkbox" 
//               defaultChecked={goal.checked} 
//               className="me-2"
//             />
            // <Form.Control 
            //   type="text" 
            //   defaultValue={goal.text} 
            //   className="flex-grow-1"
            // />
//           </div>
//         ))}

//         <h5 className="fw-bold text-warning mt-4">PRESENT TIME GOALS</h5>
//         {presentGoals.map((goal, i) => (
//           <div key={i} className="d-flex align-items-center mb-2">
//             <Form.Check 
//               type="checkbox" 
//               defaultChecked={goal.checked} 
//               className="me-2"
//             />
//             <Form.Control 
//               type="text" 
//               defaultValue={goal.text} 
//               className="flex-grow-1"
//             />
//           </div>
//         ))}
//       </Modal.Body>

//       <Modal.Footer>
//         <Button variant="danger" onClick={onClose}>Done</Button>
//       </Modal.Footer>
//     </Modal>
//   );
// }
