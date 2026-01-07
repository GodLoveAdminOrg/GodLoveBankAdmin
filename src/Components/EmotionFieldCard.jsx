// const PencilIcon = ({ className = "w-4 h-4" }) => (
//   <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
//     <path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
//   </svg>
// );
// // Trash (Delete) Icon ke liye SVG code
// const Trash2Icon = ({ className = "w-4 h-4" }) => (
//   <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
//     <path d="M3 6h18"></path>
//     <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
//     <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
//     <line x1="10" y1="11" x2="10" y2="17"></line>
//     <line x1="14" y1="11" x2="14" y2="17"></line>
//   </svg>
// );

// export default function EmotionFieldCard  ({ title, value, onChange, placeholder })  {(
//   <div className="card shadow-sm border-0 h-100"> 
//     <div className="card-body p-4 bg-light rounded-3">
//       <div className="d-flex justify-content-between align-items-center mb-3">
//         <h3 className="h5 card-title text-dark">{title}</h3>
//         <div className="d-flex align-items-center text-muted">
//           <PencilIcon className="me-3 cursor-pointer text-primary" />
//           <Trash2Icon className="cursor-pointer text-danger" />
//         </div>
//       </div>
//       <textarea
//         className="form-control"
//         rows="4"
//         placeholder={placeholder}
//         value={value}
//         onChange={onChange}
//       />
//     </div>
//   </div>
// );
// }
