import React from "react";
import { Modal } from "react-bootstrap";

export default function LoveDepositModal({ show, onClose, title, reps }) {
  return (
    <Modal show={show} onHide={onClose} centered>
      <div
        className="p-4"
        style={{
          background: "#fffefeff",
          borderRadius: "8px",
        }}
      >
        <h6 className="fw-bold text-dark mb-2" >{reps}</h6>
        <p className="text-muted fw-semibold mb-0" >106 Reps</p>
      </div>
    </Modal>
  );
}
