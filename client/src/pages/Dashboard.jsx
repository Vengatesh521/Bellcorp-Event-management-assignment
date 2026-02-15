import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

function Dashboard() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [events, setEvents] = useState([]);
  const [timeLeft, setTimeLeft] = useState({});

  /* ================= FETCH REGISTERED EVENTS ================= */
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await api.get("/register/my-events", {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setEvents(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    if (user?.token) fetchEvents();
  }, [user]);

  /* ================= CANCEL REGISTRATION ================= */
  const handleCancel = async (eventId) => {
    try {
      await api.delete(`/register/${eventId}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });

      // Remove from UI instantly
      setEvents((prev) => prev.filter((event) => event._id !== eventId));
    } catch (error) {
      console.error(error);
    }
  };

  /* ================= COUNTDOWN ================= */
  useEffect(() => {
    const interval = setInterval(() => {
      const updatedTime = {};
      const now = new Date();

      events.forEach((event) => {
        const eventDate = new Date(event.dateTime);
        const diff = eventDate - now;

        if (diff > 0) {
          updatedTime[event._id] = {
            days: Math.floor(diff / (1000 * 60 * 60 * 24)),
            hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((diff / (1000 * 60)) % 60),
            seconds: Math.floor((diff / 1000) % 60),
          };
        }
      });

      setTimeLeft(updatedTime);
    }, 1000);

    return () => clearInterval(interval);
  }, [events]);

  /* ================= HELPERS ================= */
  const today = new Date();

  const isToday = (date) => {
    const d = new Date(date);
    return (
      d.getDate() === today.getDate() &&
      d.getMonth() === today.getMonth() &&
      d.getFullYear() === today.getFullYear()
    );
  };

  const upcomingEvents = events.filter(
    (event) => new Date(event.dateTime) >= today,
  );

  const pastEvents = events.filter((event) => new Date(event.dateTime) < today);

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-6">
      <div className="max-w-6xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-indigo-600">
            Welcome {user?.user?.name}
          </h2>

          <button
            onClick={() => navigate("/")}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Browse Events
          </button>
        </div>

        {/* ================= YOUR REGISTERED EVENTS ================= */}
        <h3 className="text-2xl font-semibold mb-6 border-b pb-2">
          Your Registered Events
        </h3>

        {events.length === 0 && (
          <p className="text-gray-500 mb-10">
            You have not registered for any events yet.
          </p>
        )}

        {/* ================= UPCOMING ================= */}
        {upcomingEvents.length > 0 && (
          <>
            <h4 className="text-xl font-semibold text-green-600 mb-4">
              Upcoming / Ongoing ({upcomingEvents.length})
            </h4>

            <div className="space-y-6 mb-10">
              {upcomingEvents.map((event) => (
                <div
                  key={event._id}
                  className="border rounded-xl p-6 shadow-sm hover:shadow-md transition"
                >
                  <h4 className="text-xl font-bold text-indigo-700">
                    {event.title}
                  </h4>

                  <p className="text-gray-600 mt-2">
                    👤 Organizer: {event.organizer || "Admin"}
                  </p>

                  <p className="text-gray-600">📍 {event.location}</p>

                  <p className="text-gray-600">
                    📅 {new Date(event.dateTime).toLocaleString()}
                  </p>

                  <p className="text-gray-600">🏷 {event.category}</p>

                  <p className="text-gray-600">
                    🎟 Seats Left:{" "}
                    {event.capacity - event.registeredUsers.length}
                  </p>

                  {/* STATUS */}
                  <div className="mt-3 font-medium">
                    {isToday(event.dateTime) ? (
                      <span className="text-yellow-600 font-semibold">
                        🟢 Ongoing
                      </span>
                    ) : timeLeft[event._id] ? (
                      <span className="text-green-600">
                        ⏳ {timeLeft[event._id].days}d{" "}
                        {timeLeft[event._id].hours}h{" "}
                        {timeLeft[event._id].minutes}m{" "}
                        {timeLeft[event._id].seconds}s left
                      </span>
                    ) : null}
                  </div>

                  {/* CANCEL BUTTON */}
                  <button
                    onClick={() => handleCancel(event._id)}
                    className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                  >
                    Cancel Registration
                  </button>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ================= PAST EVENTS ================= */}
        {pastEvents.length > 0 && (
          <>
            <h4 className="text-xl font-semibold text-red-600 mb-4">
              Past Events ({pastEvents.length})
            </h4>

            <div className="space-y-6">
              {pastEvents.map((event) => (
                <div
                  key={event._id}
                  className="border rounded-xl p-6 bg-gray-50"
                >
                  <h4 className="text-lg font-bold text-gray-700">
                    {event.title}
                  </h4>

                  <p className="text-gray-600 mt-2">📍 {event.location}</p>

                  <p className="text-gray-600">
                    📅 {new Date(event.dateTime).toLocaleString()}
                  </p>

                  <div className="mt-3 text-red-600 font-semibold">
                    🔴 Completed
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
