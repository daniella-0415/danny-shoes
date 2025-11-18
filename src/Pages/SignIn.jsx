import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signin() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const API = "http://13.51.6.193:3000";  // ✅ EC2 backend

      const response = await fetch(`${API}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const text = await response.text();
      const data = text ? JSON.parse(text) : {};

      setLoading(false);

      if (response.ok) {
        setMessage("✅ Login successful!");
        setTimeout(() => navigate("/"), 1000);
      } else {
        setMessage(data.error || "❌ Login failed");
      }
    } catch (err) {
      setLoading(false);
      setMessage("⚠️ Error: " + err.message);
    }
  };

  return (
    <div
      className="signin-container"
      style={{ textAlign: "center", marginTop: "60px" }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          display: "inline-block",
          padding: "30px",
          border: "1px solid #ccc",
          borderRadius: "12px",
          width: "300px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        }}
      >
        <h2>Sign In</h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
        />
        <br />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
        />
        <br />

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "8px",
            border: "none",
            borderRadius: "6px",
            background: "#007bff",
            color: "white",
            cursor: "pointer",
          }}
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>

        {message && <p style={{ marginTop: "10px" }}>{message}</p>}
      </form>
    </div>
  );
}
