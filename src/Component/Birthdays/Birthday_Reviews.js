import { FaStar } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa6";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { birthdaysApi } from "../../services/birthdaysApi";
import "../../Styles/Birthdays/Birthday_Reviews.css";

function BirthdayReviews() {
  const [searchParams] = useSearchParams();
  const freelancerId = searchParams.get("freelancerId");
  const [reviewsData, setReviewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalReview, setTotalReview] = useState(0);
  const [numbersOfReviews, setNumbersOfReviews] = useState(0);

  useEffect(() => {
    if (freelancerId) {
      fetchReviews();
    } else {
      // Try to get from URL params as providerId (in case it's passed as providerId)
      const providerId = searchParams.get("providerId");
      if (providerId) {
        fetchReviewsForProvider(providerId);
      } else {
        setError("Freelancer ID is required");
        setLoading(false);
      }
    }
  }, [freelancerId, searchParams]);

  async function fetchReviewsForProvider(providerId) {
    try {
      setLoading(true);
      setError(null);
      const data = await birthdaysApi.getBirthdayReviews(providerId);
      setReviewsData(data.reviews || []);
      setTotalReview(data.total_review || 0);
      setNumbersOfReviews(data.numbers_of_reviews || 0);
    } catch (err) {
      console.error("Error fetching reviews:", err);
      setError("Failed to load reviews. Please try again later.");
      setReviewsData([]);
    } finally {
      setLoading(false);
    }
  }

  async function fetchReviews() {
    try {
      setLoading(true);
      setError(null);
      const data = await birthdaysApi.getBirthdayReviews(freelancerId);
      setReviewsData(data.reviews || []);
      setTotalReview(data.total_review || 0);
      setNumbersOfReviews(data.numbers_of_reviews || 0);
    } catch (err) {
      console.error("Error fetching reviews:", err);
      setError("Failed to load reviews. Please try again later.");
      setReviewsData([]);
    } finally {
      setLoading(false);
    }
  }

  // Calculate dynamic average rating
  const avgRating = totalReview > 0 ? Math.round(totalReview) : 0;

  // For rating bars, find max count for proportional bars
  const ratingCounts = [5, 4, 3, 2, 1].map(
    (num) => reviewsData.filter((r) => r.rating === num).length
  );
  const maxCount = Math.max(...ratingCounts, 1);

  if (loading) {
    return (
      <div className="birthday_reviews_main">
        <div className="birthday_reviews_back" onClick={() => window.history.back()}>
          <FaArrowLeft />
        </div>
        <div style={{ padding: '20px', textAlign: 'center' }}>Loading reviews...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="birthday_reviews_main">
        <div className="birthday_reviews_back" onClick={() => window.history.back()}>
          <FaArrowLeft />
        </div>
        <div style={{ padding: '20px', textAlign: 'center', color: 'red' }}>{error}</div>
      </div>
    );
  }

  return (
    <div className="birthday_reviews_main">
      {/* BACK ARROW */}
      <div
        className="birthday_reviews_back"
        onClick={() => window.history.back()}
      >
        <FaArrowLeft />
      </div>

      {/* ===== SUMMARY SECTION ===== */}
      <div className="reviews_summary">
        <div className="summary_left">
          <h1>{avgRating}</h1>
          <div className="summary_stars">
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                className={i < avgRating ? "goldStar" : "grayStar"}
              />
            ))}
          </div>
          <p>Based on {numbersOfReviews} Reviews</p>
        </div>

        <div className="summary_right">
          {[5, 4, 3, 2, 1].map((num, idx) => (
            <div className="rating_bar_row" key={num}>
              <span>{num}</span>
              <div className="rating_bar">
                <div
                  className="rating_fill"
                  style={{
                    width: `${(ratingCounts[idx] / maxCount) * 100}%`,
                  }}
                />
              </div>
              <span>{ratingCounts[idx]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ===== REVIEW CARDS ===== */}
      <div className="reviews_grid">
        {reviewsData.map((review, index) => (
          <div className="review_card_main" key={index}>
            <p className="review_username">{review.username}</p>

            <div className="review_card_rating">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  className={i < review.rating ? "goldStar" : "grayStar"}
                />
              ))}
            </div>

            <p className="review_card_comment">{review.comments}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BirthdayReviews;
