// import MainCardContainer from "./MainContainerCard";
// import EmotionFieldCard from "./EmotionFieldCard";
// import React, { useState } from "react";


// export default function EmotionPageContent  ({ emotionSlug })  {
//     // Slug se Clean Title banana (e.g., 'rejection' se 'Rejection')
//     const displayEmotion = emotionSlug
//         .replace(/-/g, ' ')
//         .split(' ')
//         .map(word => word.charAt(0).toUpperCase() + word.slice(1))
//         .join(' ');

//     // State for input fields
//     const [oldValue, setOldValue] = useState("");
//     const [newValue, setNewValue] = useState("");
    
//     // Save function for UI demo
//     const handleSave = () => {
//       console.log(`Saving changes for: ${displayEmotion}`);
      
//       const saveMessage = document.getElementById('save-message');
//       if (saveMessage) {
//           saveMessage.innerHTML = `<strong>Success!</strong> Changes for ${displayEmotion} saved (UI Demo).`;
//           saveMessage.classList.remove('d-none', 'alert-danger');
//           saveMessage.classList.add('show', 'alert-success');
//           setTimeout(() => {
//               saveMessage.classList.remove('show');
//               saveMessage.classList.add('d-none');
//           }, 3000);
//       }
//     };

//     return (
//         <>
//             {/* --- Main Page Title (Dynamic) --- */}
//             <h1 className="display-5 fw-bold text-dark mt-3">{displayEmotion} Reconciliation</h1>
//             {/* <p className="text-muted mb-4">Customize your emotional reconciliation script for {displayEmotion}.</p> */}
            
//             {/* --- RESTRUCTURED CARD COMPONENT (Title is Dynamic) --- */}
//             <MainCardContainer
//               title={`${displayEmotion} Reconciliation Customization`}
//               onSave={handleSave}
//             >
//               {/* Old Self Love Field Card */}
//               <div className="col-12 col-lg-6">
//                 <EmotionFieldCard
//                   title="Old Self Love"
//                   value={oldValue}
//                   onChange={(e) => setOldValue(e.target.value)}
//                   placeholder="Describe how this emotion was experienced before. What were the old patterns or limiting beliefs associated with it?"
//                 />
//               </div>

//               {/* New Self Love Field Card */}
//               <div className="col-12 col-lg-6">
//                 <EmotionFieldCard
//                   title="New Self Love"
//                   value={newValue}
//                   onChange={(e) => setNewValue(e.target.value)}
//                   placeholder="Describe the new empowered belief, mindset, or behavior you choose to adopt for this emotion."
//                 />
//               </div>
//             </MainCardContainer>
//         </>
//     );
// }
