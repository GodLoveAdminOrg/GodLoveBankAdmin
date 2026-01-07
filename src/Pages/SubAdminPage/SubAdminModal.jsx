// import React, { useEffect, useState } from "react";

// const SubAdminModal = ({ show, onClose, editData, onSave }) => {
//   const [form, setForm] = useState({
//     name: "",
//     role: "",
//     region: "",
//     city: "",
//     email: "",
//     password: "",
//   });

//   useEffect(() => {
//     if (editData) setForm(editData);
//     else
//       setForm({
//         name: "",
//         role: "",
//         region: "",
//         city: "",
//         email: "",
//         password: "",
//       });
//   }, [editData]);

//   if (!show) return null;

//   const handleChange = (e) =>
//     setForm({ ...form, [e.target.name]: e.target.value });

//   return (
//     <div className="modal show fade d-block">
//       <div className="modal-dialog modal-lg">
//         <div className="modal-content">
//           <div className="modal-header">
//             <h5>{editData ? "Edit Sub-Admin" : "Create Sub-Admin"}</h5>
//             <button className="btn-close" onClick={onClose}></button>
//           </div>

//           <div className="modal-body">
//             <div className="row g-3">
//               {["name", "region", "city", "email", "password"].map((field) => (
//                 <div className="col-md-6" key={field}>
//                   <input
//                     className="form-control"
//                     placeholder={field}
//                     name={field}
//                     value={form[field]}
//                     onChange={handleChange}
//                   />
//                 </div>
//               ))}
//               <div className="col-md-6">
//                 <select
//                   className="form-select"
//                   name="role"
//                   value={form.role}
//                   onChange={handleChange}
//                 >
//                   <option value="">Select Role</option>
//                   <option value="Sub-Admin">Sub-Admin</option>
//                   <option value="Console">Console</option>
//                 </select>
//               </div>
//             </div>
//           </div>

//           <div className="modal-footer">
//             <button className="btn btn-secondary" onClick={onClose}>
//               Cancel
//             </button>
//             <button className="btn btn-danger" onClick={() => onSave(form)}>
//               Save
//             </button>
//           </div>
//         </div>
//       </div>
//       <div className="modal-backdrop fade show"></div>
//     </div>
//   );
// };

// export default SubAdminModal;

import React, { useEffect, useState } from "react";

const SubAdminModal = ({ show, onClose, editData, onSave }) => {
  const [form, setForm] = useState({
    name: "",
    role: "",
    region: "",
    city: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (editData) setForm(editData);
    else
      setForm({
        name: "",
        role: "",
        region: "",
        city: "",
        email: "",
        password: "",
      });
  }, [editData]);

  if (!show) return null;

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <div
      className="modal show d-block"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5>{editData ? "Edit Sub-Admin" : "Create Sub-Admin"}</h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>

          <div className="modal-body">
            <div className="row g-3">
              {["name", "region", "city", "email", "password"].map((field) => (
                <div className="col-md-6" key={field}>
                  <input
                    className="form-control"
                    placeholder={field}
                    name={field}
                    value={form[field]}
                    onChange={handleChange}
                  />
                </div>
              ))}

              <div className="col-md-6">
                <select
                  className="form-select"
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                >
                  <option value="">Select Role</option>
                  <option value="Sub-Admin">Sub-Admin</option>
                  <option value="Console">Console</option>
                </select>
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button className="btn btn-danger" onClick={() => onSave(form)}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubAdminModal;
