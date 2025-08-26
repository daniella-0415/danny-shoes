// src/Pages/Cart.jsx
import React from "react";
import { useCart } from "./CartContext";

export default function Cart() {
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity, cartTotal } = useCart();

  if (cart.length === 0) return <h2>Your cart is empty</h2>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Your Cart</h2>
      {cart.map((item) => (
        <div
          key={item.id}
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "15px",
            borderBottom: "1px solid #ccc",
            paddingBottom: "10px",
          }}
        >
          {item.image && (
            <img
              src={item.image}
              alt={item.name}
              style={{ width: "80px", marginRight: "15px" }}
            />
          )}
          <div style={{ flex: 1 }}>
            <h3>{item.name}</h3>
            <p>Price: ${item.price}</p>
            <p>Quantity: {item.quantity}</p>
            <div style={{ display: "flex", gap: "5px", marginTop: "5px" }}>
              <button
                onClick={() => increaseQuantity(item.id)}
                style={{ padding: "5px 10px", cursor: "pointer" }}
              >
                +
              </button>
              <button
                onClick={() => decreaseQuantity(item.id)}
                style={{ padding: "5px 10px", cursor: "pointer" }}
              >
                -
              </button>
              <button
                onClick={() => removeFromCart(item.id)}
                style={{
                  padding: "5px 10px",
                  cursor: "pointer",
                  background: "red",
                  color: "white",
                  border: "none",
                  borderRadius: "3px",
                }}
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      ))}
      <h3>Total: ${cartTotal}</h3>
    </div>
  );
}
