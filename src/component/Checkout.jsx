import { useCart } from "./CartContext";
import { Link } from "react-router-dom";

export default function Checkout() {
  const { cart } = useCart();
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div>
      <h2>Checkout</h2>
      {cart.map((item) => (
        <div key={item.id}>
          {item.name} - ${item.price}
        </div>
      ))}
      <h3>Total: ${total}</h3>
      <Link to="/shipping">Enter Shipping Details</Link>
    </div>
  );
}
