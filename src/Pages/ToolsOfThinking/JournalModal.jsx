import React from "react";
import { Modal, Button } from "react-bootstrap";

export default function JournalModal({ show, onClose }) {
  const thoughts = [
    "Random thought & feeling ",
    "Random thought & feeling ",
    "Random thought & feeling",
    "Random thought & feeling ",
    "Random thought & feeling ",
    "Random thought & feeling ",
    "Random thought & feeling ",
    "Random thought & feeling ",
    "Random thought & feeling ",
    " N/A ",
    "Random thought & feeling ",
    "Random thought & feeling ",
  ];
  return (
    <Modal show={show} onHide={onClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Daily Purpose Journal</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <h5 className="fw-bold text-warning">Record Your Thoughts & Feelings</h5>
        {thoughts.map((thought, index) => (
          <input
            key={index}
            className="form-control mt-3" 
            rows={1}
            placeholder="Write here..."
            defaultValue={thought}
            readOnly
          />
        ))}
        
      </Modal.Body>

      <Modal.Footer>
        <Button variant="danger" onClick={onClose}>Done</Button>
      </Modal.Footer>
    </Modal>
  );
}
