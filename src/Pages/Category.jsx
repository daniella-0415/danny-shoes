import React from "react";
import { Link } from "react-router-dom";
import "./Category.css";

export default function Category() {
  const categories = ["Sneakers", "Boots", "Sandals", "Heels"];

  return (
    <div className="category-container">
      <h2>Shop by Category</h2>
      <div className="category-grid">
        {categories.map((cat, index) => (
          <Link key={index} to={`/products/${cat.toLowerCase()}`} className="category-card">
            {cat}
          </Link>
        ))}
      </div>
    </div>
  );
}
