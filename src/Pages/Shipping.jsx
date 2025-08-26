import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Shipping() {
  const [form, setForm] = useState({ address: "", city: "", postal: "" });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("shipping", JSON.stringify(form));
    navigate("/payment-method");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Shipping Details</h2>
      <input placeholder="Address" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
      <input placeholder="City" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
      <input placeholder="Postal Code" value={form.postal} onChange={(e) => setForm({ ...form, postal: e.target.value })} />
      <button type="submit">Continue</button>
    </form>
  );
}
