import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";

function CreateEvent() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [form, setForm] = useState({
    title: "",
    organizer: "",
    description: "",
    dateTime: "",
    location: "",
    seats: "",
    category: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post("/events", form, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      alert("Event Created Successfully!");
      navigate("/dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "Error creating event");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-6 py-10">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-2xl">
        <h2 className="text-3xl font-bold text-indigo-600 mb-6 text-center">
          Create New Event
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title */}
          <div>
            <label className="block text-gray-700 mb-1">Event Title</label>
            <input
              type="text"
              name="title"
              required
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              placeholder="Enter event title"
            />
          </div>
          {/* Organizer */}
          <div>
            <label className="block text-gray-700 mb-1">Organizer</label>
            <input
              type="text"
              name="organizer"
              required
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              placeholder="Organizer name"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-700 mb-1">Description</label>
            <textarea
              name="description"
              required
              rows="4"
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              placeholder="Event details..."
            />
          </div>

          {/* Date */}
          <div>
            <label className="block text-gray-700 mb-1">Event Date</label>
            <input
              type="datetime-local"
              name="dateTime"
              required
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>
          {/* Category */}
          <div>
            <label className="block text-gray-700 mb-1">Category</label>
            <select
              name="category"
              required
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            >
              <option value="">Select Category</option>
              <option value="Tech">Tech</option>
              <option value="Music">Music</option>
              <option value="Workshop">Workshop</option>
              <option value="Business">Business</option>
              <option value="Sports">Sports</option>
            </select>
          </div>
    
          {/* Location */}
          <div>
            <label className="block text-gray-700 mb-1">Location</label>
            <input
              type="text"
              name="location"
              required
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              placeholder="Event location"
            />
          </div>

          {/* Seats */}
          <div>
            <label className="block text-gray-700 mb-1">Available Seats</label>
            <input
              type="number"
              name="seats"
              required
              min="1"
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              placeholder="Number of seats"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition duration-300 shadow-md"
          >
            {loading ? "Creating..." : "Create Event"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateEvent;
