function Card({ post, onEdit, onDelete, isFavorite, onToggleFavorite }) {
  return (
    <article className="post-card">
      <div className="post-card-top">
        <span className="post-tag">NOTE {String(post.age).padStart(2, "0")}</span>
        <button className={`favorite-toggle ${isFavorite ? "is-favorite" : ""}`} onClick={() => onToggleFavorite(post._id)} aria-pressed={isFavorite} aria-label={isFavorite ? `Remove ${post.name} from favorites` : `Save ${post.name} to favorites`}>
          {isFavorite ? "★" : "☆"}
        </button>
      </div>
      <h3>{post.name}</h3>
      <p>{post.description}</p>
      <div className="post-card-footer">
        <span>{post.createdAt ? new Date(post.createdAt).toLocaleDateString(undefined, { month: "short", day: "numeric" }) : "Just now"}</span>
        <div className="card-actions">
          <button className="text-button" onClick={() => onEdit(post)}>Edit</button>
          <button className="text-button danger" onClick={() => onDelete(post._id)}>Delete</button>
        </div>
      </div>
    </article>
  );
}

export default Card;
