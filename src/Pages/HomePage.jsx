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
          "https://images.unsplash.com/photo-1606813908887-39ef98a0c3f7?auto=format&fit=crop&w=800&q=80",
        likes: 0,
      },
      {
        id: 2,
        name: "Classic Sneakers",
        description: "Everyday sneakers that combine comfort and timeless design.",
        image:
          "https://images.unsplash.com/photo-1589187155474-06b7f4d4e8f2?auto=format&fit=crop&w=800&q=80",
        likes: 0,
      },
      {
        id: 3,
        name: "Trail Blazers",
        description: "Durable shoes built for outdoor adventures and rough terrain.",
        image:
          "https://images.unsplash.com/photo-1606813881713-49a09f9e2519?auto=format&fit=crop&w=800&q=80",
        likes: 0,
      },
      {
        id: 4,
        name: "Street Flex",
        description: "Urban sneakers that blend comfort with bold street style.",
        image:
          "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80",
        likes: 0,
      },
      {
        id: 5,
        name: "Runner Pro",
        description: "Engineered for long-distance comfort and durability.",
        image:
          "https://images.unsplash.com/photo-1600180758890-6b94519a8ba0?auto=format&fit=crop&w=800&q=80",
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
