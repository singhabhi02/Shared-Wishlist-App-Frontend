import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import WishlistDetail from "./components/WishlistDetail";
import LandingPage from "./components/LandingPage"; // <- New import

function App() {
  const [user, setUser] = useState(null);

  const handleLogout = () => setUser(null);

  return (
    <BrowserRouter>
      {user && (
        <div className="p-4 flex justify-end gap-3 bg-purple-50 border-b">
          <button
            onClick={() => (window.location.href = "/dashboard")}
            className="bg-white text-purple-700 border border-purple-300 px-4 py-2 rounded hover:bg-purple-100 transition"
          >
            🏠 Dashboard
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
          >
            🚪 Logout
          </button>
        </div>
      )}

      <Routes>
        <Route
          path="/"
          element={!user ? <LandingPage /> : <Navigate to="/dashboard" />}
        />
        <Route
          path="/login"
          element={
            !user ? <Login onAuth={setUser} /> : <Navigate to="/dashboard" />
          }
        />
        <Route
          path="/signup"
          element={
            !user ? <Signup onAuth={setUser} /> : <Navigate to="/dashboard" />
          }
        />
        <Route
          path="/dashboard"
          element={user ? <Dashboard user={user} /> : <Navigate to="/" />}
        />
        <Route
          path="/wishlist/:id"
          element={user ? <WishlistDetail user={user} /> : <Navigate to="/" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
