import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";

function EventDetails() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`/events/${id}`).then((res) => setEvent(res.data));
  }, [id]);

  if (!event)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    );

  const eventDate = new Date(event.dateTime);
  const today = new Date();

  // Remove time part for accurate date comparison
  const eventOnlyDate = new Date(
    eventDate.getFullYear(),
    eventDate.getMonth(),
    eventDate.getDate(),
  );

  const todayOnlyDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
  );

  const isExpired = eventOnlyDate < todayOnlyDate;
  const isToday = eventOnlyDate.getTime() === todayOnlyDate.getTime();
  const seatsLeft = event.capacity - event.registeredUsers.length;
  const isFull = seatsLeft <= 0;

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">{event.title}</h2>

        <p className="text-gray-600 mb-2">📍 {event.location}</p>

        <p className="text-gray-500 mb-4">
          🗓 {new Date(event.dateTime).toLocaleString()}
        </p>

        {isToday && (
          <p className="text-yellow-600 font-semibold mb-4">
            🔵 This event is happening today.
          </p>
        )}

        {isExpired && (
          <p className="text-red-600 font-semibold mb-4">
            ✔ This event has been successfully completed. Registration is now
            closed.
          </p>
        )}

        <p className="text-gray-700 mb-6">{event.description}</p>

        <p className="text-gray-600 mb-2">👤 Organizer: {event.organizer}</p>

        <p className="text-gray-600 mb-2">🏷 Category: {event.category}</p>

        <p className="text-gray-600 mb-4">
          🎟 Seats Left: {seatsLeft > 0 ? seatsLeft : "Fully Booked"}
        </p>

        {user ? (
          !isExpired && !isFull ? (
            <button
              onClick={() => navigate(`/register-event/${id}`)}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition shadow-md"
            >
              Register Now
            </button>
          ) : isFull ? (
            <p className="text-red-500 font-medium">
              Registration is closed as all available seats have been filled.
            </p>
          ) : null
        ) : (
          <p className="text-red-500">
            Please login to register for this event.
          </p>
        )}
      </div>
    </div>
  );
}

export default EventDetails;
