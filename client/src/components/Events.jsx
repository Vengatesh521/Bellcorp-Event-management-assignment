import { useEffect, useState } from "react";
import api from "../api/axios";
import EventCard from "../components/EventCard";

function Events() {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      const res = await api.get(`/events?search=${search}`);
      setEvents(res.data);
    };
    fetchEvents();
  }, [search]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold text-center mb-8">Discover Events</h2>

      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="Search events..."
          className="w-full max-w-md px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {events.map((event) => (
          <EventCard key={event._id} event={event} />
        ))}
      </div>
    </div>
  );
}

export default Events;
