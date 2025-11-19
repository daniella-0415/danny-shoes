import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../Pages/CartContext";

export default function ProductPage() {
  const { category } = useParams(); // get category from URL
  const { cart, addToCart } = useCart();

  const [products, setProducts] = useState([
    { id: 1, name: "Nike Air Max", price: 2200, img: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500&auto=format&fit=crop&q=60", likes: 0, wishlist: false, category: "sneakers" },
    { id: 2, name: "sandals", price: 2500, img: "https://images.unsplash.com/photo-1677922336239-d6978d0d2af2?w=500&auto=format&fit=crop&q=60", likes: 0, wishlist: false, category: "sandal" },
    { id: 3, name: "sandals", price: 1800, img: "https://images.unsplash.com/photo-1720019315408-457a3ef0bcfd?w=500&auto=format&fit=crop&q=60", likes: 0, wishlist: false, category: "sandal" },
    { id: 4, name: "heels", price: 1900, img: "https://images.unsplash.com/photo-1585488434451-7ee645d0574b?w=500&auto=format&fit=crop&q=60", likes: 0, wishlist: false, category: "heels" },
    { id: 5, name: "sneakers", price: 2100, img: "https://images.unsplash.com/photo-1621665421571-2d325f9c7c6a?w=500&auto=format&fit=crop&q=60", likes: 0, wishlist: false, category: "sneakers" },
    { id: 6, name: "heels", price: 1700, img: "https://images.unsplash.com/photo-1678924722426-d10bb7f61526?w=500&auto=format&fit=crop&q=60", likes: 0, wishlist: false, category: "heels" },
    
    { id: 7, name: "boots", price: 2000, img: "https://images.unsplash.com/photo-1608629601270-a0007becead3?w=500&auto=format&fit=crop&q=60", likes: 0, wishlist: false, category: "boots" },
    { id: 8, name: "boots", price: 2000, img: "https://images.unsplash.com/photo-1605733160314-4fc7dac4bb16?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Ym9vdHN8ZW58MHx8MHx8fDA%3D", likes: 0, wishlist: false, category: "boots" },
    { id: 9, name: "boots", price: 2000, img: "https://plus.unsplash.com/premium_photo-1671718111684-9142a70a5fe0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Ym9vdHN8ZW58MHx8MHx8fDA%3D", likes: 0, wishlist: false, category: "boots" },
    { id: 10, name: "sneakers", price: 2100, img: "https://images.unsplash.com/photo-1608667508764-33cf0726b13a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c25lYWtlcnN8ZW58MHx8MHx8fDA%3D", likes: 0, wishlist: false, category: "sneakers" },
    { id: 11, name: "sneakers", price: 2100, img: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHNuZWFrZXJzfGVufDB8fDB8fHww", likes: 0, wishlist: false, category: "sneakers" },
      
  ]);

  const [addedProductIds, setAddedProductIds] = useState([]);

  // Filter products by category
  const filteredProducts = category
    ? products.filter(p => p.category === category.toLowerCase())
    : products;

  // Add to cart
  const handleAddToCart = (product) => {
    addToCart(product);
    setAddedProductIds(prev => [...prev, product.id]);
    alert(`${product.name} has been added to your cart!`);
    setTimeout(() => {
      setAddedProductIds(prev => prev.filter(id => id !== product.id));
    }, 1500);
  };

  // Likes
  const handleLike = (id) => setProducts(products.map(p => p.id === id ? { ...p, likes: p.likes + 1 } : p));
  const handleUnlike = (id) => setProducts(products.map(p => p.id === id && p.likes > 0 ? { ...p, likes: p.likes - 1 } : p));

  // Wishlist
  const handleWishlist = (id) => setProducts(products.map(p => p.id === id ? { ...p, wishlist: !p.wishlist } : p));

  return (
    <div className="product-page">
      <h2>{category ? category.charAt(0).toUpperCase() + category.slice(1) : "Our"} Products</h2>
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        {filteredProducts.map(p => {
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
              <img src={p.img} alt={p.name} style={{ width: "200px", height: "150px", objectFit: "cover", borderRadius: "8px" }} />
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

              {/* Likes */}
              <div className="likes">
                <button onClick={() => handleLike(p.id)}>👍 Like</button>
                <button onClick={() => handleUnlike(p.id)}>👎 Unlike</button>
                <p>{p.likes} likes</p>
              </div>
              {/* Wishlist */}
              {/* <div className="wishlist">
                <button onClick={() => handleWishlist(p.id)}>
                  {p.wishlist ? "💔 Remove from Wishlist" : "❤️ Add to Wishlist"}
                </button>
              </div> */}
            </div>
          );
        })}
      </div>
    </div>
  );
}
