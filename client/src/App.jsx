import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Events from "./pages/Events";
import Login from "./pages/Login";
import Register from "./pages/Register";
import EventDetails from "./pages/EventDetails";
import Dashboard from "./pages/Dashboard";
import RegisterEvent from "./pages/RegisterEvent";
import CreateEvent from "./pages/CreateEvent";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Events />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/register-event/:id" element={<RegisterEvent />} />
          <Route path="/create-event" element={<CreateEvent />} />
          <Route path="/event/:id" element={<EventDetails />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
