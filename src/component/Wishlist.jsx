import { useEffect, useState } from "react";

export default function Wishlist() {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/wishlist")
      .then((res) => res.json())
      .then(setWishlist);
  }, []);

  return (
    <div>
      <h2>Wishlist</h2>
      {wishlist.map((item) => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
}
