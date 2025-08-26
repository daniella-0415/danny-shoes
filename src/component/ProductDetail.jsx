import { useParams } from "react-router-dom";
import { useCart } from "../Pages/CartContext";
import { useState } from "react";

export default function ProductDetail() {
  const { id } = useParams();
  const { cart, addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const products = [
    { id: "1", name: "Nike Air", description: "Comfortable running shoes", price: 120 },
    { id: "2", name: "Adidas UltraBoost", description: "High-performance sneakers", price: 140 },
  ];

  const product = products.find((p) => p.id === id);
  const inCart = cart.find((item) => item.id === id)?.quantity || 0;

  if (!product) return <h2>Invalid product ID</h2>;

  const handleAddToCart = () => {
    addToCart(product);                 // ✅ Add to cart
    alert(`${product.name} has been added to your cart!`); // ✅ Show alert
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>
        <strong>Price:</strong> ${product.price}
      </p>
      {inCart > 0 && <p>In Cart: {inCart}</p>}

      <button
        onClick={handleAddToCart}
        style={{
          background: added ? "gray" : "green",
          color: "white",
          padding: "10px 20px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          transition: "transform 0.2s, background 0.2s",
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
        onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
        disabled={added}
      >
        {added ? "Added!" : "Add to Cart"}
      </button>
    </div>
  );
}
