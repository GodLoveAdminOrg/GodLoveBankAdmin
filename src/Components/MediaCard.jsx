const MediaCard = ({ item, onDelete }) => {
  return (
    <div className="card shadow-sm mx-2 mb-4" style={{ width: "320px" }}>
      <video
        src={item.video}
        controls
        className="card-img-top"
        style={{ height: "180px", objectFit: "cover" }}
      />

      <div className="card-body">
        <p className="text-muted mb-1">{item.tag}</p>
        <h6 className="fw-bold mb-1">{item.title}</h6>
        <p className="mb-2" style={{ fontSize: "14px" }}>{item.description}</p>

        <button className="btn btn-sm btn-danger" onClick={onDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};