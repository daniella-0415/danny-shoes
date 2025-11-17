import React from "react";
import { useCart } from "./CartContext"; // adjust path if necessary

export default function Cart() {
  const { cart, addToCart, decreaseQuantity, removeFromCart } = useCart();

  return (
    <div className="cart-page" style={{ padding: "20px" }}>
      <h2>Your Cart</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {cart.map((item) => (
            <li
              key={item.id}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "15px",
                borderBottom: "1px solid #ccc",
                paddingBottom: "10px",
              }}
            >
              {/* Product Image */}
              <img
                src={item.image}
                alt={item.name}
                style={{
                  width: "80px",
                  height: "80px",
                  objectFit: "cover",
                  borderRadius: "10px",
                  marginRight: "15px",
                }}
              />

              {/* Product Info */}
              <div style={{ flex: 1 }}>
                <h4 style={{ margin: "0 0 5px 0" }}>{item.name}</h4>
                <p style={{ margin: 0 }}>Price: R{item.price}</p>
              </div>

              {/* Quantity Controls */}
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <button
                  onClick={() => decreaseQuantity(item.id)}
                  style={{
                    padding: "4px 10px",
                    backgroundColor: "#ddd",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  −
                </button>

                <span>{item.quantity}</span>

                <button
                  onClick={() => addToCart(item)}
                  style={{
                    padding: "4px 10px",
                    backgroundColor: "#4CAF50",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  +
                </button>
              </div>

              {/* Remove Button */}
              <button
                onClick={() => removeFromCart(item.id)}
                style={{
                  marginLeft: "15px",
                  backgroundColor: "#ff4d4d",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  padding: "6px 10px",
                  cursor: "pointer",
                }}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
