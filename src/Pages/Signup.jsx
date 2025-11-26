import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
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
      // Combine firstName and lastName into name for backend
      const payload = {
        name: `${form.firstName} ${form.lastName}`,
        email: form.email,
        password: form.password,
      };

      console.log("Sending payload:", payload);

      // Use direct backend URL
      const response = await fetch("http://16.171.156.22:3000/api/users/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      console.log("Response status:", response.status);

      const text = await response.text();
      console.log("Response text:", text);

      const data = text ? JSON.parse(text) : {};

      setLoading(false);

      if (response.ok) {
        setMessage("✅ Signup successful!");
        setTimeout(() => navigate("/signin"), 1200);
      } else {
        setMessage(data.message || `❌ ${text || "Signup failed"}`);
      }
    } catch (err) {
      setLoading(false);
      setMessage("⚠️ Error: " + err.message);
      console.error("Fetch error:", err);
    }
  };

  return (
    <div
      className="signup-container"
      style={{
        textAlign: "center",
        marginTop: "60px",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          display: "inline-block",
          padding: "30px",
          border: "1px solid #ccc",
          borderRadius: "12px",
          width: "320px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        }}
      >
        <h2>Sign Up</h2>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={form.firstName}
          onChange={handleChange}
          required
          style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
        />
        <br />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={form.lastName}
          onChange={handleChange}
          required
          style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
        />
        <br />
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
            background: "#28a745",
            color: "white",
            cursor: "pointer",
          }}
        >
          {loading ? "Signing up..." : "Sign Up"}
        </button>
        {message && <p style={{ marginTop: "10px" }}>{message}</p>}
      </form>
    </div>
  );
}