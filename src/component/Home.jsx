import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css"; // Add this line

export default function Home() {
  const navigate = useNavigate();

  return (
    <>
    
    <div className="home">
      <h1>Welcome to DANNY'S SHOES</h1>
      <section className="hero" aria-labelledby="hero-title">
        <h2 id="hero-title">Step Into Style</h2>
        <p>Shop the latest sneakers and sportswear.</p>
        <button
          onClick={() => navigate("/products")}
          className="browse-button"
          aria-label="Browse our product collection"
        >
          Browse Products
        </button>
      </section>
    </div>
    </>
  );
}