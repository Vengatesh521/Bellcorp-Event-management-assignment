import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

function Events() {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");

  const navigate = useNavigate();

  // Fetch Events Function
  const fetchEvents = async () => {
    try {
      const res = await api.get("/events", {
        params: { search, location, category },
      });
      setEvents(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Initial Load
  useEffect(() => {
    fetchEvents();
  }, []);

  // 🔥 AUTO FILTER (when category/location/search changes)
  useEffect(() => {
    const delay = setTimeout(() => {
      fetchEvents();
    }, 400); // small debounce (400ms)

    return () => clearTimeout(delay);
  }, [search, location, category]);

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-6">
      <div className="max-w-6xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-indigo-600 mb-6">All Events</h2>

        {/* Filters */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <input
            type="text"
            placeholder="Search events..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border p-2 rounded-lg"
          />

          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="border p-2 rounded-lg"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border p-2 rounded-lg"
          >
            <option value="">All Categories</option>
            <option value="Music">Music</option>
            <option value="Workshop">Workshop</option>
            <option value="Tech">Tech</option>
          </select>

          {/* Manual Search Button Still Works */}
          <button
            onClick={fetchEvents}
            className="bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            Search
          </button>
        </div>

        {/* Event List */}
        <div className="grid md:grid-cols-2 gap-6">
          {events.length === 0 ? (
            <p className="text-gray-500">No events found.</p>
          ) : (
            events.map((event) => (
              <div
                key={event._id}
                className="border p-6 rounded-xl shadow-sm hover:shadow-md transition"
              >
                <h3 className="font-bold text-xl text-indigo-700">
                  {event.title}
                </h3>

                <p className="text-gray-600 mt-2">📍 {event.location}</p>

                <p className="text-gray-600">
                  📅 {new Date(event.dateTime).toLocaleDateString()}
                </p>

                <p className="text-sm text-gray-500 mt-2">
                  Category: {event.category}
                </p>

                <div className="mt-4">
                  <button
                    onClick={() => navigate(`/event/${event._id}`)}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Events;
