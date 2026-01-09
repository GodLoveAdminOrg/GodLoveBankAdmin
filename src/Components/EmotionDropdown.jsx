// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Button from "./Button";

// const EmotionDropdown = () => {
//   const [open, setOpen] = useState(false);
//   const navigate = useNavigate();

//   const handleSelect = (emotion) => {
//     setOpen(false);
//     navigate(`/emotion/${emotion}`);
//   };

//   return (
//     <div className="position-relative d-inline-block">
//       <Button variant="variant" onClick={() => setOpen(!open)}>
//         Create Group
//       </Button>

//       {open && (
//         <ul
//           className="dropdown-menu show"
//           style={{
//             position: "absolute",
//             top: "100%",
//             left: 0,
//             zIndex: 1000,
//           }}
//         >
//           {["rejection", "abandonment", "worthlessness", "chosen-ness"].map(
//             (emotion) => (
//               <li key={emotion}>
//                 <button
//                   className="dropdown-item"
//                   onClick={() => handleSelect(emotion)}
//                 >
//                   {emotion.charAt(0).toUpperCase() + emotion.slice(1)}
//                 </button>
//               </li>
//             )
//           )}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default EmotionDropdown;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";

const EmotionDropdown = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleSelect = (emotion) => {
    setOpen(false);
    navigate(`/emotion/${emotion}`);
  };

  return (
    <div className="position-relative d-inline-block">
      {/* <Button variant="primary" onClick={() => setOpen(!open)}>
        Create Group +  
      </Button> */}

      {open && (
        <ul
          className="dropdown-menu show"
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            zIndex: 1000,
          }}
        >
          {["rejection", "abandonment", "worthlessness", "abuse"].map(
            (emotion) => (
              <li key={emotion}>
                <button
                  className="dropdown-item"
                  onClick={() => handleSelect(emotion)}
                >
                  {emotion.charAt(0).toUpperCase() + emotion.slice(1)}
                </button>
              </li>
            )
          )}
        </ul>
      )}
    </div>
  );
};

export default EmotionDropdown;
