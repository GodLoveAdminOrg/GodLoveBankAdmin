import React from "react";
import { Modal, Button } from "react-bootstrap";

export default function PlannedGoalModal({ show, onClose }) {
  const sections = {
    "RENEWING YOUR SPIRIT": [
      "Praise, Worship, Thank God Seven Times Today",
      "Examine Your Threshold Being Before God Today",
      "Request Your Desired Petitions From God Today",
    ],
    "RESTORING YOUR SOUL": [
      "Forgive Yourself and Significant Others Today",
      "Equip Yourself Against Evil Temptations Today",
      "Choose One Purpose Instrumental Goal Today",
      "Turn All Your Thoughts Into Love Deposits Today",
    ],
    "REDEEMING YOUR BODY": [
      "Design a Workout Exercise for your Body Today",
      "Assign Your Body a Healthy Balanced Diet Today",
      "Yield Your Body to the Leading of the Spirit Today",
    ]
  };

  return (
    <Modal show={show} onHide={onClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Planned Time Goals</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {Object.entries(sections).map(([title, list]) => (
          <div key={title} className="mb-4">
            <h5 className="fw-bold text-warning">{title}</h5>
            {list.map((item, i) => (
              <div key={i} className="d-flex align-items-center mb-2">
                <input type="checkbox" className="me-2" />
                <div className="flex-grow-1 border p-2">{item}</div>
              </div>
            ))}
          </div>
        ))}
      </Modal.Body>

      <Modal.Footer>
        <Button variant="danger" onClick={onClose}>Done</Button>
      </Modal.Footer>
    </Modal>
  );
}
