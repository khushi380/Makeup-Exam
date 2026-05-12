import { NavLink } from "react-router-dom";
import "./Navbar.css";

const NAV_ITEMS = [
  { to: "/",            label: "Dashboard", icon: "⬡" },
  { to: "/events",      label: "Events",    icon: "◈" },
  { to: "/participants",label: "Participants", icon: "◉" },
];

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-inner">
        {/* Brand */}
        <div className="navbar-brand">
          <span className="brand-icon">⬡</span>
          <span className="brand-text">
            EventHub<span className="brand-dot">.</span>
          </span>
        </div>

        {/* Links */}
        <ul className="navbar-links">
          {NAV_ITEMS.map(({ to, label, icon }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={to === "/"}
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active" : ""}`
                }
              >
                <span className="nav-icon">{icon}</span>
                <span>{label}</span>
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Right pill */}
        <div className="navbar-right">
          <div className="status-pill">
            <span className="status-dot"></span>
            Live
          </div>
        </div>
      </div>
    </nav>
  );
}
