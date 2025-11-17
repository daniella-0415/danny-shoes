import React, { useState, useEffect } from "react";
import "./HomePage.css";

const Homepage = () => {
  const [products, setProducts] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    // ✅ Static product data with online images
    const staticProducts = [
      {
        id: 1,
        name: "Air Zoom",
        description: "Stylish and lightweight running shoes designed for performance.",
        image:
          "https://images.unsplash.com/photo-1491553895911-0055eca6402d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=580",
        likes: 0,
      },
      {
        id: 2,
        name: "Classic Heels",
        description: "Everyday heels that combine comfort and timeless design.",
        image:
          "https://images.unsplash.com/photo-1518049362265-d5b2a6467637?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTl8fHNob2VzfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=500",
        likes: 0,
      },
      {
        id: 3,
        name: "Trail Blazers",
        description: "Durable shoes built for outdoor adventures and rough terrain.",
        image:
          "https://plus.unsplash.com/premium_photo-1712767020436-18875018fca3?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTAxfHxzaG9lc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=500",
        likes: 0,
      },
      {
        id: 4,
        name: "Street Flex",
        description: "Urban sneakers that blend comfort with bold street style.",
        image:
          "https://images.unsplash.com/photo-1678784973551-f38208de2529?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTZ8fGhlZWxzfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=500",
        likes: 0,
      },
      
      {
        id: 5,
        name: "Runner Pro",
        description: "Engineered for long-distance comfort and durability.",
        image:
          "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHNob2VzfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=500",
        likes: 0,
      },

      {
        id: 6,
        name: "Sandals",
        description: "Engineered for long-distance comfort and durability.",
        image:
          "https://images.unsplash.com/photo-1585120824848-8a5cd41493d2?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8c2FuZGFsc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=500",
        likes: 0,
      },

      {
        id: 7,
        name: "Boots",
        description: "Engineered for long-distance comfort and durability.",
        image:
          "https://images.unsplash.com/photo-1601924638867-3a6de6b7a500?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Ym9vdHN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=500",
        likes: 0,
      },

      {
        id: 8,
        name: "Boots",
        description: "Engineered for long-distance comfort and durability.",
        image:
          "https://plus.unsplash.com/premium_photo-1671718110912-2bf5ce67d504?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzQ3fHxoZWVsc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=500",
        likes: 0,
      },
    ];

    setProducts(staticProducts);
  }, []);

  // ✅ Like button handler
  const updateLikes = (id, delta) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, likes: Math.max(p.likes + delta, 0) } : p
      )
    );
  };

  // ✅ Wishlist handler
  const toggleWishlist = (id) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((wid) => wid !== id) : [...prev, id]
    );
  };

  // ✅ Smooth scroll to product section
  const scrollToProducts = () => {
    const productsSection = document.getElementById("products");
    productsSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="homepage-container">
      {/* ✅ Navbar */}
      <nav className="navbar">
        <div className="navbar-logo">DANNY'S SHOES</div>
      </nav>

      {/* ✅ Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Step Into Style with DANNY'S SHOES</h1>
          <p>Shop the latest footwear and elevate your look today.</p>
          <button className="shop-button" onClick={scrollToProducts}>
            Shop Now
          </button>
        </div>
      </section>

      {/* ✅ Product Section */}
      <h2 id="products">Our Products</h2>

      <div className="product-list">
        {products.length > 0 ? (
          products.map((product, index) => (
            <div
              key={product.id}
              className="product-item fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <img
                src={product.image}
                alt={product.name}
                className="product-image"
              />
              <h3>{product.name}</h3>
              <p>{product.description}</p>

              <div className="likes">
                <button onClick={() => updateLikes(product.id, 1)}>👍 Like</button>
                <button onClick={() => updateLikes(product.id, -1)}>👎 Unlike</button>
                <p>{product.likes} likes</p>
              </div>

              <div className="wishlist">
                <button onClick={() => toggleWishlist(product.id)}>
                  {wishlist.includes(product.id)
                    ? "❤️ Remove from Wishlist"
                    : "🤍 Add to Wishlist"}
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No products available.</p>
        )}
      </div>

      {/* ✅ Footer */}
      <footer className="footer">
        <p>© {new Date().getFullYear()} DANNY'S SHOES. All rights reserved.</p>
        <p>Made with ❤️ and React</p>
      </footer>
    </div>
  );
};

export default Homepage;
