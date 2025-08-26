import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Category() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/categories")
      .then((res) => res.json())
      .then(setCategories);
  }, []);

  return (
    <div>
      <h2>Categories</h2>
      <ul>
        {categories.map((c) => (
          <li key={c.id}>
            <Link to={`/products?category=${c.slug}`}>{c.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
