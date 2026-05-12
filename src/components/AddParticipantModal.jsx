import { useState, useEffect } from "react";
import "./Modal.css";

const EMPTY = { name: "", email: "", event: "" };

const validateEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export default function AddParticipantModal({ onClose, onAdd, events }) {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const validate = (data) => {
    const errs = {};
    if (!data.name.trim())           errs.name  = "Participant name is required.";
    if (!data.email.trim())          errs.email = "Email is required.";
    else if (!validateEmail(data.email)) errs.email = "Enter a valid email address.";
    if (!data.event)                 errs.event = "Please select an event.";
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
          <h2>Add Participant</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <form className="modal-form" onSubmit={handleSubmit} noValidate>
          {/* Name */}
          <div className="form-group">
            <label className="form-label">Participant Name *</label>
            <input
              className={`form-input ${errors.name ? "error" : ""}`}
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="e.g. Ananya Sharma"
            />
            {errors.name && <span className="form-error">{errors.name}</span>}
          </div>

          {/* Email */}
          <div className="form-group">
            <label className="form-label">Email ID *</label>
            <input
              type="email"
              className={`form-input ${errors.email ? "error" : ""}`}
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="e.g. ananya@example.com"
            />
            {errors.email && <span className="form-error">{errors.email}</span>}
          </div>

          {/* Event */}
          <div className="form-group">
            <label className="form-label">Event *</label>
            <select
              className={`form-select ${errors.event ? "error" : ""}`}
              name="event"
              value={form.event}
              onChange={handleChange}
            >
              <option value="">— Select an event —</option>
              {events.map((ev) => (
                <option key={ev.id} value={ev.name}>{ev.name}</option>
              ))}
            </select>
            {errors.event && <span className="form-error">{errors.event}</span>}
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-outline" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary">Add Participant</button>
          </div>
        </form>
      </div>
    </div>
  );
}
