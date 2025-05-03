import React, { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

const Login = ({ onAuth }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Email and password required");
      return;
    }

    try {
      const res = await api.post("/auth/login", { email, password });

      // ✅ Store token in localStorage
      localStorage.setItem("token", res.data.token);

      // ✅ Set authenticated user
      onAuth(res.data.user);

      // ✅ Redirect or navigate after login if needed
      navigate("/dashboard"); // optional if already handled
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <h1 className="text-3xl font-extrabold text-purple-700 tracking-wide p-4">
        Shared Wishlist App
      </h1>
      <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow bg-white">
        <h2 className="text-2xl mb-4">Login</h2>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <input
          className="border p-2 mb-2 w-full"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="relative mb-4">
          <input
            className="border p-2 w-full"
            placeholder="Password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span
            className="absolute right-2 top-2 cursor-pointer text-gray-600"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "🙈" : "👁️"}
          </span>
        </div>
        <button
          className="bg-blue-500 text-white px-4 py-2 mb-2 w-full"
          onClick={handleLogin}
        >
          Login
        </button>
        <p className="text-sm text-gray-600">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-blue-500 cursor-pointer"
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
