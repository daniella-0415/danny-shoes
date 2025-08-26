import React, { useState } from "react";
import { useCart } from "../Pages/CartContext"; // ✅ import CartContext

export default function ProductPage() {
  const { cart, addToCart } = useCart(); // ✅ use context
  const [products, setProducts] = useState([
    { id: 1, name: "Nike Air Max", price: 2200, img: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500&auto=format&fit=crop&q=60", likes: 0, wishlist: false },
    { id: 2, name: "Adidas Ultraboost", price: 2500, img: "https://images.unsplash.com/photo-1677922336239-d6978d0d2af2?w=500&auto=format&fit=crop&q=60", likes: 0, wishlist: false },
    { id: 3, name: "Puma Classic", price: 1800, img: "https://images.unsplash.com/photo-1720019315408-457a3ef0bcfd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8fHw%3D", likes: 0, wishlist: false },
    { id: 4, name: "Puma Runner", price: 1900, img: "https://images.unsplash.com/photo-1585488434451-7ee645d0574b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDV8fHxlbnwwfHx8fHw%3D", likes: 0, wishlist: false },
    { id: 5, name: "Puma Sport", price: 2100, img: "https://images.unsplash.com/photo-1621665421571-2d325f9c7c6a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDIxfHx8ZW58MHx8fHx8", likes: 0, wishlist: false },
    { id: 6, name: "Puma Flex", price: 1700, img: "https://images.unsplash.com/photo-1678924722426-d10bb7f61526?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDIyfHx8ZW58MHx8fHx8", likes: 0, wishlist: false },
    { id: 7, name: "Puma Retro", price: 2000, img: "https://images.unsplash.com/photo-1608629601270-a0007becead3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDkwfHx8ZW58MHx8fHx8", likes: 0, wishlist: false },
  ]);

  const [addedProductIds, setAddedProductIds] = useState([]);

  // Handle Add to Cart
  const handleAddToCart = (product) => {
    addToCart(product); // ✅ add to cart context
    setAddedProductIds((prev) => [...prev, product.id]);
    alert(`${product.name} has been added to your cart!`);
    setTimeout(() => {
      setAddedProductIds((prev) => prev.filter(id => id !== product.id));
    }, 1500);
  };

  // Handle like/unlike
  const handleLike = (id) => setProducts(products.map(p => p.id === id ? { ...p, likes: p.likes + 1 } : p));
  const handleUnlike = (id) => setProducts(products.map(p => p.id === id && p.likes > 0 ? { ...p, likes: p.likes - 1 } : p));

  // Handle wishlist
  const handleWishlist = (id) => setProducts(products.map(p => p.id === id ? { ...p, wishlist: !p.wishlist } : p));

  return (
    <div className="product-page">
      <h2>Our Products</h2>
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        {products.map((p) => {
          const isAdded = addedProductIds.includes(p.id);
          const inCart = cart.find(item => item.id === p.id)?.quantity || 0;

          return (
            <div
              key={p.id}
              style={{
                border: "1px solid #ccc",
                padding: "15px",
                borderRadius: "10px",
                width: "230px",
                textAlign: "center",
                background: "#fff",
                boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
              }}
            >
              <img
                src={p.img}
                alt={p.name}
                style={{ width: "200px", height: "150px", objectFit: "cover", borderRadius: "8px" }}
              />
              <h3>{p.name}</h3>
              <p style={{ fontWeight: "bold", color: "#333" }}>R {p.price}</p>

              <button
                onClick={() => handleAddToCart(p)}
                style={{
                  marginBottom: "10px",
                  background: isAdded ? "gray" : "green",
                  color: "white",
                  padding: "8px 15px",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  transition: "transform 0.2s, background 0.2s"
                }}
                onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
                onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
                disabled={isAdded}
              >
                {isAdded ? "Added!" : inCart > 0 ? `Add to Cart (${inCart})` : "Add to Cart"}
              </button>

              {/* Likes Section */}
              <div className="likes">
                <button onClick={() => handleLike(p.id)}>👍 Like</button>
                <button onClick={() => handleUnlike(p.id)}>👎 Unlike</button>
                <p>{p.likes} likes</p>
              </div>

              {/* Wishlist Section */}
              <div className="wishlist">
                <button onClick={() => handleWishlist(p.id)}>
                  {p.wishlist ? "💔 Remove from Wishlist" : "❤️ Add to Wishlist"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
