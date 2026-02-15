import { useState, useContext } from "react";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const [form, setForm] = useState({});
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await api.post("/auth/login", form);
    login(res.data);
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-blue-600 px-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Welcome Back
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition shadow-md"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
