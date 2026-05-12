import "./EventCard.css";

export default function EventCard({ event, onDelete, onMarkCompleted }) {
  const isCompleted = event.status === "Completed";

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className={`event-card fade-up ${isCompleted ? "event-card--done" : ""}`}>
      {/* Top row */}
      <div className="event-card-header">
        <span className={`badge ${isCompleted ? "badge-completed" : "badge-upcoming"}`}>
          <span className="badge-dot" />
          {event.status}
        </span>
        <div className="event-card-actions">
          {!isCompleted && (
            <button
              className="btn btn-success btn-sm"
              onClick={() => onMarkCompleted(event.id)}
              title="Mark as completed"
            >
              ✓ Done
            </button>
          )}
          <button
            className="btn btn-danger btn-sm"
            onClick={() => onDelete(event.id)}
            title="Delete event"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Title */}
      <h3 className="event-card-title">{event.name}</h3>

      {/* Meta */}
      <div className="event-card-meta">
        <div className="meta-item">
          <span className="meta-icon">📅</span>
          <span>{formatDate(event.date)}</span>
        </div>
        <div className="meta-item">
          <span className="meta-icon">📍</span>
          <span>{event.venue}</span>
        </div>
        <div className="meta-item">
          <span className="meta-icon">👤</span>
          <span>{event.organizer}</span>
        </div>
      </div>
    </div>
  );
}
