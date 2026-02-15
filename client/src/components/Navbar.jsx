import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-indigo-600">
          Bellcorp Events
        </Link>

        <div className="flex items-center gap-6">
          <Link to="/" className="hover:text-indigo-600 transition">
            Events
          </Link>

          {user ? (
            <>
              <Link to="/dashboard" className="hover:text-indigo-600">
                Dashboard
              </Link>
              <button
                onClick={logout}
                className="bg-red-500 text-white px-4 py-1 rounded-lg hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-indigo-600">
                Login
              </Link>
              <Link
                to="/register"
                className="bg-indigo-600 text-white px-4 py-1 rounded-lg hover:bg-indigo-700 transition"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
