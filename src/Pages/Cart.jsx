// src/CartPage.jsx
import React from "react";
import { useCart } from "./CartContext";

const CartPage = () => {
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity, cartTotal } = useCart();

  if (!cart || cart.length === 0) {
    return <h2>Your cart is empty</h2>;
  }

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>
      {cart.map((item) => (
        <div key={item._id} className="cart-item">
          <img src={item.image} alt={item.name} className="cart-image" />

          <div className="cart-details">
            <h3>{item.name}</h3>
            <p>R {item.price}</p>
            <p>Quantity: {item.quantity}</p>

            <div className="cart-actions">
              <button onClick={() => increaseQuantity(item._id)}>+</button>
              <button onClick={() => decreaseQuantity(item._id)}>-</button>
              <button onClick={() => removeFromCart(item._id)}>Remove</button>
            </div>
          </div>
        </div>
      ))}

      <h3>Total: R {cartTotal}</h3>
    </div>
  );
};

export default CartPage;
