import { useParams, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";

function RegisterEvent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [form, setForm] = useState({
    phone: "",
    notes: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post(`/register/${id}`, form, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      alert("Registered Successfully!");
      navigate("/dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-6">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-indigo-600 mb-6 text-center">
          Event Registration
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Phone Number"
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />

          <textarea
            placeholder="Additional Notes"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
          />

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Confirm Registration
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegisterEvent;
