import React from "react";
import { useCart } from "../Pages/CartContext"; // ✅ import useCart
import { Link } from "react-router-dom";        // ✅ import Link
import "./Checkout.css";

export default function Checkout() {
  const { cart } = useCart();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0); // include quantity

  return (
    <div className="checkout-page" style={{ padding: "20px" }}>
      <h2>Checkout</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        cart.map((item) => (
          <div key={item.id} style={{ marginBottom: "10px" }}>
            {item.name} - ${item.price} x {item.quantity} = ${item.price * item.quantity}
          </div>
        ))
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
