// import React from "react";

// const SubAdminTable = ({ data, onEdit, onDelete }) => {
//   return (
//     <table className="table table-bordered table-hover mt-3">
//       <thead className="table-light">
//         <tr>
//           <th>Name</th>
//           <th>Role</th>
//           <th>Region</th>
//           <th>City</th>
//           <th>Email</th>
//           <th>Password</th>
//           <th className="text-center">Actions</th>
//         </tr>
//       </thead>
//       <tbody>
//         {data.map((item) => (
//           <tr key={item.id}>
//             <td>{item.name}</td>
//             <td>{item.role}</td>
//             <td>{item.region}</td>
//             <td>{item.city}</td>
//             <td>{item.email}</td>
//             <td>{item.password}</td>
//             <td className="text-center">
//               <button className="btn btn-sm btn-outline-primary me-2" onClick={() => onEdit(item)}>
//                 ✏️
//               </button>
//               <button className="btn btn-sm btn-outline-danger" onClick={() => onDelete(item.id)}>
//                 🗑️
//               </button>
//             </td>
//           </tr>
//         ))}
//         {data.length === 0 && (
//           <tr>
//             <td colSpan="6" className="text-center text-muted">
//               No Sub-Admins Found
//             </td>
//           </tr>
//         )}
//       </tbody>
//     </table>
//   );
// };

// export default SubAdminTable;
