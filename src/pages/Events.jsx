import { useState } from "react";
import EventCard from "../components/EventCard";
import AddEventModal from "../components/AddEventModal";
import "./Events.css";

const FILTERS = ["All", "Upcoming", "Completed"];

export default function Events({ events, addEvent, deleteEvent, markCompleted }) {
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter]       = useState("All");
  const [search, setSearch]       = useState("");

  const filtered = events.filter((ev) => {
    const matchesFilter = filter === "All" || ev.status === filter;
    const matchesSearch =
      ev.name.toLowerCase().includes(search.toLowerCase()) ||
      ev.organizer.toLowerCase().includes(search.toLowerCase()) ||
      ev.venue.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="events-page">
      {/* Header */}
      <div className="page-header fade-up">
        <div>
          <h1>Events</h1>
          <p>{events.length} total event{events.length !== 1 ? "s" : ""} registered</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          + Add Event
        </button>
      </div>

      {/* Controls */}
      <div className="events-controls fade-up delay-1">
        {/* Search */}
        <div className="search-wrap">
          <span className="search-icon">🔍</span>
          <input
            className="form-input search-input"
            placeholder="Search events, organizers, venues…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button className="search-clear" onClick={() => setSearch("")}>✕</button>
          )}
        </div>

        {/* Filter pills */}
        <div className="filter-pills">
          {FILTERS.map((f) => (
            <button
              key={f}
              className={`filter-pill ${filter === f ? "active" : ""}`}
              onClick={() => setFilter(f)}
            >
              {f}
              <span className="pill-count">
                {f === "All"
                  ? events.length
                  : events.filter((e) => e.status === f).length}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="empty-state fade-up">
          <div className="empty-icon">◈</div>
          <h3>No events found</h3>
          <p>
            {search || filter !== "All"
              ? "Try adjusting your search or filter."
              : "Click \"Add Event\" to create your first event."}
          </p>
        </div>
      ) : (
        <div className="events-grid">
          {filtered.map((ev, i) => (
            <div key={ev.id} className="fade-up" style={{ animationDelay: `${i * 0.05}s` }}>
              <EventCard
                event={ev}
                onDelete={deleteEvent}
                onMarkCompleted={markCompleted}
              />
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <AddEventModal onClose={() => setShowModal(false)} onAdd={addEvent} />
      )}
    </div>
  );
}
