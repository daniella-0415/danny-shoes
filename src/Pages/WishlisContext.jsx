// src/WishlistPage.jsx
import React, { useEffect, useState } from "react";
import { useWishlist } from "./context/WishlistContext";

const WishlistPage = () => {
  const { wishlist, toggleWishlist } = useWishlist();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:3000/products");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProducts();
  }, []);

  const wishlistItems = products.filter(p => wishlist.includes(p._id));

  if (!wishlistItems.length) return <h2>Your wishlist is empty</h2>;

  return (
    <div className="wishlist-page">
      <h2>Wishlist</h2>
      {wishlistItems.map(item => (
        <div key={item._id} className="wishlist-item">
          <img src={item.image} alt={item.name} className="wishlist-image" />
          <div>
            <h3>{item.name}</h3>
            <p>R {item.price}</p>
            <button onClick={() => toggleWishlist(item._id)}>Remove ❤️</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WishlistPage;