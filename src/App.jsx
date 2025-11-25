import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { CartProvider } from "./Pages/CartContext"; 
import Homepage from "./Pages/HomePage";
import ProductPage from "./Pages/ProductPage";
import SignIn from "./Pages/SignIn";
import Signup from "./Pages/Signup";
import Category from "./Pages/Category";
import Cart from "./Pages/Cart";
import Wishlist from "./Pages/Wishlist";
import Checkout from "./Pages/Checkout";
import Shipping from "./Pages/Shipping";
import PaymentMethod from "./Pages/PaymentMethod";
import Order from "./Pages/Order";
import Footer from "./Pages/Footer";
import Payment from "./Pages/Payment";
import "./App.css";

export default function App() {
  const [theme, setTheme] = useState("light");
  const [products, setProducts] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  // ✅ Handle Theme Toggle
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  // ✅ Handle Wishlist
  const toggleWishlist = (id) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((wid) => wid !== id) : [...prev, id]
    );
  };

  return (
    <Router>
      <CartProvider>
        <div>
          {/* ✅ Navigation Bar */}
          <nav
            style={{
              background: "#333",
              padding: "10px 0",
              textAlign: "center",
            }}
          >
            <Link to="/" style={linkStyle}>Home</Link>
            <Link to="/category" style={linkStyle}>Category</Link>
            <Link to="/cart" style={linkStyle}>Cart</Link>
            {/* <Link to="/wishlist" style={linkStyle}>Wishlist</Link> */}
            <Link to="/checkout" style={linkStyle}>Checkout</Link>
            <Link to="/payment" style={linkStyle}>Payment</Link>
            <Link to="/order" style={linkStyle}>Order</Link>
            <Link to="/signin" style={linkStyle}>Sign In</Link>
            <Link to="/signup" style={linkStyle}>Sign Up</Link>

            <button
              onClick={toggleTheme}
              style={{
                marginLeft: "15px",
                background: "#007bff",
                color: "#fff",
                border: "none",
                padding: "6px 10px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Toggle Theme
            </button>
          </nav>

          {/* ✅ Routes */}
          <main style={{ padding: "20px" }}>
            <Routes>
              <Route
                path="/"
                element={
                  <Homepage
                    products={products}
                    setProducts={setProducts}
                    wishlist={wishlist}
                    toggleWishlist={toggleWishlist}
                  />
                }
              />
              <Route path="/products/:id" element={<ProductPage />} />
              <Route path="/category" element={<Category />} />
              <Route path="/cart" element={<Cart />} />
              <Route
                path="/wishlist"
                element={
                  <Wishlist
                    products={products}
                    wishlist={wishlist}
                    toggleWishlist={toggleWishlist}
                  />
                }
              />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/shipping" element={<Shipping />} />
              <Route path="/payment-method" element={<PaymentMethod />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/order" element={<Order />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </CartProvider>
    </Router>
  );
}

// ✅ Reusable Link Style
const linkStyle = {
  color: "white",
  marginRight: "15px",
  textDecoration: "none",
  fontWeight: "bold",
};