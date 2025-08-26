import React from "react";
import "./Wishlist.css";

const WishlistPage = ({ products, wishlist, toggleWishlist }) => {
  const wishlistItems = products.filter((p) => wishlist.includes(p.id));
  if (!wishlistItems.length) return <h2>Your wishlist is empty</h2>;

  return (
    <div className="wishlist-page">
      <h2>Wishlist</h2>
      {wishlistItems.map((item) => (
        <div key={item.id} className="wishlist-item">
          <img src={item.image} alt={item.name} className="wishlist-image" />
          <div>
            <h3>{item.name}</h3>
            <p>${item.price}</p>
            <button onClick={() => toggleWishlist(item.id)}>Remove ❤️</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WishlistPage;
