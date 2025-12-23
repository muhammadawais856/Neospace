import { useState } from "react";
import { FaStar, FaTimes } from "react-icons/fa";
import "../Styles/Rate_product.css";

function RateProduct() {
  const [rating, setRating] = useState(0); // Selected rating
  const [hoverRating, setHoverRating] = useState(0); // Hover effect
  const [images, setImages] = useState([]); // Uploaded images

  // Handle image selection
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.slice(0, 4 - images.length); // Max 4
    const urls = newImages.map((file) => URL.createObjectURL(file));
    setImages((prev) => [...prev, ...urls]);
  };

  // Remove image
  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="rateproduct_main">
      <div className="rateproduct_outer">
        <div className="rateproduct_title">
          <h3>Rate Product</h3>
        </div>

        {/* ===== STARS ===== */}
        <div className="rateproduct_stars">
          {[...Array(5)].map((_, i) => {
            const starValue = i + 1;
            return (
              <FaStar
                key={i}
                className={`rate_star ${
                  starValue <= (hoverRating || rating) ? "highlighted" : ""
                }`}
                onMouseEnter={() => setHoverRating(starValue)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => setRating(starValue)}
              />
            );
          })}
        </div>

        {/* ===== COMMENTS ===== */}
        <div className="rateproduct_comments">
          <textarea
            className="rateproduct_titleinput"
            maxLength={200}
            rows={5}
            placeholder="Describe your thoughts here..."
          />
        </div>

        {/* ===== IMAGE UPLOAD ===== */}
        <div className="rateproduct_images">
          {images.map((img, index) => (
            <div key={index} className="rateproduct_image_wrapper">
              <img src={img} alt={`upload ${index}`} className="rateproduct_image"/>
              <FaTimes
                className="remove_image_icon"
                onClick={() => removeImage(index)}
              />
            </div>
          ))}

          {images.length < 4 && (
            <label className="upload_button">
              + Add Image
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                style={{ display: "none" }}
              />
            </label>
          )}
        </div>

        <div className="rateproduct_btn">
            <button className="primary-btn">Submit Review</button>
        </div>
      </div>
    </div>
  );
}

export default RateProduct;
