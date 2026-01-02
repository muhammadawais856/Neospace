import { FaArrowLeft } from "react-icons/fa6";
import "../../Styles/Birthdays/visit_profile.css";
import "../../Styles/Birthdays/Birthday_Reviews.css";
import logo from "../../assets/user.png";
import { FaStar } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import { RiMotorbikeFill } from "react-icons/ri";
import { FaCar } from "react-icons/fa";
import { MdChair } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { FaDollarSign } from "react-icons/fa";
import { Navigate } from "react-router-dom";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { carpoolApi } from "../../services/carpoolApi";
import { reviewsApi } from "../../services/reviewsApi";

function Carpoolvisitprofile() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const freelancerId = searchParams.get("freelancerId");
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reviewsData, setReviewsData] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const [totalReview, setTotalReview] = useState(0);
  const [numbersOfReviews, setNumbersOfReviews] = useState(0);

  useEffect(() => {
    if (freelancerId) {
      fetchProfile();
      fetchReviews();
    } else {
      setError("Freelancer ID not provided");
      setLoading(false);
    }
  }, [freelancerId]);

  async function fetchProfile() {
    try {
      setLoading(true);
      setError(null);
      const data = await carpoolApi.getProfile(freelancerId);
      setProfileData(data);
    } catch (err) {
      console.error("Error fetching profile:", err);
      setError("Failed to load profile. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  async function fetchReviews() {
    try {
      setReviewsLoading(true);
      const data = await reviewsApi.getReviews(freelancerId, 'carpool');
      setReviewsData(data.reviews || []);
      setTotalReview(data.average_rating || 0);
      setNumbersOfReviews(data.total_reviews || 0);
    } catch (err) {
      console.error("Error fetching reviews:", err);
      setReviewsData([]);
    } finally {
      setReviewsLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="visitmain">
        <div className="visitarrow" onClick={() => navigate("/carpool")}>
          <FaArrowLeft />
        </div>
        <div className="visitexternal">
          <div style={{ padding: '20px', textAlign: 'center' }}>Loading...</div>
        </div>
      </div>
    );
  }

  if (error || !profileData) {
    return (
      <div className="visitmain">
        <div className="visitarrow" onClick={() => navigate("/carpool")}>
          <FaArrowLeft />
        </div>
        <div className="visitexternal">
          <div style={{ padding: '20px', textAlign: 'center', color: 'red' }}>
            {error || "Profile not found"}
          </div>
        </div>
      </div>
    );
  }

  const carpooldata = [
    {
      id: 1,
      service: "Seats Available",
      details: profileData.seats_available?.toString() || "0"
    },
    {
      id: 2,
      service: "Price",
      details: profileData.price?.toString() || "0"
    },
    {
      id: 3,
      service: "Location",
      details: profileData.location || "N/A"
    }
  ];
  return (
    <div className="visitmain">
       
        <div className="visitexternal">
            <div className="visitouter">
                <div className="visitleft">
                <div className="visitarrow" onClick={() =>  navigate("/carpool")}>
           <FaArrowLeft />
        </div>
                <img src={profileData.profile_picture || logo} className="visituserimg" alt="user" />
                <div className="visitnames">
                        <h3 className="visitname">{profileData.name}</h3>
                        <p className="visitcompany">{profileData.location}</p>
                    </div>
                </div>

                <div className="car2">
                    {profileData.vehicle_type === "car" ? (
                        <FaCar className="vehicleIcon2"></FaCar>
                    ) : (
                        <RiMotorbikeFill className="vehicleIcon2"></RiMotorbikeFill>
                    )}
                </div>
            </div>

            <div className="visitdescription">
                <p>{profileData.description}</p>
            </div>

            <div className="Carpoolvisitcards">
                {carpooldata.map(item => (
                <Carpool_visitcard
                    key={item.id} 
                    service={item.service} 
                    details={item.details} />
                ))}
            </div>

            <div className="chatwith"> 
                <h3 className="chatwithdriver">Chat with {profileData.name}</h3>
             </div>

            <div className="chatsection">
                <Chatcard isBlur={false}/>    
            </div>

            {/* Reviews Section */}
            <div style={{ marginTop: '40px' }}>
                {/* ===== SUMMARY SECTION ===== */}
                <div className="reviews_summary">
                    <div className="summary_left">
                        <h1>{totalReview > 0 ? Math.round(totalReview) : 0}</h1>
                        <div className="summary_stars">
                            {[...Array(5)].map((_, i) => (
                                <FaStar
                                    key={i}
                                    className={i < Math.round(totalReview) ? "goldStar" : "grayStar"}
                                />
                            ))}
                        </div>
                        <p>Based on {numbersOfReviews} Reviews</p>
                    </div>

                    <div className="summary_right">
                        {(() => {
                            const ratingCounts = [5, 4, 3, 2, 1].map(
                                (num) => reviewsData.filter((r) => r.rating === num).length
                            );
                            const maxCount = Math.max(...ratingCounts, 1);
                            return [5, 4, 3, 2, 1].map((num, idx) => (
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
                            ));
                        })()}
                    </div>
                </div>

                {reviewsLoading ? (
                    <div style={{ padding: '20px', textAlign: 'center' }}>Loading reviews...</div>
                ) : reviewsData.length === 0 ? (
                    <div style={{ padding: '20px', textAlign: 'center', color: '#666' }}>No reviews yet</div>
                ) : (
                    /* ===== REVIEW CARDS ===== */
                    <div className="reviews_grid">
                        {reviewsData.map((review, index) => (
                            <div className="review_card_main" key={index}>
                                <p className="review_username">{review.username || review.name}</p>

                                <div className="review_card_rating">
                                    {[...Array(5)].map((_, i) => (
                                        <FaStar
                                            key={i}
                                            className={i < review.rating ? "goldStar" : "grayStar"}
                                        />
                                    ))}
                                </div>

                                <p className="review_card_comment">{review.comment || review.comments}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    </div>
  );
}

export default Carpoolvisitprofile;




function Chatcard({ isBlur }) {
    const currentTime = getCurrentTime();

    return (
        <>
            {isBlur ? (
                <div className="chatcardmain blurdiv">
                    You need credits to chat with this service provider.
                </div>
            ) : (
                <div className="chatcardmain">

                    {/* Chat message area */}
                    <div className="chat-main">

                        <div className="sender">
                            <p className="sender-text">
                                Hello! I am interested in your birthday party planning services.
                                <span className="time">{currentTime}</span>
                            </p>
                        </div>

                        <div className="receiver">
                            <p className="receiver-text">
                                Hi! Thank you for reaching out.
                                <span className="time">{currentTime}</span>
                            </p>
                        </div>

                    </div>

                    {/* Input area */}
                    <div className="inputdiv">
                        <div className="inputsection">
                            <input
                                type="text"
                                className="chatinput"
                                placeholder="Type your message..."
                            />
                        </div>

                        <div className="sendsection">
                            <IoSend className="sendbtn" />
                        </div>
                    </div>

                </div>
            )}
        </>
    );
}

function Carpool_visitcard({ service, details }) {
  return (
    <div className="visitcardmaincarpool">
        <p className="visitcardservice">{service}</p>
        <p className="visitcarddetails_carpool">{details}</p>
        <p className="carpoolvisitcarddetailsdark_carpool">{details}</p>
    </div>
  );
}

function getCurrentTime() {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}