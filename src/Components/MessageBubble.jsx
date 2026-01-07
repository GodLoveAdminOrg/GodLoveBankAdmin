
export default function MessageBubble({ senderType, content, createdAt, file }) {
  const isAdmin = senderType === "admin";

  console.log("MSG:", { senderType, content });
  return (
    <div className="mb-3 d-flex" style={{ justifyContent: isAdmin ? "flex-end" : "flex-start" }}>
      <div
        style={{
          maxWidth: "60%",
          padding: "10px 15px",
          borderRadius: "15px",
          background: isAdmin ? "#0d6efd" : "#e9ecef",
          color: isAdmin ? "#fff" : "#000",
        }}
      >
        {content && <div>{content}</div>}
        {file && (
          <img
            src={`http://18.204.175.233:3001/${file}`}
            alt=""
            style={{ maxWidth: "100%", borderRadius: "10px", marginTop: "5px" }}
          />
        )}
        <small style={{ fontSize: "11px", opacity: 0.6, display: "block", textAlign: isAdmin ? "right" : "left" }}>
          {new Date(createdAt).toLocaleTimeString()}
        </small>
      </div>
    </div>
  );
}
