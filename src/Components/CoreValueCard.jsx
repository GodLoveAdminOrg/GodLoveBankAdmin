

import { useState } from "react";
import { updateAdminCoreValue } from "../Services/coreValuesApi";

const CoreValueCard = ({ coreValue, title, onDelete, color, audioUrl, onUpdated, onClick }) => {
  const [audioFile, setAudioFile] = useState(null);
  const [saving, setSaving] = useState(false);

//   const handleUpload = async () => {
//   if (!coreValue || !coreValue.id) {
//     console.error("Core Value ID missing");
//     return;
//   }


//   try {
//     setSaving(true);

//     const formData = new FormData();
//     formData.append("audio", audioFile);

//     await updateAdminCoreValue(coreValue.id, formData);

//     onUpdated(); // refresh list
//     setAudioFile(null);
//     console.log("Uploading ID:", id);
// console.log("File:", audioFile);

//   } catch (err) {
//     console.error("Audio upload failed", err);
//   } finally {
//     setSaving(false);
//   }
// };

  const handleUpload = async () => {
  if (!coreValue?.id) {
    console.error("Core Value ID missing");
    return;
  }

  if (!audioFile) {
    alert("Please select an audio file");
    return;
  }

  try {
    setSaving(true);

    const formData = new FormData();
    formData.append("audio", audioFile);

    console.log("Uploading ID:", coreValue.id);

    await updateAdminCoreValue(coreValue.id, formData);

    onUpdated?.(); // refresh list
    setAudioFile(null);
  } catch (err) {
    console.error("Audio upload failed", err);
  } finally {
    setSaving(false);
  }
};



  return (
    <div className="card shadow-sm mx-2 mb-4" 
    style={{
        width: "380px",
        backgroundColor: color,
        cursor: onClick ? "pointer" : "default",
      }}
      onClick={onClick} 
      >
      {/* Dynamic Title */}
      <div className="card-header border-bottom" style={{background:"none"}}>
        <h6 className="fw-bold mb-0 text-white " >{title}</h6>
      </div>

      <div className="card-body ">

        {/* Audio Upload */}
        <label className="form-label text-white">Upload Audio</label>
        <input
          type="file"
          accept="audio"
          className="form-control"
          onChange={(e) => setAudioFile(e.target.files[0])}
        />

        {/* Audio Preview */}
        {audioUrl && (
          <audio
            controls
            className="mt-3"
            style={{ width: "100%" }}
            src={`http://18.204.175.233:3001/${audioUrl}`}
          />
        )}
        <button
          className="btn btn-sm btn-success mt-3"
          onClick={
            (e) => {
              e.stopPropagation();
              handleUpload();
            }}
          disabled={saving}
        >
          {saving ? "Uploading..." : "Save Audio"}
        </button>

        {/* Delete Button */}
        <button className="btn btn-sm btn-danger mt-3" onClick={onDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default CoreValueCard;