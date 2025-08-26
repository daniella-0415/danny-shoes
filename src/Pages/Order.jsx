// src/Pages/Order.jsx
import React from "react";
import { useCart } from "./CartContext";

export default function Order() {
  const { cart, clearCart } = useCart();
  const shipping = JSON.parse(localStorage.getItem("shippingDetails")) || {};
  const payment = localStorage.getItem("paymentStatus") || "Pending";

  return (
    <div>
      <h2>Order Confirmation</h2>

      <h3>🛍️ Items Ordered</h3>
      {cart.length > 0 ? (
        <ul>
          {cart.map((item, index) => (
            <li key={index}>
              <strong>{item.name}</strong> — ${item.price} (x{item.quantity || 1})
            </li>
          ))}
        </ul>
      ) : (
        <p>No items in cart.</p>
      )}

      <h3>🚚 Shipping Details</h3>
      <p><strong>Name:</strong> {shipping.name}</p>
      <p><strong>Address:</strong> {shipping.address}</p>
      <p><strong>City:</strong> {shipping.city}</p>
      <p><strong>ZIP:</strong> {shipping.zip}</p>

      <h3>💳 Payment</h3>
      <p>{payment}</p>

      <h3>🎉 Thank you for your order!</h3>

      <button onClick={clearCart}>Clear Cart</button>
    </div>
  );
}
