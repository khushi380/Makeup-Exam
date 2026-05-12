import { useNavigate } from "react-router-dom";
import StatCard from "../components/StatCard";
import "./Dashboard.css";

export default function Dashboard({ events, participants }) {
  const navigate = useNavigate();

  const total     = events.length;
  const upcoming  = events.filter((e) => e.status === "Upcoming").length;
  const completed = events.filter((e) => e.status === "Completed").length;
  const totalPax  = participants.length;

  const recentEvents = [...events]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  const formatDate = (d) =>
    new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

  // Group participants per event
  const paxByEvent = events
    .map((ev) => ({
      name: ev.name,
      count: participants.filter((p) => p.event === ev.name).length,
    }))
    .filter((x) => x.count > 0)
    .sort((a, b) => b.count - a.count);

  return (
    <div className="dashboard">
      {/* Heading */}
      <div className="dashboard-hero fade-up">
        <div>
          <h1>Event Dashboard</h1>
          <p>Your Events, Organized Perfectly</p>
        </div>
        <button className="btn btn-primary" onClick={() => navigate("/events")}>
          + New Event
        </button>
      </div>

      {/* Stat Cards */}
      <div className="stats-grid">
        <StatCard label="Total Events"       value={total}     icon="◈" color="#7c6af7" delay={0}    />
        <StatCard label="Upcoming Events"    value={upcoming}  icon="🔔" color="#b8b0ff" delay={0.06} />
        <StatCard label="Completed Events"   value={completed} icon="✓" color="#4ade80" delay={0.12} />
        <StatCard label="Total Participants" value={totalPax}  icon="◉" color="#f7826a" delay={0.18} />
      </div>

      {/* Bottom grid */}
      <div className="dashboard-bottom">
        {/* Recent Events */}
        <div className="card fade-up delay-2">
          <div className="section-heading">
            <h2>Recent Events</h2>
            <button className="btn btn-outline btn-xs" onClick={() => navigate("/events")}>
              View All →
            </button>
          </div>
          {recentEvents.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">◈</div>
              <h3>No events yet</h3>
              <p>Add your first event to get started.</p>
            </div>
          ) : (
            <table className="dash-table">
              <thead>
                <tr>
                  <th>Event</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentEvents.map((ev) => (
                  <tr key={ev.id}>
                    <td>
                      <span className="event-name-cell">{ev.name}</span>
                      <span className="event-venue-cell">{ev.venue}</span>
                    </td>
                    <td>{formatDate(ev.date)}</td>
                    <td>
                      <span className={`badge ${ev.status === "Upcoming" ? "badge-upcoming" : "badge-completed"}`}>
                        {ev.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Participants per event */}
        <div className="card fade-up delay-3">
          <div className="section-heading">
            <h2>Participants by Event</h2>
            <button className="btn btn-outline btn-xs" onClick={() => navigate("/participants")}>
              Manage →
            </button>
          </div>
          {paxByEvent.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">◉</div>
              <h3>No participants yet</h3>
              <p>Register participants to see them here.</p>
            </div>
          ) : (
            <div className="pax-bars">
              {paxByEvent.map((item, i) => {
                const maxCount = paxByEvent[0].count;
                const pct = Math.round((item.count / maxCount) * 100);
                return (
                  <div className="pax-bar-row" key={i}>
                    <div className="pax-bar-label">{item.name}</div>
                    <div className="pax-bar-track">
                      <div
                        className="pax-bar-fill"
                        style={{ width: `${pct}%`, animationDelay: `${i * 0.08}s` }}
                      />
                    </div>
                    <div className="pax-bar-count">{item.count}</div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
