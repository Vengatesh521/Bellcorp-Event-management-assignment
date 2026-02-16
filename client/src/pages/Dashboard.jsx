import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

function Dashboard() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [allEvents, setAllEvents] = useState([]);

  /* ================= FETCH DATA ================= */
  useEffect(() => {
    const fetchRegistered = async () => {
      try {
        const res = await api.get("/register/my-events", {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setRegisteredEvents(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchAllEvents = async () => {
      try {
        const res = await api.get("/events");
        setAllEvents(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    if (user?.token) {
      fetchRegistered();
      fetchAllEvents();
    }
  }, [user]);

  /* ================= REGISTER ================= */
  const handleRegister = async (eventId) => {
    try {
      await api.post(
        `/register/${eventId}`,
        {},
        { headers: { Authorization: `Bearer ${user.token}` } },
      );

      const registeredEvent = allEvents.find((e) => e._id === eventId);
      setRegisteredEvents((prev) => [...prev, registeredEvent]);
    } catch (error) {
      console.error(error);
    }
  };

  /* ================= CANCEL ================= */
  const handleCancel = async (eventId) => {
    try {
      await api.delete(`/register/${eventId}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });

      setRegisteredEvents((prev) =>
        prev.filter((event) => event._id !== eventId),
      );
    } catch (error) {
      console.error(error);
    }
  };

  const today = new Date();

  /* ================= REGISTERED FILTER ================= */
  const registeredUpcoming = registeredEvents
    .filter((event) => new Date(event.dateTime) >= today)
    .sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime));

  const registeredPast = registeredEvents
    .filter((event) => new Date(event.dateTime) < today)
    .sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime));

  /* ================= ALL FUTURE EVENTS ================= */
  const upcomingEvents = allEvents
    .filter((event) => new Date(event.dateTime) >= today)
    .sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime));

  const isRegistered = (eventId) =>
    registeredEvents.some((event) => event._id === eventId);

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-10">
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

        {/* ================= MAIN GRID ================= */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* ================= LEFT SIDE ================= */}
          <div className="lg:col-span-2 bg-white p-8 rounded-2xl shadow-lg">
            <h3 className="text-2xl font-semibold mb-6 border-b pb-2">
              Your Registered Events
            </h3>

            {/* UPCOMING */}
            <h4 className="text-lg font-semibold text-green-600 mb-4">
              Upcoming
            </h4>

            {registeredUpcoming.length === 0 ? (
              <p className="text-gray-500 mb-6">
                No upcoming registered events.
              </p>
            ) : (
              <div className="space-y-6 mb-10">
                {registeredUpcoming.map((event) => (
                  <div
                    key={event._id}
                    className="border rounded-xl p-6 hover:shadow-md transition"
                  >
                    <h4 className="text-xl font-bold text-indigo-700">
                      {event.title}
                    </h4>

                    <p className="text-gray-600 mt-2">
                      📅 {new Date(event.dateTime).toLocaleString()}
                    </p>

                    <p className="text-gray-600">📍 {event.location}</p>

                    <button
                      onClick={() => handleCancel(event._id)}
                      className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                    >
                      Cancel Registration
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* HISTORY */}
            <h4 className="text-lg font-semibold text-gray-700 mb-4 border-t pt-6">
              Event History
            </h4>

            {registeredPast.length === 0 ? (
              <p className="text-gray-500">No past events.</p>
            ) : (
              <div className="space-y-6">
                {registeredPast.map((event) => (
                  <div
                    key={event._id}
                    className="border rounded-xl p-6 bg-gray-50"
                  >
                    <h4 className="text-xl font-bold text-gray-700">
                      {event.title}
                    </h4>

                    <p className="text-gray-600 mt-2">
                      📅 {new Date(event.dateTime).toLocaleString()}
                    </p>

                    <p className="text-gray-600">📍 {event.location}</p>

                    <span className="inline-block mt-4 text-sm bg-gray-300 text-gray-700 px-3 py-1 rounded-full">
                      Completed
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ================= RIGHT SIDE ================= */}
          <div className="bg-white p-6 rounded-2xl shadow-lg h-fit">
            <h3 className="text-xl font-semibold mb-6 border-b pb-2 text-green-600">
              All Upcoming Events
            </h3>

            {upcomingEvents.length === 0 ? (
              <p className="text-gray-500">No upcoming events.</p>
            ) : (
              <div className="space-y-4">
                {upcomingEvents.map((event) => (
                  <div key={event._id} className="border rounded-lg p-4">
                    <h4 className="font-semibold text-indigo-700">
                      {event.title}
                    </h4>

                    <p className="text-sm text-gray-600 mt-1">
                      {event.description}
                    </p>

                    <p className="text-sm text-gray-600">
                      📅 {new Date(event.dateTime).toLocaleDateString()}
                    </p>

                    <p className="text-sm text-gray-600">📍 {event.location}</p>

                    {isRegistered(event._id) ? (
                      <button
                        onClick={() => handleCancel(event._id)}
                        className="mt-3 bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                      >
                        Cancel
                      </button>
                    ) : (
                      <button
                        onClick={() => handleRegister(event._id)}
                        className="mt-3 bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700"
                      >
                        Register
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
