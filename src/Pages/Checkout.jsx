import React from "react";
import { useCart } from "../Pages/CartContext"; // ✅ import useCart
import { Link } from "react-router-dom";        // ✅ import Link
import "./Checkout.css";

export default function Checkout() {
  const { cart } = useCart ();

  // Ensure price is a number (parseFloat handles strings like "2000" or "2000.50")
  const total = cart.reduce(
    (sum, item) => sum + parseFloat(item.price) * (item.quantity || 1),
    0
  );

  return (
    <div className="checkout-page" style={{ padding: "20px" }}>
      <h2>Checkout</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        cart.map((item) => {
          const price = parseFloat(item.price) || 0;
          const qty = item.quantity || 1;
          return (
            <div key={item.id} style={{ marginBottom: "10px" }}>
              {item.name} - ${price} x {qty} = ${price * qty}
            </div>
          );
        })
      )}

      <h3>Total: ${total}</h3>

      <Link
        to="/shipping"
        style={{
          display: "inline-block",
          marginTop: "15px",
          padding: "10px 20px",
          background: "green",
          color: "white",
          textDecoration: "none",
          borderRadius: "5px",
        }}
      >
        Enter Shipping Details
      </Link>
    </div>
  );
}
