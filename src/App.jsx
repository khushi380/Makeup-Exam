import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Events from "./pages/Events";
import Participants from "./pages/Participants";
import "./App.css";

const initialEvents = [
  { id: 1, name: "Tech Summit 2025", date: "2026-08-15", venue: "Convention Center, Delhi", organizer: "Riya Sharma", status: "Upcoming" },
  { id: 2, name: "Design Thinking Workshop", date: "2026-06-10", venue: "Innovation Hub, Mumbai", organizer: "Arjun Mehta", status: "Upcoming" },
  { id: 3, name: "Startup Pitch Night", date: "2026-03-20", venue: "Startup Loft, Bangalore", organizer: "Priya Nair", status: "Completed" },
  { id: 4, name: "AI & ML Conference", date: "2026-05-05", venue: "IIT Auditorium, Chennai", organizer: "Vikram Rao", status: "Completed" },
];

const initialParticipants = [
  { id: 1, name: "Aarav Singh", email: "aarav@gmail.com", event: "Tech Summit 2025" },
  { id: 2, name: "Meera Pillai", email: "meera@gmail.com", event: "Design Thinking Workshop" },
  { id: 3, name: "Rohan Gupta", email: "rohan@gmail.com", event: "Startup Pitch Night" },
  { id: 4, name: "Sneha Reddy", email: "sneha@gmail.com", event: "AI & ML Conference" },
  { id: 5, name: "Kabir Joshi", email: "kabir@gmail.com", event: "Tech Summit 2025" },
];

export default function App() {
  const [events, setEvents] = useState(initialEvents);
  const [participants, setParticipants] = useState(initialParticipants);

  const addEvent = (event) => {
    setEvents((prev) => [...prev, { ...event, id: Date.now() }]);
  };

  const deleteEvent = (id) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
    const eventName = events.find((e) => e.id === id)?.name;
    if (eventName) {
      setParticipants((prev) => prev.filter((p) => p.event !== eventName));
    }
  };

  const markCompleted = (id) => {
    setEvents((prev) =>
      prev.map((e) => (e.id === id ? { ...e, status: "Completed" } : e))
    );
  };

  const addParticipant = (participant) => {
    setParticipants((prev) => [...prev, { ...participant, id: Date.now() }]);
  };

  const deleteParticipant = (id) => {
    setParticipants((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <Router>
      <div className="app-root">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route
              path="/"
              element={<Dashboard events={events} participants={participants} />}
            />
            <Route
              path="/events"
              element={
                <Events
                  events={events}
                  addEvent={addEvent}
                  deleteEvent={deleteEvent}
                  markCompleted={markCompleted}
                />
              }
            />
            <Route
              path="/participants"
              element={
                <Participants
                  participants={participants}
                  events={events}
                  addParticipant={addParticipant}
                  deleteParticipant={deleteParticipant}
                />
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
