import React, { useState } from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import "./Footer.css";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("")

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setMessage(`Subscribed with ${email}!`);
      setEmail("");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-left">
          <h3>DANNY'S SHOES</h3>
          <p>Step into style with the latest sneakers and sportswear.</p>
          <div className="social-icons">
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaLinkedinIn /></a>
          </div>
        </div>

        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/category">Category</a></li>
            <li><a href="/cart">Cart</a></li>
            <li><a href="/wishlist">Wishlist</a></li>
          </ul>
        </div>

        <div className="footer-newsletter">
          <h4>Subscribe to Newsletter</h4>
          <form onSubmit={handleSubscribe}>
            <input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit">Subscribe</button>
          </form>
          {message && <p className="subscribe-message">{message}</p>}
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} DANNY'S SHOES. All rights reserved.</p>
      </div>
    </footer>
  );
}
