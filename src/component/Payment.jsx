import { useNavigate } from "react-router-dom";

export default function Payment() {
  const navigate = useNavigate();

  const handlePay = () => {
    alert("Payment Successful!");
    navigate("/orders");
  };

  return (
    <div>
      <h2>Payment Page</h2>
      <button onClick={handlePay}>Pay Now</button>
    </div>
  );
}
