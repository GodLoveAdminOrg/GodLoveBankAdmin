// import React from "react";
// import { Modal, Button } from "react-bootstrap";

// export default function AmenModal({ show, onClose }) {
//   return (
//     <Modal show={show} onHide={onClose} size="lg" centered>
//       <Modal.Header closeButton>
//         <Modal.Title className="fw-bold text-primary">
//           SOUND DOCTRINE PRINCIPLE
//         </Modal.Title>
//       </Modal.Header>

//       <Modal.Body>
//         {/* AMEN Header */}
//         <div className="d-flex justify-content-center gap-3 mb-4">
//           <div className="px-3 py-2 text-white fw-bold" style={{ background: "#E73522" }}>A</div>
//           <div className="px-3 py-2 text-white fw-bold" style={{ background: "#0A3ADF" }}>M</div>
//           <div className="px-3 py-2 text-white fw-bold" style={{ background: "#078A29" }}>E</div>
//           <div className="px-3 py-2 text-white fw-bold" style={{ background: "#F1D000" }}>N</div>
//         </div>

//         {/* Subject */}
//         <div className="mb-4">
//           <label className="fw-bold">Write in Subject</label>
//           <input
//             type="text"
//             value="Bible Based Decision Making"
//             className="form-control mt-1"
//           />
//         </div>

//         {/* Options Table */}
//         <table className="table table-bordered align-middle text-center">
//           <thead className="table-light">
//             <tr>
//               <th>BIBLE</th>
//               <th>LETTER</th>
//               <th>WORD</th>
//               <th>ANSWER</th>
//             </tr>
//           </thead>

//           <tbody>
//             <tr>
//               <td>BIBLE</td>
//               <td>
//                 <div className="px-3 py-2 text-white fw-bold" style={{ background: "#E73522" }}>A</div>
//               </td>
//               <td>ANSWER</td>
//               <td>
//                 <input className="form-control" defaultValue="ANSWER" />
//               </td>
//             </tr>

//             <tr>
//               <td>BIBLE</td>
//               <td>
//                 <div className="px-3 py-2 text-white fw-bold" style={{ background: "#0A3ADF" }}>M</div>
//               </td>
//               <td>MATE</td>
//               <td>
//                 <input className="form-control" defaultValue="MATE" />
//               </td>
//             </tr>

//             <tr>
//               <td>BIBLE</td>
//               <td>
//                 <div className="px-3 py-2 text-white fw-bold" style={{ background: "#078A29" }}>E</div>
//               </td>
//               <td>EXAMPLE</td>
//               <td>
//                 <input className="form-control" defaultValue="EXAMPLE" />
//               </td>
//             </tr>

//             <tr>
//               <td>BIBLE</td>
//               <td>
//                 <div className="px-3 py-2 text-white fw-bold" style={{ background: "#F1D000" }}>N</div>
//               </td>
//               <td>NEW SELF INVITATION</td>
//               <td>
//                 <input className="form-control" defaultValue="INVITATION" />
//               </td>
//             </tr>
//           </tbody>
//         </table>
//       </Modal.Body>

//       <Modal.Footer>
//         <Button variant="secondary" onClick={onClose}>
//           Close
//         </Button>
//       </Modal.Footer>
//     </Modal>
//   );
// }


import React from "react";
import { Modal, Button } from "react-bootstrap";

export default function AmenModal({ show, onClose }) {
  return (
    <Modal show={show} onHide={onClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title className="fw-bold text-primary">
          SOUND DOCTRINE PRINCIPLE
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {/* AMEN Header */}
        <div className="d-flex justify-content-center gap-3 mb-4">
          <div className="px-3 py-2 text-white fw-bold" style={{ background: "#E73522" }}>A</div>
          <div className="px-3 py-2 text-white fw-bold" style={{ background: "#0A3ADF" }}>M</div>
          <div className="px-3 py-2 text-white fw-bold" style={{ background: "#078A29" }}>E</div>
          <div className="px-3 py-2 text-white fw-bold" style={{ background: "#F1D000" }}>N</div>
        </div>

        {/* Subject */}
        <div className="mb-4">
          <label className="fw-bold">Write in Subject</label>
          <input
            type="text"
            value="Bible Based Decision Making"
            className="form-control mt-1"
          />
        </div>

        {/* Options Table */}
        <table className="table table-bordered align-middle text-center">
          <thead className="table-light">
            <tr>
              <th className="fw-bold">BIBLE LETTER</th>
              <th className="fw-bold">ANSWER</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>
                <div className="mb-1 fw-semibold">BIBLE  </div>
                <span className="px-3 py-1 text-white fw-bold mx-auto mt-1" style={{ background: "#E73522", width: "40px" }}>
                  A
                </span>
                <span className="mt-5"> NSWER</span>
              </td>
              <td>
                <input className="form-control" defaultValue="ANSWER" />
              </td>
            </tr>

            <tr>
              <td>
                <div className="mb-1 fw-semibold">BIBLE </div>
                <span className="px-3 py-1 text-white fw-bold mx-auto mt-1" style={{ background: "#0A3ADF", width: "40px" }}>
                  M
                </span>
                <span className="mt-1"> ATE</span>
              </td>
              <td>
                <input className="form-control" defaultValue="MATE" />
              </td>
            </tr>

            <tr>
              <td>
                <div className="mb-1 fw-semibold">BIBLE </div>
                <span className="px-3 py-1 text-white fw-bold mx-auto mt-1" style={{ background: "#078A29", width: "40px" }}>
                  E
                </span>
                <span className="mt-1"> XAMPLE</span>
              </td>
              <td>
                <input className="form-control" defaultValue="EXAMPLE" />
              </td>
            </tr>

            <tr>
              <td>
                <div className="mb-1 fw-semibold">BIBLE </div>
                <span className="px-3 py-1 text-white fw-bold mx-auto mt-1" style={{ background: "#F1D000", width: "40px" }}>
                  N
                </span>
                <span className="mt-1"> EW SELF INVITATION</span>
              </td>
              <td>
                <input className="form-control" defaultValue="INVITATION" />
              </td>
            </tr>
          </tbody>
        </table>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
