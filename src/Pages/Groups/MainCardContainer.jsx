
// const SaveIcon = ({ className = "me-2" }) => (
//   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
//     <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
//     <polyline points="17 21 17 13 7 13 7 21"></polyline>
//     <polyline points="7 3 7 8 15 8"></polyline>
//   </svg>
// );
// export default function MainCardContainer({ title, children, onSave })  {
//   return (
//   <div className="card shadow-lg border-0 mt-5 mb-4">
//     <div className="card-body p-4 p-md-5">
      
//       {/* Header with Title and Save Button */}
//       <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4 border-bottom pb-3">
//         <h2 className="h4 card-title text-dark fw-bold mb-3 mb-md-0">{title}</h2>
//         <button
//           onClick={onSave}
//           className="btn btn-danger d-flex align-items-center px-4 py-2 fw-semibold shadow-sm w-100 w-md-auto justify-content-center"
//         >
//           <SaveIcon />
//           <span>Save Changes</span>
//         </button>
//       </div>

//       {/* Content Area: Old Self Love and New Self Love Cards Side-by-Side */}
//       <div className="row g-4">
//         {children}
//       </div>
//     </div>
//   </div>
// );
// }
