import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PaymentMethod() {
  const [method, setMethod] = useState("card");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("paymentMethod", method);
    navigate("/payment");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Select Payment Method</h2>
      <label>
        <input type="radio" value="card" checked={method === "card"} onChange={(e) => setMethod(e.target.value)} />
        Credit/Debit Card
      </label>
      <label>
        <input type="radio" value="paypal" checked={method === "paypal"} onChange={(e) => setMethod(e.target.value)} />
        PayPal
      </label>
      <button type="submit">Continue</button>
    </form>
  );
}
