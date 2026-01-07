// import { useState } from "react";
// import Layout from "../../Components/Layout";
// // import MediaCard from "../../Components/MediaCard";


// // const ProductCard = ({ item, onDelete }) => {
// //   return (
// //     <div className="card shadow-sm mx-2 mb-4" style={{ width: "350px" }}>
      
// //       <img
// //         src={item.image}
// //         className="card-img-top"
// //         style={{ height: "220px", objectFit: "cover", borderRadius: "8px" }}
// //       />

// //       <div className="card-body">

// //         {/* Publish Date */}
// //         <p className="text-muted mb-1">{item.publishDate}</p>

// //         {/* Book Name + Price (Amazon style) */}
// //         <div className="d-flex justify-content-between align-items-center">
// //           <h5 className="fw-bold mb-1">{item.bookName}</h5>

// //           {/* Amazon style price */}
// //           <span className="fw-bold" style={{ fontSize: "18px" }}>
// //             ${item.price}
// //           </span>
// //         </div>

// //         {/* Author */}
// //         <p className="text-muted mb-2" style={{ fontSize: "15px" }}>
// //           by {item.author}
// //         </p>

// //         {/* About The Book */}
// //         <h6 className="fw-bold mt-3 mb-2">About The Book</h6>
// //         <p className="text-muted" style={{ fontSize: "14px" }}>
// //           {item.description}
// //         </p>

// //         <button className="btn btn-sm btn-danger mt-2" onClick={onDelete}>
// //           Delete
// //         </button>
// //       </div>
// //     </div>
// //   );
// // };
// const ProductCard = ({ item, onDelete }) => {
//   return (
//     <div className="card shadow-sm mx-2 mb-4" style={{ width: "350px" }}>
      
//       <img
//         src={item.image}
//         className="card-img-top"
//         style={{ height: "220px", objectFit: "cover", borderRadius: "8px" }}
//       />

//       <div className="card-body">

//         {/* Publish Date */}
//         <p className="text-muted mb-1">{item.publishDate}</p>

//         {/* Book Name + Price (Amazon style) */}
//         <div className="d-flex justify-content-between align-items-center">
//           <h5 className="fw-bold mb-1">{item.bookName}</h5>

//           {/* Amazon style price */}
//           <span className="fw-bold" style={{ fontSize: "18px" }}>
//             ${item.price}
//           </span>
//         </div>

//         {/* Author */}
//         <p className="text-muted mb-2" style={{ fontSize: "15px" }}>
//           by {item.author}
//         </p>

//         {/* About The Book */}
//         <h6 className="fw-bold mt-3 mb-2">About The Book</h6>
//         <p className="text-muted description-clamp" style={{ fontSize: "14px" }}>
//           {item.description}
//         </p>

//         {/* <button className="btn btn-sm btn-danger mt-2" onClick={onDelete}>
//           Delete
//         </button> */}
//         <div className="d-flex gap-2 mt-3">
//           {/* Edit Button */}
//           <button
//             className="btn btn-sm btn-outline-primary"
//             onClick={() => console.log("Edit clicked")}
//           >
//             <i className="bi bi-pencil-square"></i>
//           </button>

//           {/* Delete Button */}
//           <button
//             className="btn btn-sm btn-outline-danger"
//             onClick={onDelete}
//           >
//             <i className="bi bi-trash"></i>
//           </button>
//         </div>

//       </div>
//     </div>
//   );
// };




// const Product = () => {
//   const [form, setForm] = useState({
//   publishDate: "",
//   bookName: "",
//   author: "",
//   price: "", 
//   description: "",
//   image: null,
  
// });


//   const [ProductList, setProductList] = useState([]);

//   const handleAdd = () => {
//     if (!form.image) {
//       alert("Please upload an Image!");
//       return;
//     }

//     const imageURL = URL.createObjectURL(form.image);

//       setProductList((prev) => [
//     ...prev,
//     {
//       publishDate: form.publishDate,
//       bookName: form.bookName,
//       author: form.author,
//       price: form.price, 
//       description: form.description,
//       image: imageURL,
      
//     },
//   ]);

//     // Reset form
//     setForm({
//     publishDate: "",
//     bookName: "",
//     author: "",
//     description: "",
//     image: null,
//     price: "",
//   });

//     // Close modal
//     window.bootstrap.Modal.getInstance(
//       document.getElementById("mediaModal")
//     ).hide();
//   };

//   return (
//     <Layout>
//       <div className="container-fluid py-3 px-4" style={{ background: "rgb(247, 248, 250)" }}>
//         <h1 className="fs-3 pb-3">Product</h1>

