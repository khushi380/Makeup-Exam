import { useState, useEffect } from "react";
import "./Modal.css";

const EMPTY = { name: "", date: "", venue: "", organizer: "", status: "Upcoming" };

export default function AddEventModal({ onClose, onAdd }) {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // Close on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const validate = (data) => {
    const errs = {};
    if (!data.name.trim())      errs.name      = "Event name is required.";
    if (!data.date)             errs.date      = "Date is required.";
    if (!data.venue.trim())     errs.venue     = "Venue is required.";
    if (!data.organizer.trim()) errs.organizer = "Organizer name is required.";
    return errs;
  };

  const handleChange = (e) => {
    const updated = { ...form, [e.target.name]: e.target.value };
    setForm(updated);
    if (submitted) setErrors(validate(updated));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      onAdd(form);
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-box fade-up">
        <div className="modal-header">
          <h2>Add New Event</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <form className="modal-form" onSubmit={handleSubmit} noValidate>
          {/* Event Name */}
          <div className="form-group">
            <label className="form-label">Event Name *</label>
            <input
              className={`form-input ${errors.name ? "error" : ""}`}
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="e.g. Annual Tech Fest"
            />
            {errors.name && <span className="form-error">{errors.name}</span>}
          </div>

          {/* Date */}
          <div className="form-group">
            <label className="form-label">Date *</label>
            <input
              type="date"
              className={`form-input ${errors.date ? "error" : ""}`}
              name="date"
              value={form.date}
              onChange={handleChange}
            />
            {errors.date && <span className="form-error">{errors.date}</span>}
          </div>

          {/* Venue */}
          <div className="form-group">
            <label className="form-label">Venue *</label>
            <input
              className={`form-input ${errors.venue ? "error" : ""}`}
              name="venue"
              value={form.venue}
              onChange={handleChange}
              placeholder="e.g. City Convention Hall"
            />
            {errors.venue && <span className="form-error">{errors.venue}</span>}
          </div>

          {/* Organizer */}
          <div className="form-group">
            <label className="form-label">Organizer Name *</label>
            <input
              className={`form-input ${errors.organizer ? "error" : ""}`}
              name="organizer"
              value={form.organizer}
              onChange={handleChange}
              placeholder="e.g. Priya Sharma"
            />
            {errors.organizer && <span className="form-error">{errors.organizer}</span>}
          </div>

          {/* Status */}
          <div className="form-group">
            <label className="form-label">Status</label>
            <select className="form-select" name="status" value={form.status} onChange={handleChange}>
              <option value="Upcoming">Upcoming</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-outline" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary">Add Event</button>
          </div>
        </form>
      </div>
    </div>
  );
}
