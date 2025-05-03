import React, { useState } from "react";
import api from "../api";

const Auth = ({ onAuth }) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async () => {
    if (!username || !email || !password) {
      setError("All fields required for signup");
      return;
    }

    try {
      const res = await api.post("/auth/signup", { username, email, password });
      onAuth(res.data.user);
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Email and password required for login");
      return;
    }

    try {
      const res = await api.post("/auth/login", { email, password });
      onAuth(res.data.user);
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-4 border rounded shadow">
      <h2 className="text-2xl mb-4">Login or Signup</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <input
        className="border p-2 mb-2 w-full"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="border p-2 mb-2 w-full"
        placeholder="Username (signup only)"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        className="border p-2 mb-4 w-full"
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 mr-2"
        onClick={handleLogin}
      >
        Login
      </button>
      <button
        className="bg-green-500 text-white px-4 py-2"
        onClick={handleSignup}
      >
        Signup
      </button>
    </div>
  );
};

export default Auth;