//         {/* ADD BUTTON */}
//         <button
//           className="btn text-white mb-4"
//           data-bs-toggle="modal"
//           data-bs-target="#mediaModal"
//           style={{ background: "#F55227"}}
//         >
//           Add Product +
//         </button>

//         {/* MODAL */}
//         <div
//           className="modal fade"
//           id="mediaModal"
//           tabIndex="-1"
//           aria-hidden="true"
//         >
//           <div className="modal-dialog modal-lg">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h5 className="modal-title">Product Form</h5>
//                 <button
//                   type="button"
//                   className="btn-close"
//                   data-bs-dismiss="modal"
//                 ></button>
//               </div>

              
//               <div className="modal-body">
//               <div className="row">
//               <div className="col-md-6 mb-3">
//                 <label className="form-label">Publish Date</label>
//                 <input
//                   type="date"
//                   className="form-control"
//                   value={form.publishDate}
//                   onChange={(e) => setForm({ ...form, publishDate: e.target.value })}
//                 />
//               </div>
              

//               <div className="col-md-6 mb-3">
//                 <label className="form-label">Book Name</label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   value={form.bookName}
//                   onChange={(e) => setForm({ ...form, bookName: e.target.value })}
//                 />
//               </div>
//               <div className="col-md-6 mb-3">
//                 <label className="form-label">Price</label>
//                 <input
//                   type="number"
//                   className="form-control"
//                   value={form.price}
//                   onChange={(e) => setForm({ ...form, price: e.target.value })}
//                   placeholder="Enter price"
//                 />
//               </div>

//               <div className="col-md-12 mb-3">
//                 <label className="form-label">Author Name</label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   value={form.author}
//                   onChange={(e) => setForm({ ...form, author: e.target.value })}
//                 />
//               </div>

//               <div className="col-md-12 mb-3">
//                 <label className="form-label">About The Book</label>
//                 <textarea
//                   className="form-control"
//                   rows="4"
//                   value={form.description}
//                   onChange={(e) => setForm({ ...form, description: e.target.value })}
//                 ></textarea>
//               </div>

//               <div className="col-md-12 mb-3">
//                 <label className="form-label">Book Cover Image</label>
//                 <input
//                   type="file"
//                   accept="image/*"
//                   className="form-control"
//                   onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
//                 />
//               </div>

//             </div>
//               </div>


//               <div className="modal-footer">
//                 <button className="btn btn-success" onClick={handleAdd}>
//                   Save
//                 </button>
//                 <button
//                   className="btn btn-secondary"
//                   data-bs-dismiss="modal"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* MEDIA CARDS */}
//         <div className="d-flex flex-wrap">
//           {ProductList.map((item, index) => (
//             <ProductCard
//               key={index}
//               item={item}
//               onDelete={() =>
//                 setProductList(ProductList.filter((_, i) => i !== index))
//               }
//             />
//           ))}
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default Home;



import React, { useState } from "react";
import Layout from "../../Components/Layout";

