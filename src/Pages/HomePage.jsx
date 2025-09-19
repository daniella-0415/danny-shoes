import React, { useState, useEffect } from "react";
import "./HomePage.css";

const Homepage = () => {
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState("");
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:3000/products");
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();

      const productsWithState = data.map((p) => ({
        ...p,
        likes: p.likes || 0,
      }));

      setProducts(productsWithState);
    } catch (error) {
      setMessage("Failed to fetch products: " + error.message);
    }
  };

  const updateLikes = (id, delta) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, likes: Math.max(p.likes + delta, 0) } : p
      )
    );
  };

  const toggleWishlist = (id) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((wid) => wid !== id) : [...prev, id]
    );
  };

  // Smooth scroll handler
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
          <h1> DANNY'S SHOES Step Into Style</h1>
          <p>Shop the latest Footwear from DANNY'S SHOES</p>
          <button className="shop-button" onClick={scrollToProducts}>
            Shop Now
          </button>
        </div>
      </section>

      {/* ✅ Product Section */}
      <h2 id="products">Our Products</h2>
      {message && <p className="error-message">{message}</p>}

      <div className="product-list">
        {products.length > 0 ? (
          products.map((product, index) => (
            <div
              key={product.id ?? index}
              className="product-item fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {product.image && (
                <img
                src={product.image.replace("data :","")}
                  alt={product.name}
                  className="product-image"
                />
              )}
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

      

      {/*  Footer */}
      <footer className="footer">
        <p>© {new Date().getFullYear()} DANNY'S SHOES. All rights reserved.</p>
        <p>Made with ❤️ and React</p>
      </footer>
    </div>



  );
};

export default Homepage;
