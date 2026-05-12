import "./StatCard.css";

export default function StatCard({ label, value, icon, color, delay = 0 }) {
  return (
    <div
      className={`stat-card fade-up`}
      style={{ animationDelay: `${delay}s`, "--card-color": color }}
    >
      <div className="stat-icon">{icon}</div>
      <div className="stat-body">
        <div className="stat-value">{value}</div>
        <div className="stat-label">{label}</div>
      </div>
      <div className="stat-glow" />
    </div>
  );
}