const SelfLoveTable = () => {
  const totalUsers = 125;
  const activeUsers = 75;
  const nonActiveUsers = 50;
  // const pendingOrders = 40;



  const [rows] = useState([
    {
      id: 1,
      name: "Lindsey Curtis",
      image: "/src/assets/avatar1.png",
      gender: "Female",
      email: "lindsey@gmail.com",
      status: "Active",
      country: "USA",
      city: "New York",
      postalCode: "10001",
      relationshipStatus: "Married",
      selfLoveBase: "Chosen-Ness",
    },
    {
      id: 2,
      name: "Michael Gough",
      image: "/src/assets/avatar2.png",
      gender: "Male",
      email: "michael@gmail.com",
      status: "Non-Active",
      country: "UK",
      city: "London",
      postalCode: "SW1A",
      relationshipStatus: "Un-Married",
      selfLoveBase: "Chosen-Ness",
    },
    {
      id: 3,
      name: "Gowrk Gough",
      image: "/src/assets/profile.png",
      gender: "Male",
      email: "gowrk@gmail.com",
      status: "Non-Active",
      country: "UK",
      city: "London",
      postalCode: "SW1A",
      relationshipStatus: "Un-Married",
      selfLoveBase: "Chosen-Ness",
    },
    {
      id: 3,
      name: "Shelly tim",
      image: "/src/assets/avatar3.png",
      gender: "Female",
      email: "shally@gmail.com",
      status: "Active",
      country: "UK",
      city: "London",
      postalCode: "SW1A",
      relationshipStatus: "Un-Married",
      selfLoveBase: "Chosen-Ness",
    },{
      id: 5,
      name: "Robert Smith",
      image: "/src/assets/profile.png",
      gender: "Male",
      email: "robert@gmail.com",
      status: "Active",
      country: "UK",
      city: "London",
      postalCode: "SW1A",
      relationshipStatus: "Un-Married",
      selfLoveBase: "Chosen-Ness",
    },
  ]);

  


  const [selectedUser, setSelectedUser] = useState(null);

  

  return (
    <Layout>
      <div className="container-fluid py-2 px-4" style={{ background: "#F7F8FA" }}>
        <h1 className="fs-3 pb-3">Users</h1>

        <div className="row gx-3">
          <div className="col-md-3">
            <div className="card shadow-sm mb-4">
              <div className="card-body text-center">
                <h2 className="mb-2">{totalUsers}</h2>
                <p className="mb-3 text-muted">Total Users</p>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card shadow-sm mb-4">
              <div className="card-body text-center">
                <h2 className="mb-2">{activeUsers}</h2>
                <p className="mb-3 text-muted">Active Users</p>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card shadow-sm mb-4">
              <div className="card-body text-center">
                <h2 className="mb-2">{nonActiveUsers}</h2>
                <p className="mb-3 text-muted">Non-Active Users</p>
              </div>
            </div>
          </div>

          {/* <div className="col-md-3">
            <div className="card shadow-sm mb-4">
              <div className="card-body text-center">
                <h2 className="mb-2">{pendingOrders}</h2>
                <p className="mb-3 text-muted">Pending Orders</p>
              </div>
            </div>
          </div> */}
        </div>
      </div>


      <table className="table table-bordered align-middle mt-3">
        <thead className="table-light">
          <tr>
            <th>User</th>
            <th>Gender</th>
            <th>Email</th>
            <th className="text-center">Status</th>
          </tr>
        </thead>

        <tbody>
          {rows.map((item) => (
            <tr
              key={item.id}
              style={{ cursor: "pointer" }}
              onClick={() => setSelectedUser(item)}
            >
              <td>
                <div className="d-flex align-items-center gap-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    width="40"
                    height="40"
                    className="rounded-circle"
                  />
                  <strong>{item.name}</strong>
                </div>
              </td>

              <td>{item.gender}</td>
              <td>{item.email}</td>

              <td className="text-center">
                <span
                  className={`badge ${
                    item.status === "Active"
                      ? "bg-success"
                      : "bg-secondary"
                  }`}
                >
                  {item.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* MODAL */}
      {selectedUser && (
        <>
          <div className="modal fade show d-block" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">User Details</h5>
                  <button
                    className="btn-close"
                    onClick={() => setSelectedUser(null)}
                  ></button>
                </div>

                <div className="modal-body">
                  <div className="text-center mb-3">
                    <img
                      src={selectedUser.image}
                      width="80"
                      height="80"
                      className="rounded-circle mb-2"
                    />
                    <h5>{selectedUser.name}</h5>
                    <p className="text-muted">{selectedUser.email}</p>
                  </div>

                  <hr />

                  <div className="row">
                    <div className="col-md-6 mb-2">
                      <strong>Gender:</strong> {selectedUser.gender}
                    </div>

                    <div className="col-md-6 mb-2">
                      <strong>Status:</strong>{" "}
                      <span
                        className={`badge ${
                          selectedUser.status === "Active"
                            ? "bg-success"
                            : "bg-secondary"
                        }`}
                      >
                        {selectedUser.status}
                      </span>
                    </div>

                    <div className="col-md-6 mb-2">
                      <strong>Country:</strong> {selectedUser.country}
                    </div>

                    <div className="col-md-6 mb-2">
                      <strong>City:</strong> {selectedUser.city}
                    </div>

                    <div className="col-md-6 mb-2">
                      <strong>Postal Code:</strong>{" "}
                      {selectedUser.postalCode}
                    </div>

                    <div className="col-md-6 mb-2">
                      <strong>Relationship:</strong>{" "}
                      {selectedUser.relationshipStatus}
                    </div>

                    <div className="col-12 mt-2">
                      <strong>New Self Love Home Base:</strong>
                      <span className="badge bg-primary ms-2">
                        {selectedUser.selfLoveBase}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="modal-footer">
                  <button
                    className="btn btn-secondary"
                    onClick={() => setSelectedUser(null)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="modal-backdrop fade show"></div>
        </>
      )}
    </Layout>
  );
};

export default SelfLoveTable;

