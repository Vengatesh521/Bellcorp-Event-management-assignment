import { Link } from "react-router-dom";

function EventCard({ event }) {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 p-5">
      <h3 className="text-xl font-semibold text-gray-800 mb-2">
        {event.title}
      </h3>

      <p className="text-gray-600 mb-1">📍 {event.location}</p>

      <p className="text-gray-500 text-sm mb-4">
        🗓 {new Date(event.dateTime).toLocaleDateString()}
      </p>

      <Link
        to={`/event/${event._id}`}
        className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        View Details
      </Link>
    </div>
  );
}

export default EventCard;
