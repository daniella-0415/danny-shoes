import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchedUserId = localStorage.getItem("userId") || "USER123"; // Replace with real auth
    setUserId(fetchedUserId);
  }, []);

  useEffect(() => {
    if (!id || id === "undefined") {
      setError("Invalid product ID");
      return;
    }

    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:3000/products`);
        if (!res.ok) {
          if (res.status === 404) throw new Error("Product not found");
          if (res.status === 400) throw new Error("Invalid product ID");
          throw new Error("Failed to fetch product");
        }
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      }
    };

    const fetchReviews = async () => {
      try {
        const res = await fetch(`http://localhost:3000/products/${id}/reviews`);
        if (!res.ok) {
          if (res.status === 404) throw new Error("Product not found");
          if (res.status === 400) throw new Error("Invalid product ID");
          throw new Error("Failed to fetch reviews");
        }
        const data = await res.json();
        setReviews(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchProduct();
    fetchReviews();
  }, [id]);

  const submitReview = async (e) => {
    e.preventDefault();
    if (!comment.trim()) {
      setError("Comment is required");
      return;
    }
    if (!userId) {
      setError("You must be logged in to submit a review");
      return;
    }

    try {
      const newReview = { userId, rating, comment };
      const res = await fetch(`http://localhost:3000/products/${id}/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newReview),
      });
      if (!res.ok) throw new Error("Failed to submit review");

      const reviewsRes = await fetch(`http://localhost:3000/products/${id}/reviews`);
      if (!reviewsRes.ok) throw new Error("Failed to fetch updated reviews");
      const updated = await reviewsRes.json();
      setReviews(updated);
      setComment("");
      setRating(5);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const likeProduct = async () => {
    if (!userId) {
      setError("You must be logged in to like a product");
      return;
    }

    try {
      const res = await fetch(`http://localhost:3000/products/${id}/like`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });
      if (!res.ok) throw new Error("Failed to like product");
      const data = await res.json();
      setProduct((prev) => ({ ...prev, likes: data.likes }));
    } catch (err) {
      setError(err.message);
    }
  };

  const unlikeProduct = async () => {
    if (!userId) {
      setError("You must be logged in to unlike a product");
      return;
    }

    try {
      const res = await fetch(`http://localhost:3000/products/${id}/unlike`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });
      if (!res.ok) throw new Error("Failed to unlike product");
      const data = await res.json();
      setProduct((prev) => ({ ...prev, likes: data.likes }));
    } catch (err) {
      setError(err.message);
    }
  };

  const likeReview = async (reviewId) => {
    if (!userId) {
      setError("You must be logged in to like a review");
      return;
    }

    try {
      const res = await fetch(`http://localhost:3000/products/${id}/reviews/${reviewId}/like`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });
      if (!res.ok) throw new Error("Failed to like review");
      const data = await res.json();
      setReviews((prev) =>
        prev.map((r) =>
          r._id === reviewId ? { ...r, likes: data.likes } : r
        )
      );
    } catch (err) {
      setError(err.message);
    }
  };

  if (error) return <p className="text-red-600">Error: {error}</p>;
  if (!product) return <p>Loading...</p>; 
  
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{product.name}</h1>
      <img
        src={product.image || "https://via.placeholder.com/150"}
        alt={product.name || "Product image"}
        className="max-w-xs"
      />
      <p className="text-gray-600">{product.description}</p>
      <p className="font-semibold mt-2">Price: ${product.price}</p>

      <div className="mt-2 flex items-center gap-2">
        <button
          onClick={likeProduct}
          className="bg-green-600 text-white px-3 py-1 rounded"
        >
          👍 Like
        </button>
        <button
          onClick={unlikeProduct}
          className="bg-red-600 text-white px-3 py-1 rounded"
        >
          👎 Unlike
        </button>
        <span>{product.likes || 0} likes</span>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold">Reviews</h2>
        {reviews.length === 0 && <p>No reviews yet.</p>}
        <ul className="mt-2 space-y-2">
          {reviews.map((r) => (
            <li key={r._id} className="border p-2 rounded">
              <p className="font-medium">⭐ {r.rating}</p>
              <p>{r.comment}</p>
              <small className="text-gray-500">
                By {r.userId} on{" "}
                {r.date ? new Date(r.date).toLocaleDateString() : "Unknown date"}
              </small>
              <div className="mt-2 flex items-center gap-2">
                <button
                  onClick={() => likeReview(r._id)}
                  className="bg-blue-600 text-white px-2 py-1 rounded"
                >
                  👍 Like Review
                </button>
                <span>{r.likes || 0} likes</span>
              </div>
            </li>
          ))}
        </ul>

        <form onSubmit={submitReview} className="mt-4 space-y-2">
          <label className="block">
            Rating:
            <select
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="ml-2 border rounded"
            >
              {[1, 2, 3, 4, 5].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </label>

          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write your review..."
            className="w-full border p-2 rounded"
          />

          <button
            type="submit"
            className="bg-purple-600 text-white px-4 py-2 rounded"
          >
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
}