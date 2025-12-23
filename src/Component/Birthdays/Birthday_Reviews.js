import { FaStar } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa6";
import "../../Styles/Birthdays/Birthday_Reviews.css";

// Sample reviews data
const reviewsData = Array.from({ length: 10 }, (_, i) => ({
  username: `User ${i + 1}`,
  rating: i % 5 === 0 ? 5 : i % 4 === 0 ? 4 : 3,
  comment:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.",
}));

function BirthdayReviews() {
  // Calculate dynamic average rating
  const avgRating = Math.round(
    reviewsData.reduce((sum, r) => sum + r.rating, 0) / reviewsData.length
  );

  // For rating bars, find max count for proportional bars
  const ratingCounts = [5, 4, 3, 2, 1].map(
    (num) => reviewsData.filter((r) => r.rating === num).length
  );
  const maxCount = Math.max(...ratingCounts);

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
          <p>Based on {reviewsData.length} Reviews</p>
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

            <p className="review_card_comment">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BirthdayReviews;
