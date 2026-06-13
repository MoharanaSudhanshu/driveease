import { useState } from "react";

import API from "../api/axios";

function ReviewForm({ carId, refresh }) {
  const [rating, setRating] = useState(5);

  const [comment, setComment] = useState("");

  const submitReview = async (e) => {
    e.preventDefault();

    try {
      await API.post(`/reviews/${carId}`, {
        rating,
        comment,
      });

      setComment("");

      refresh();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={submitReview}
      className="bg-white p-6 rounded-3xl shadow-lg"
    >
      <h2 className="text-2xl font-bold mb-4">Leave Review</h2>

      <select
        value={rating}
        onChange={(e) => setRating(e.target.value)}
        className="w-full border p-3 rounded-xl"
      >
        <option value="5">⭐⭐⭐⭐⭐</option>
        <option value="4">⭐⭐⭐⭐</option>
        <option value="3">⭐⭐⭐</option>
        <option value="2">⭐⭐</option>
        <option value="1">⭐</option>
      </select>

      <textarea
        rows="4"
        placeholder="Write your review..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="w-full border p-3 rounded-xl mt-4"
      />

      <button className="mt-4 bg-cyan-600 text-white px-6 py-3 rounded-xl">
        Submit Review
      </button>
    </form>
  );
}

export default ReviewForm;
