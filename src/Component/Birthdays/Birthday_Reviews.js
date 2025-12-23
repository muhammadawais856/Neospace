import { useState } from "react";
import { FaStar, FaRegThumbsUp } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa6";
import { FaTimes } from "react-icons/fa"; // ✅ Fix missing import
import "../../Styles/Birthdays/Birthday_Reviews.css";

const reviewsData = [
  {
    username: "Awais",
    date: "12 Sep 2025",
    rating: 5,
    comment: "Amazing birthday decoration! Totally worth it.",
    commentimgs: [
      "https://images.philips.com/is/image/philipsconsumer/71bb2449339d4ae0b43fb0c60050b434?wid=700&hei=700&$pnglarge$",
      "https://i.ebayimg.com/images/g/YaQAAOSwc2tmnl1Q/s-l1200.jpg",
    ],
    likecount: 24,
  },
  {
    username: "Ali Khan",
    date: "05 Sep 2025",
    rating: 4,
    comment: "Good quality, delivery was on time.",
    commentimgs: [
      "https://m.media-amazon.com/images/I/61bcY1YYXoL._AC_UF1000,1000_QL80_.jpg",
    ],
    likecount: 18,
  },
  {
    username: "Sara Ahmed",
    date: "28 Aug 2025",
    rating: 5,
    comment: "Loved it! My kids were very happy ❤️",
    commentimgs: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOCCoOjZmBnxSm54phvhLNp3GBMSXyPX_QBg&s",
    ],
    likecount: 32,
  },
  {
    username: "Usman",
    date: "20 Aug 2025",
    rating: 3,
    comment: "Product was okay, packaging could be better.",
    commentimgs: [
      "https://www.prophotostudio.net/wp-content/uploads/2021/02/best-camera-photos1-scaled.jpeg",
    ],
    likecount: 9,
  },
  {
    username: "Hina",
    date: "15 Aug 2025",
    rating: 4,
    comment: "Nice colors and design. Recommended!",
    commentimgs: [
      "https://img.freepik.com/free-photo/cosmetic-male-beauty-products-with-display_23-2150435210.jpg?semt=ais_hybrid&w=740&q=80",
      "https://img.freepik.com/free-photo/skin-oil-droppers-assortment-with-wooden-pieces_23-2148761386.jpg?semt=ais_hybrid&w=740&q=80",
      "https://img.freepik.com/free-photo/argan-oil-dropper-bottle-arrangement_23-2148989117.jpg?semt=ais_hybrid&w=740&q=80",
    ],
    likecount: 21,
  },
];

function BirthdayReviews() {
  const rating = 4;
  return (
    <div className="birthday_reviews_main">
      <div
        className="birthday_reviews_back"
        onClick={() => window.history.back()}
      >
        <FaArrowLeft />
      </div>

      <div className="birthday_reviews_outer">
        <div className="birthday_review_number">
          <h3 className="review_get">4.8</h3>
          <h3 className="review_slash">/</h3>
          <h3 className="review_total">5</h3>
        </div>

        <div className="reviews_rating">
          {[...Array(5)].map((_, i) => (
            <FaStar
              key={i}
              className={i < rating ? "goldStar" : "grayStar"}
            />
          ))}
        </div>

        <div className="reviews_title">
          <h3>Product Reviews</h3>
        </div>

        <div className="reviews cards">
          {reviewsData.map((review, index) => (
            <ReviewsCard
              key={index}
              username={review.username}
              date={review.date}
              rating={review.rating}
              comment={review.comment}
              commentimgs={review.commentimgs}
              likecount={review.likecount}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default BirthdayReviews;

function ReviewsCard({
  username,
  date,
  rating,
  comment,
  commentimgs = [],
  likecount,
}) {
  const [showModal, setShowModal] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const openModal = (index) => {
    setActiveIndex(index);
    setShowModal(true);
  };

  return (
    <>
      <div className="review_card_main">
        <div className="review_card_header">
          <p className="review_username">{username}</p>
          <p className="review_date">{date}</p>
        </div>

        <div className="review_card_rating">
          {[...Array(5)].map((_, i) => (
            <FaStar
              key={i}
              className={i < rating ? "goldStar" : "grayStar"}
            />
          ))}
        </div>

        <div className="review_card_comment">
          <p>{comment}</p>
        </div>

        <div className="review_card_images">
          {commentimgs.map((imgSrc, index) => (
            <img
              key={index}
              src={imgSrc}
              className="review_comment_image"
              onClick={() => openModal(index)}
            />
          ))}
        </div>

        <div className="review_card_bottom">
          <FaRegThumbsUp />
          <p className="review_like_count">{likecount}</p>
        </div>
      </div>

      {showModal && (
        <div className="image_modal_overlay">
          <div className="image_modal">
            <FaTimes
              className="close_btn"
              onClick={() => setShowModal(false)}
            />

            <img
              src={commentimgs[activeIndex]}
              className="modal_big_image"
              alt="review"
            />

            <div className="image_slider">
              {commentimgs.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  className={`modal_image ${
                    i === activeIndex ? "active" : ""
                  }`}
                  onClick={() => setActiveIndex(i)}
                  alt={`thumbnail ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
