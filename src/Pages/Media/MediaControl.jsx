import Layout from "../../Components/Layout";
import { useEffect, useState } from "react";
import { getAdminVideos, deleteAdminVideo } from "../../Services/mediaApi";
import { createAdminVideo } from "../../Services/mediaApi";
import { updateAdminVideo } from "../../Services/mediaApi";
import { getVideoCategories } from "../../Services/mediaApi";
import { toast } from "react-toastify";
const API_BASE = "http://18.204.175.233:3001";



const MediaCard = ({ item, onDelete, onPlay, deletingId, onEdit }) => {
  const isDeleting = deletingId === item.id;

  return (
    <div className="card shadow-sm mx-2 mb-4" style={{ width: "356px" }}>

      {/* Thumbnail */}
      <div
        className="position-relative"
        style={{ height: "180px", cursor: "pointer" }}
        // onClick={() => onPlay(item.videoUrl)}
        onClick={() => {
          if (!item.videoUrl) {
            toast.error("Video not ready yet");
            return;
          }
          // onPlay(item.videoUrl);

          const videoUrl = item.videoUrl.startsWith("http")
            ? item.videoUrl
            : `${API_BASE}/${item.videoUrl}`;


          onPlay(videoUrl);
        }}
      >
        <img
          src={
            item.thumbnailUrl?.startsWith("http")
              ? item.thumbnailUrl
              : `${API_BASE}/${item.thumbnailUrl}`
          }
          alt={item.title}
          className="card-img-top"
          style={{ height: "180px", objectFit: "cover" }}
        />

        {/* Play Icon */}
        <div
          className="position-absolute top-50 start-50 translate-middle 
                     bg-dark bg-opacity-50 text-white rounded-circle
                     d-flex align-items-center justify-content-center"
          style={{ width: "50px", height: "50px", fontSize: "20px" }}
        >
          ▶
        </div>
      </div>

      <div className="card-body d-flex flex-column" style={{ height: "180px" }}>
        <p className="text-muted fw-semibold mb-1 ">{item.tags}</p>
        <h6 className="fw-bold mb-1">{item.title}</h6>
        <p className="mb-2" style={{ fontSize: "14px" }}>
          {item.shortDescription}
        </p>

        {/* BUTTON ROW */}
        <div className="d-flex gap-2 mt-auto">
          {/* EDIT */}
          <button
            type="button"
            className="btn btn-sm btn-primary"
            onClick={() => onEdit(item)}
          >
            <i className="bi bi-pencil-square me-1"></i>
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


const MediaControl = () => {

  console.log("MediaControl mounted");


  const [form, setForm] = useState({
    tags: "",
    title: "",
    shortDescription: "",
    description: "",
    categoryId: null,   // default
    status: 1,       // active
    video: null,
    thumbnail: null,
  });

  const fetchVideos = async () => {
    console.log("fetchVideos START");
    try {
      const res = await getAdminVideos();
      console.log("API RESPONSE:", res.data); // 🔹 yahi dekhna
      setMediaList(res.data.data); // backend se aayi list ko state me set kar do
    } catch (error) {
      console.error("API ERROR:", error);
    }
  };

  const [mediaList, setMediaList] = useState([]);
  const [playVideo, setPlayVideo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [editItem, setEditItem] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    try {
      const res = await getVideoCategories();
      console.log("CATEGORY API RESPONSE:", res.data); // 🔴 IMPORTANT
      setCategories(res.data.data); // 👈 API ke response ke mutabiq
    } catch (error) {
      console.error("CATEGORY API ERROR:", error);
    }
  };
  useEffect(() => {

    setTimeout(() => {
      fetchVideos();
    }, 2000); // 2 seconds delay

    fetchCategories();
  }, []);




  const handleAdd = async () => {
    if (!form.categoryId) {
      toast.error("Please select a category");
      setIsLoading(false);
      return;
    }
    setIsLoading(true); // 🔹 start loading
    if (!form.video) {
      alert("Please upload video");
      return;
    }

    try {
      const formData = new FormData();

      formData.append("tags", form.tags);
      formData.append("title", form.title);
      formData.append("shortDescription", form.shortDescription);
      formData.append("description", form.description); // ✅ dono
      formData.append("categoryId", form.categoryId);
      formData.append("status", form.status);
      formData.append("video", form.video);

      // thumbnail optional
      if (form.thumbnail) {
        formData.append("thumbnail", form.thumbnail);
      }

      

      // 🔴 STEP 1: upload
      await createAdminVideo(formData);

      // 🔴 STEP 2: fetch fresh data (VERY IMPORTANT)
      await fetchVideos();

      toast.success("Video added successfully");

      // 🔁 backend se fresh data lao
      fetchVideos();

      // reset
      setForm({
        tags: "",
        title: "",
        shortDescription: "",
        description: "",
        categoryId: null,
        status: 1,
        video: null,
        thumbnail: null,
      });

      setIsModalOpen(false); // close modal

    } catch (error) {
      console.error("CREATE VIDEO ERROR:", error);
      alert("Video upload failed");
    } finally {
      setIsLoading(false); // 🔹 Stop loading
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

      formData.append("tags", form.tags);
      formData.append("title", form.title);
      formData.append("shortDescription", form.shortDescription);
      formData.append("description", form.description);
      formData.append("categoryId", form.categoryId);
      formData.append("status", form.status);

      // video optional
      if (form.video) {
        formData.append("video", form.video);
      }

      // thumbnail optional
      if (form.thumbnail) {
        formData.append("thumbnail", form.thumbnail);
      }

      await updateAdminVideo(editItem.id, formData);

      toast.success("Video updated successfully");
      fetchVideos();

      // reset
      setEditItem(null);
      setForm({
        tags: "",
        title: "",
        shortDescription: "",
        description: "",
        categoryId: null,
        status: 1,
        video: null,
        thumbnail: null,
      });

    } catch (error) {
      console.error("UPDATE ERROR:", error);
      toast.error("Update failed");
    } finally {
      setIsUpdating(false);
    }
  };


  const handleDelete = async (id) => {
    console.log("Deleting video id:", id);
    console.log("Type of id:", typeof id);


    if (!window.confirm("Delete this video?")) return;

    //  Optimistic UI (instant remove)
    const previousList = mediaList;
    setMediaList((prev) => prev.filter((v) => v.id !== id));
    setDeletingId(id);

    try {
      await deleteAdminVideo(id);
      fetchVideos(); // refresh list
      toast.success("Video deleted successfully");
    } catch (error) {
      setMediaList(previousList); // revert back
      toast.error("Failed to delete video");
      console.error("DELETE ERROR FULL:", error.response?.data);
      console.error("STATUS:", error.response?.status);
    } finally {
      setDeletingId(null);
    }
  };
  console.log("CATEGORIES STATE:", categories);


  return (
    <Layout>
      <div className="container-fluid py-3 px-4" style={{ background: "rgb(247, 248, 250)" }}>
        <h1 className="fs-3 pb-3">Media Control</h1>

        {/* ADD BUTTON */}
        <button
          className="btn text-white mb-4"
          data-bs-toggle="modal"
          data-bs-target="#mediaModal"
          style={{ background: "#F55227" }}
          onClick={() => {
            setEditItem(null); // new item
            setForm({
              tags: "",
              title: "",
              shortDescription: "",
              description: "",
              categoryId: null,
              status: 1,
              video: null,
              thumbnail: null,
            });
            setIsModalOpen(true); // modal open
          }}
        >
          Add Media / Video +
        </button>

        {/* MODAL */}
        {isModalOpen && (
          <div className="modal fade show d-block" tabIndex="-1">
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">
                    {editItem ? "Edit Media / Video" : "Add Media / Video"}
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setIsModalOpen(false)}
                  ></button>
                </div>

                <div className="modal-body">
                  <div className="row">
                    <div className="col-md-4 mb-3">
                      <label className="form-label">Tags</label>
                      <input
                        type="text"
                        className="form-control"
                        value={form.tags}
                        onChange={(e) =>
                          setForm({ ...form, tags: e.target.value })
                        }
                      />
                    </div>

                    <div className="col-md-4 mb-3">
                      <label className="form-label">Title</label>
                      <input
                        type="text"
                        className="form-control"
                        value={form.title}
                        onChange={(e) =>
                          setForm({ ...form, title: e.target.value })
                        }
                      />
                    </div>

                    <div className="col-md-4 mb-3">
                      <label className="form-label">Short Description</label>
                      <input
                        type="text"
                        className="form-control"
                        value={form.shortDescription}
                        onChange={(e) =>
                          setForm({ ...form, shortDescription: e.target.value })
                        }
                      />
                    </div>

                    <div className="col-md-12 mb-3">
                      <label className="form-label">Description</label>
                      <input
                        type="text"
                        className="form-control"
                        value={form.description}
                        onChange={(e) =>
                          setForm({ ...form, description: e.target.value })
                        }
                      />
                    </div>

                    <div className="col-md-12 mb-3">
                      <label className="form-label">
                        Video Upload {editItem && "(Optional)"}
                      </label>
                      <input
                        type="file"
                        accept="video/*"
                        className="form-control"
                        onChange={(e) =>
                          setForm({ ...form, video: e.target.files[0] })
                        }
                      />
                    </div>

                    {/* Thumbnail Upload */}
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Upload Thumbnail</label>
                      <input
                        type="file"
                        accept="image/*"
                        className="form-control"
                        onChange={(e) =>
                          setForm({ ...form, thumbnail: e.target.files[0] })
                        }
                      />
                    </div>
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
        )}


        {/* MEDIA CARDS */}
        <div className="d-flex flex-wrap">
          {Array.isArray(mediaList) &&
            mediaList.map((item, index) => (
              console.log("ITEM:", item),
              <MediaCard
                key={item.id}
                item={item}
                onDelete={handleDelete}
                onPlay={(video) => setPlayVideo(video)}
                deletingId={deletingId}
                onEdit={(item) => {
                  setEditItem(item);
                  setForm({
                    tags: item.tags || "",
                    title: item.title || "",
                    shortDescription: item.shortDescription || "",
                    description: item.description || "",
                    categoryId: item.categoryId,
                    status: item.status,
                    video: item.video,       // optional
                    thumbnail: item.thumbnailUrl,   // optional
                  });
                  setIsModalOpen(true); // modal open
                }}
              />
            ))}
        </div>
      </div>

      {playVideo && (
        <div className="modal fade show d-block bg-dark bg-opacity-75">
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-body p-0">
                <video src={playVideo} controls autoPlay className="w-100" />
              </div>
              <button
                className="btn btn-danger position-absolute top-0 end-0 m-2"
                onClick={() => setPlayVideo(null)}
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      )}

    </Layout>
  );
};

export default MediaControl;
