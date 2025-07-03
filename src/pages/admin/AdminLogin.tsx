import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css"; // Uses the CSS you just provided

const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("loggedIn");
    const expiry = localStorage.getItem("sessionExpiry");

    if (isLoggedIn === "true" && expiry && Date.now() < Number(expiry)) {
      navigate("/admin/dashboard", { replace: true });
    }
  }, [navigate]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    const correctPassword = import.meta.env.VITE_ADMIN_PASSWORD;

    if (password === correctPassword) {
      const expiry = Date.now() + 60 * 60 * 1000; // 1 hour
      localStorage.setItem("loggedIn", "true");
      localStorage.setItem("sessionExpiry", expiry.toString());
      navigate("/admin/dashboard", { replace: true });
    } else {
      setError("❌ Incorrect password. Please try again.");
    }
  };

  return (
    <div className="login-form-container">
      <div className="login-card">
        <h2>🔐 Admin Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="password"
            placeholder="Enter admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
          {error && <p className="error-text">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
