
// export default function MessageBubble({ senderType, content, createdAt, file }) {
//   const isAdmin = senderType === "admin";

//   console.log("MSG:", { senderType, content });
//   return (
//     <div className="mb-3 d-flex" style={{ justifyContent: isAdmin ? "flex-end" : "flex-start" }}>
//       <div
//         style={{
//           maxWidth: "60%",
//           padding: "10px 15px",
//           borderRadius: "15px",
//           background: isAdmin ? "#870000" : "#e9ecef",
//           color: isAdmin ? "#fff" : "#000",
//         }}
//       >
//         {content && <div>{content}</div>}
//         {file && (
//           <img
//             src={`http://18.204.175.233:3001/${file}`}
//             alt=""
//             style={{ maxWidth: "100%", borderRadius: "10px", marginTop: "5px" }}
//           />
//         )}
//         <small style={{ fontSize: "11px", opacity: 0.6, display: "block", textAlign: isAdmin ? "right" : "left" }}>
//           {new Date(createdAt).toLocaleTimeString()}
//         </small>
//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from "react";

export default function MessageBubble({ senderType, content, createdAt, type }) {
  const isAdmin = senderType === "admin";
  const [imgSrc, setImgSrc] = useState(null);

  useEffect(() => {
    if (type === "image" && content) {
      setImgSrc(`http://18.204.175.233:3001/${content}`);
    } else {
      setImgSrc(null);
    }
  }, [type, content]);

  return (
    <div
      className="mb-3 d-flex"
      style={{ justifyContent: isAdmin ? "flex-end" : "flex-start" }}
    >
      <div
        style={{
          maxWidth: "60%",
          padding: "10px 15px",
          borderRadius: "15px",
          background: isAdmin ? "#870000" : "#e9ecef",
          color: isAdmin ? "#fff" : "#000",
        }}
      >
        {/* Render text content if it exists */}
        {content && type === "text" && <div>{content}</div>}

        {/* Render image if type is image */}
        {imgSrc && <img src={imgSrc} alt="chat-image" style={{ maxWidth: "100%", borderRadius: "10px", marginTop: "5px" }} />}

        <small
          style={{
            fontSize: "11px",
            opacity: 0.6,
            display: "block",
            textAlign: isAdmin ? "right" : "left",
          }}
        >
          {new Date(createdAt).toLocaleTimeString()}
        </small>
      </div>
    </div>
  );
}
