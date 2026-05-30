import React from "react";
import { Modal, Button } from "react-bootstrap";

export default function HolySpiritAAAModal({ show, onClose, data }) {
  return (
    <Modal show={show} onHide={onClose} centered size="lg">
      <Modal.Body style={{ borderRadius: "20px" }}>
        {/* Request Number */}
        <p className="text-danger fw-bold mb-1">Request {data?.requestNo || 1}</p>

        {/* Heading */}
        <h4 className="text-center fw-bold mb-4">
          ACKNOWLEDGE
        </h4>

        {/* Acknowledge Field */}
        <div className="mb-4">
          <label className="fw-semibold">Honor the Holy Spirit as LORD here:</label>
          <textarea
            className="form-control mt-2"
            rows="2"
            defaultValue={"Honor The Holy Spirit"}
            style={{ borderRadius: "15px" }}
          ></textarea>
        </div>

        {/* ASK Section */}
        <h5 className="text-center fw-bold mb-3">ASK</h5>

        <div className="mb-4">
          <label className="fw-semibold">Enter details of your request here:</label>
          <textarea
            className="form-control mt-2"
            rows="2"
            defaultValue={"Spiritually Ask Your Request"}
            style={{ borderRadius: "15px" }}
          ></textarea>
        </div>

        {/* ABIDE Section */}
        <h5 className="text-center fw-bold mb-3">ABIDE</h5>

        <div className="mb-3">
          <label className="fw-semibold">Enter long will you abide to the End:</label>
          <textarea
            className="form-control mt-2"
            rows="2"
            defaultValue={"Spirit as Lord"}
            style={{ borderRadius: "15px" }}
          ></textarea>
        </div>
      </Modal.Body>

      <Modal.Footer className="d-flex justify-content-end">
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
