import { useState } from "react";
import AddParticipantModal from "../components/AddParticipantModal";
import "./Participants.css";

export default function Participants({ participants, events, addParticipant, deleteParticipant }) {
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch]       = useState("");
  const [filterEvent, setFilterEvent] = useState("All");

  const filtered = participants.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.email.toLowerCase().includes(search.toLowerCase());
    const matchesEvent = filterEvent === "All" || p.event === filterEvent;
    return matchesSearch && matchesEvent;
  });

  // Avatar initials
  const initials = (name) =>
    name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);

  // Hue from name (deterministic color)
  const avatarHue = (name) => {
    let h = 0;
    for (let i = 0; i < name.length; i++) h = (h + name.charCodeAt(i) * 31) % 360;
    return h;
  };

  return (
    <div className="participants-page">
      {/* Header */}
      <div className="page-header fade-up">
        <div>
          <h1>Participants</h1>
          <p>{participants.length} registered participant{participants.length !== 1 ? "s" : ""}</p>
        </div>
        <button
          className="btn btn-primary"
          onClick={() => setShowModal(true)}
          disabled={events.length === 0}
          title={events.length === 0 ? "Add an event first" : ""}
        >
          + Add Participant
        </button>
      </div>

      {events.length === 0 && (
        <div className="info-banner fade-up">
          ℹ️ You need to create at least one event before adding participants.
        </div>
      )}

      {/* Controls */}
      <div className="participants-controls fade-up delay-1">
        {/* Search */}
        <div className="search-wrap">
          <span className="search-icon">🔍</span>
          <input
            className="form-input search-input"
            placeholder="Search by name or email…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button className="search-clear" onClick={() => setSearch("")}>✕</button>
          )}
        </div>

        {/* Event filter */}
        <select
          className="form-select event-filter-select"
          value={filterEvent}
          onChange={(e) => setFilterEvent(e.target.value)}
        >
          <option value="All">All Events</option>
          {events.map((ev) => (
            <option key={ev.id} value={ev.name}>{ev.name}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      {filtered.length === 0 ? (
        <div className="empty-state fade-up">
          <div className="empty-icon">◉</div>
          <h3>No participants found</h3>
          <p>
            {search || filterEvent !== "All"
              ? "Try adjusting your search or filter."
              : 'Click "Add Participant" to register someone.'}
          </p>
        </div>
      ) : (
        <div className="card fade-up delay-2">
          <div className="pax-table-wrap">
            <table className="pax-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Participant</th>
                  <th>Email</th>
                  <th>Event</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p, i) => {
                  const hue = avatarHue(p.name);
                  return (
                    <tr key={p.id} className="pax-row fade-up" style={{ animationDelay: `${i * 0.04}s` }}>
                      <td className="pax-num">{i + 1}</td>
                      <td>
                        <div className="pax-identity">
                          <div
                            className="avatar"
                            style={{
                              background: `hsl(${hue},55%,25%)`,
                              color: `hsl(${hue},80%,80%)`,
                              border: `1px solid hsl(${hue},55%,35%)`,
                            }}
                          >
                            {initials(p.name)}
                          </div>
                          <span className="pax-name">{p.name}</span>
                        </div>
                      </td>
                      <td>
                        <a className="pax-email" href={`mailto:${p.email}`}>{p.email}</a>
                      </td>
                      <td>
                        <span className="pax-event-tag">{p.event}</span>
                      </td>
                      <td>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => deleteParticipant(p.id)}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="pax-footer">
            Showing <strong>{filtered.length}</strong> of <strong>{participants.length}</strong> participants
          </div>
        </div>
      )}

      {showModal && (
        <AddParticipantModal
          onClose={() => setShowModal(false)}
          onAdd={addParticipant}
          events={events}
        />
      )}
    </div>
  );
}
