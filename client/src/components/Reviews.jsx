import { useEffect, useState } from "react";

import API from "../api/axios";

function Reviews({ carId }) {
  const [reviews, setReviews] = useState([]);

  const [rating, setRating] = useState(5);

  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const { data } = await API.get(`/reviews/${carId}`);

        setReviews(data.reviews);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [carId]);

  const submitReview = async () => {
    try {
      await API.post("/reviews", {
        carId,
        rating: Number(rating),
        comment,
      });

      setComment("");

      const { data } = await API.get(`/reviews/${carId}`);
      setReviews(data.reviews);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mt-20">
      <h2 className="text-3xl font-bold mb-8">Reviews</h2>

      {/* Add Review */}

      <div className="bg-white p-6 rounded-2xl shadow mb-8">
        <select
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          className="border p-3 rounded mb-4 w-full"
        >
          <option value="5">⭐⭐⭐⭐⭐</option>

          <option value="4">⭐⭐⭐⭐</option>

          <option value="3">⭐⭐⭐</option>

          <option value="2">⭐⭐</option>

          <option value="1">⭐</option>
        </select>

        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write your review..."
          className="border p-3 rounded w-full h-28"
        />

        <button
          onClick={submitReview}
          className="mt-4 bg-cyan-600 text-white px-6 py-3 rounded-xl"
        >
          Submit Review
        </button>
      </div>

      {/* Reviews */}

      <div className="space-y-6">
        {loading ? (
          <p className="text-gray-500">Loading reviews...</p>
        ) : reviews.length === 0 ? (
          <p className="text-gray-500">No reviews yet.</p>
        ) : reviews.map((review) => (
          <div key={review._id} className="bg-white p-6 rounded-2xl shadow">
            <div className="flex justify-between">
              <h3 className="font-bold">{review.user?.name}</h3>

              <span>⭐{review.rating}</span>
            </div>

            <p className="mt-3 text-gray-600">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Reviews;
