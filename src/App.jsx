// src/App.jsx
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { CartProvider } from "./Pages/CartContext"; // ✅ import CartProvider
import Homepage from "./Pages/HomePage";
import ProductPage from "./Pages/ProductPage";
import SignIn from "./Pages/SignIn";
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

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

  const toggleWishlist = (id) =>
    wishlist.includes(id)
      ? setWishlist(wishlist.filter((wid) => wid !== id))
      : setWishlist([...wishlist, id]);

  return (
    <Router>
      <CartProvider> {/* ✅ Wrap everything with CartProvider */}
        <div>
          <nav>
            <Link to="/">Home</Link> | 
            <Link to="/category">Category</Link> | 
            <Link to="/cart">Cart</Link> | 
            <Link to="/wishlist">Wishlist</Link> | 
            <Link to="/checkout">Checkout</Link> | 
            <Link to="/payment">Payment</Link> | 
            <Link to="/order">Order</Link> | 
            <Link to="/signin">Sign In</Link>
            <button onClick={toggleTheme} style={{ marginLeft: "10px" }}>
              Toggle Theme
            </button>
          </nav>

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
            <Route path="/products/:id" element={<ProductPage />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/category" element={<Category />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/shipping" element={<Shipping />} />
            <Route path="/payment-method" element={<PaymentMethod />} />
            <Route path="/order" element={<Order />} />
            <Route path="/payment" element={<Payment />} />
          </Routes>
          <Footer />
        </div>
      </CartProvider>
    </Router>
  );
}
