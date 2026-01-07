import { useState } from "react";
import Layout from "../../Components/Layout";
import { useEffect } from "react";
import { getProductCategories } from "../../Services/productApi";
import {getAdminProducts} from "../../Services/productApi";
import fallback from "../../assets/fallback.png";
import { createAdminProduct } from "../../Services/productApi";
import { updateAdminProduct } from "../../Services/productApi";
import { toast } from "react-toastify";
import { deleteProductVideo } from "../../Services/productApi";


const ProductCard = ({ item, onDelete, onEdit, deletingId }) => {
    const isDeleting = deletingId === item.id;

  return (
    <div className="card shadow-sm mx-2 mb-4" style={{ width: "350px" }}>
      
      <img
        src={item.image? `http://18.204.175.233:3001/${item.image}`: fallback}
        className="card-img-top"
        style={{ height: "220px", objectFit: "cover", borderRadius: "8px" }}
        alt={item.name}
      />

      <div className="card-body">

        {/* Publish Date */}
        <p className="text-muted mb-1">{item.publishedDate}</p>

        {/* Book Name + Price */}
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="fw-bold mb-1">{item.name}</h5>

          <span className="fw-bold text-success" style={{ fontSize: "18px" }}>
            ${item.price}
          </span>
        </div>

        {/* Author */}
        <p className="text-muted mb-2" style={{ fontSize: "15px" }}>
          by {item.author}
        </p>

        {/* Description */}
        <h6 className="fw-bold mt-3 mb-2">About The Book</h6>
        <p className="text-muted description-clamp" style={{ fontSize: "14px" }}>
          {item.description}
        </p>

        <div className="d-flex gap-2 mt-3">
          <button
            className="btn btn-sm btn-outline-primary"
            onClick={() => onEdit(item)}
          >
            <i className="bi bi-pencil-square"></i>
          </button>

          {/* DELETE */}
          <button
            type="button"
            disabled={isDeleting}
            className="btn btn-sm bg-danger text-white"
            onClick={() => onDelete(item.id)}
          >
            {isDeleting ? (
              <>
                <span className="spinner-border spinner-border-sm me-2"></span>
                Deleting...
              </>
            ) : (
              <i className="bi bi-trash me-1"></i>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};





const Product = () => {
  const [form, setForm] = useState({
  publishedDate: "",
  name: "",
  author: "",
  price: "", 
  description: "",
  categoryId: "",
  image: null,
  inventory: "",
  
});


  const [productList, setProductList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const fetchProducts = async () => {
  try {
    const res = await getAdminProducts();
    console.log("PRODUCT API RESPONSE:", res.data);

    // backend response pattern same hai
    setProductList(res.data.data);
  } catch (error) {
    console.error("PRODUCT FETCH ERROR:", error);
  }
};


  const fetchCategories = async () => {
  try {
    const res = await getProductCategories();
    console.log("PRODUCT CATEGORIES:", res.data);
    setCategories(res.data.data);
  } catch (error) {
    console.error("CATEGORY ERROR:", error);
  }
};

useEffect(() => {
  fetchCategories();
  fetchProducts();
}, []);
  

  
  const handleAdd = async () => {
  // ✅ category required
  if (!form.categoryId) {
    toast.error("Please select a category");
    return;
  }

  // ✅ image required
  if (!form.image) {
    toast.error("Please upload product image");
    return;
  }

  setIsLoading(true);

  try {
    const formData = new FormData();

    formData.append("publishedDate", form.publishedDate);
    formData.append("name", form.name);
    formData.append("author", form.author);
    formData.append("price", form.price);
    formData.append("description", form.description);
    formData.append("categoryId", form.categoryId); // 🔴 IMPORTANT
    formData.append("image", form.image);
    FormData.append("inventory", form.inventory);

    // 🔴 STEP 1: Create product
    await createAdminProduct(formData);

    // 🔴 STEP 2: Fetch fresh products
    await fetchProducts();

    toast.success("Product added successfully");

    // 🔄 reset form
    setForm({
      publishedDate: "",
      name: "",
      author: "",
      price: "",
      description: "",
      categoryId: null,
      image: null,
    });

    setIsModalOpen(false); // close modal

  } catch (error) {
    console.error("CREATE PRODUCT ERROR:", error);
    toast.error("Product creation failed");
  } finally {
    setIsLoading(false);
  }
};

// UPDATE HANDLER
  const handleUpdate = async () => {
    if (!form.categoryId) {
      toast.error("Please select a category");
      setIsLoading(false);
      return;
    }

    if (!editItem) return;

    setIsUpdating(true);

    try {
      const formData = new FormData();

      formData.append("publishedDate", form.publishedDate);
      formData.append("name", form.name);
      formData.append("author", form.author);
      formData.append("price", form.price);
      formData.append("description", form.description);
      formData.append("categoryId", form.categoryId);
      formData.append("inventory", form.inventory);

      

      // image optional
      if (form.image) {
        formData.append("image", form.image);
      }

      await updateAdminProduct(editItem.id, formData);

      toast.success("Product updated successfully");
      fetchProducts();

      // reset
      setEditItem(null);
      setForm({
        publishedDate: "",
        name: "",
        author: "",
        price: "",
        description: "",
        inventory: "",
        categoryId: null,
        status: 1,
        image: null,
      });
      setIsModalOpen(false); // close modal

    } catch (error) {
      console.error("UPDATE ERROR:", error);
      toast.error("Update failed");
    } finally {
      setIsUpdating(false);
    }
  };


    const handleDelete = async (id) => {
        console.log("Deleting Product id:", id);
        console.log("Type of id:", typeof id);
    
    
        if (!window.confirm("Delete this Product?")) return;
    
        //  Optimistic UI (instant remove)
        const previousList = productList;
        setProductList((prev) => prev.filter((v) => v.id !== id));
        setDeletingId(id);
    
        try {
          await deleteProductVideo(id);
          fetchProducts(); // refresh list
          toast.success("Video deleted successfully");
        } catch (error) {
          set(previousList); // revert back
          toast.error("Failed to delete Product");
          console.error("DELETE ERROR FULL:", error.response?.data);
          console.error("STATUS:", error.response?.status);
        } finally {
          setDeletingId(null);
        }
      };


  return (
    <Layout>
      <div className="container-fluid py-3 px-4" style={{ background: "rgb(247, 248, 250)" }}>
        <h1 className="fs-3 pb-3">Product</h1>

        {/* ADD BUTTON */}
        {/* <button
          className="btn text-white mb-4"
          data-bs-toggle="modal"
          data-bs-target="#mediaModal"
          style={{ background: "#F55227"}}
        >
          Add Product +
        </button> */}
        <button
  className="btn text-white mb-4"
  style={{ background: "#F55227" }}
  onClick={() => {
    setEditItem(null);
    setForm({
      publishedDate: "",
      name: "",
      author: "",
      price: "",
      description: "",
      categoryId: null,
      image: null,
    });
    setIsModalOpen(true);
  }}
>
  Add Product +
</button>


        {/* MODAL */}
        <div
          className="modal fade"
          id="mediaModal"
          tabIndex="-1"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Product Form</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                ></button>
              </div>

              
              <div className="modal-body">
              <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Publish Date</label>
                <input
                  type="date"
                  className="form-control"
                  value={form.publishedDate}
                  onChange={(e) => setForm({ ...form, publishedDate: e.target.value })}
                />
              </div>
              

              <div className="col-md-6 mb-3">
                <label className="form-label">Book Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Price</label>
                <input
                  type="number"
                  className="form-control"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                  placeholder="Enter price"
                />
              </div>
              {/* Category */}
              <div className="col-md-6 mb-3">

                      {/* Category Upload */}
                      <label className="form-label">Category</label>
                      <select
                        className="form-select"
                        value={form.categoryId ?? ""}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            categoryId: Number(e.target.value), // 🔴 ID form me ja rahi hai
                          })
                        }
                      >
                        <option value="">Select Category</option>

                        {categories
                          .filter((cat) => cat.status === 1)
                          .map((cat) => (
                            <option key={cat.id} value={cat.id}>
                              {cat.name}
                            </option>
                          ))}
                      </select>
                    </div>

                {/* Author */}
              <div className="col-md-6 mb-3">
                <label className="form-label">Author Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={form.author}
                  onChange={(e) => setForm({ ...form, author: e.target.value })}
                />
              </div>
              {/* Inventory */}
              <div className="col-md-6 mb-3">
                <label className="form-label">Inventory</label>
                <input
                  type="number"
                  className="form-control"
                  value={form.inventory}
                  onChange={(e) => setForm({ ...form, inventory: e.target.value })}
                />
              </div>

              <div className="col-md-12 mb-3">
                <label className="form-label">About The Book</label>
                <textarea
                  className="form-control"
                  rows="4"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                ></textarea>
              </div>

              <div className="col-md-12 mb-3">
                <label className="form-label">Book Cover Image</label>
                <input
                  type="file"
                  accept="image/*"
                  className="form-control"
                  onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
                />
              </div>

            </div>
              </div>


              <div className="modal-footer">
                  <button
                    className="btn btn-success"
                    onClick={editItem ? handleUpdate : handleAdd}
                    disabled={isLoading || isUpdating}
                  >
                    {isUpdating ? "Updating..." : editItem ? "Update" : "Save"}
                  </button>
                  <button
                    className="btn btn-secondary"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Cancel
                  </button>
                </div>
            </div>
          </div>
        </div>

        {/* PRODUCT MODAL */}
{isModalOpen && (
  <div className="modal fade show d-block" tabIndex="-1">
    <div className="modal-dialog modal-lg">
      <div className="modal-content">

        {/* HEADER */}
        <div className="modal-header">
          <h5 className="modal-title">
            {editItem ? "Edit Product" : "Add Product"}
          </h5>
          <button
            type="button"
            className="btn-close"
            onClick={() => {
              setIsModalOpen(false);
              setEditItem(null);
            }}
          ></button>
        </div>

        {/* BODY */}
        <div className="modal-body">
          <div className="row">

            {/* Publish Date */}
            <div className="col-md-6 mb-3">
              <label className="form-label">Publish Date</label>
              <input
                type="date"
                className="form-control"
                value={form.publishedDate}
                onChange={(e) =>
                  setForm({ ...form, publishedDate: e.target.value })
                }
              />
            </div>

            {/* Product Name */}
            <div className="col-md-6 mb-3">
              <label className="form-label">Product Name</label>
              <input
                type="text"
                className="form-control"
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
              />
            </div>

            {/* Price */}
            <div className="col-md-6 mb-3">
              <label className="form-label">Price</label>
              <input
                type="number"
                className="form-control"
                value={form.price}
                onChange={(e) =>
                  setForm({ ...form, price: e.target.value })
                }
              />
            </div>

            {/* Category */}
            <div className="col-md-6 mb-3">
              <label className="form-label">Category</label>
              <select
                className="form-select"
                value={form.categoryId ?? ""}
                onChange={(e) =>
                  setForm({
                    ...form,
                    categoryId: Number(e.target.value),
                  })
                }
              >
                <option value="">Select Category</option>
                {categories
                  .filter((cat) => cat.status === 1)
                  .map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
              </select>
            </div>

            {/* Author */}
            <div className="col-md-6 mb-3">
              <label className="form-label">Author</label>
              <input
                type="text"
                className="form-control"
                value={form.author}
                onChange={(e) =>
                  setForm({ ...form, author: e.target.value })
                }
              />
            </div>
            {/* Inventory */}
            <div className="col-md-6 mb-3">
              <label className="form-label">Inventory</label>
              <input
                type="number"
                className="form-control"
                value={form.inventory}
                onChange={(e) => setForm({ ...form, inventory: e.target.value })}
              />
            </div>

            {/* Description */}
            <div className="col-md-12 mb-3">
              <label className="form-label">Description</label>
              <textarea
                className="form-control"
                rows="4"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              />
            </div>

            {/* Image */}
            <div className="col-md-12 mb-3">
              <label className="form-label">
                Product Image {editItem && "(Optional)"}
              </label>
              <input
                type="file"
                accept="image/*"
                className="form-control"
                onChange={(e) =>
                  setForm({ ...form, image: e.target.files[0] })
                }
              />
            </div>

          </div>
        </div>

        {/* FOOTER */}
        <div className="modal-footer">
          <button
            className="btn btn-success"
            onClick={editItem ? handleUpdate : handleAdd}
            disabled={isLoading || isUpdating}
          >
            {isUpdating
              ? "Updating..."
              : editItem
              ? "Update"
              : "Save"}
          </button>

          <button
            className="btn btn-secondary"
            onClick={() => {
              setIsModalOpen(false);
              setEditItem(null);
            }}
          >
            Cancel
          </button>
        </div>

      </div>
    </div>
  </div>
)}


        
        {/* PRODUCT CARDS */}
<div className="d-flex flex-wrap">
  {Array.isArray(productList) &&
    productList.map((item) => (
      <ProductCard
        key={item.id}
        item={item}
        onDelete={handleDelete}
        onEdit={(item) => {
          setEditItem(item);
          setForm({
            name: item.name || "",
            author: item.author || "",
            publishedDate: item.publishedDate || "",
            categoryId: item.categoryId,
            price: item.price || "",
            description: item.description || "",
            image: null, // re-upload optional
          });
          setIsModalOpen(true); // modal open
        }}
      />
    ))}
</div>

      </div>
    </Layout>
  );
};

export default Product;