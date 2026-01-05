import logo from "../../assets/user.png";
import { FaStar } from "react-icons/fa";
import "../../Styles/Birthdays/Birthdays.css";
import "../../Styles/Birthdays/BirthdayCard.css";
import { FaArrowLeft } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { birthdaysApi } from "../../services/birthdaysApi";
import { useAuth } from "../../contexts/AuthContext";
// Import advertisement images - update these paths with your actual images
// Replace the paths below with your actual desktop and mobile advertisement images
import adDesktop from "../../assets/ad-desktop.png";
import adMobile from "../../assets/ad-mobile.png";


function Birthdays() {
  
const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [startIdx, setStartIndex] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasMyService, setHasMyService] = useState(false);

  useEffect(() => {
    fetchFreelancers();
    if (isAuthenticated) {
      checkMyService();
    }
  }, [isAuthenticated]);

  async function checkMyService() {
    try {
      const response = await birthdaysApi.getMyService();
      setHasMyService(response.has_service);
    } catch (err) {
      console.error("Error checking my service:", err);
    }
  }

  async function fetchFreelancers() {
    try {
      setLoading(true);
      setError(null);
      const freelancers = await birthdaysApi.getFreelancers();
      setData(freelancers);
      setTotalPages(Math.ceil(freelancers.length / 10));
    } catch (err) {
      console.error("Error fetching freelancers:", err);
      setError("Failed to load birthday services. Please try again later.");
      setData([]);
    } finally {
      setLoading(false);
    }
  }

  function calculatePages(totalCards) {
    return Math.ceil(totalCards / 10); 
  }

  useEffect(() => {
    if (data.length > 0) {
      setTotalPages(calculatePages(data.length));
    }
  }, [data]);

  function renderPages() {
  const buttons = [];
  for (let i = 0; i < totalPages; i++) {
    buttons.push(
      <button
        key={i}
        className={`page-btn ${startIdx === i * 10 ? 'active' : ''}`}
        onClick={() => {setStartIndex(i * 10);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      >
        {i + 1}
      </button>
    );
  }
  return buttons;
}


  if (loading) {
    return (
      <>
        <div className="birthday-ad-banner">
          <picture>
            <source media="(max-width: 768px)" srcSet={adMobile} />
            <img src={adDesktop} alt="Advertisement" className="ad-image" />
          </picture>
        </div>
        <div className="main">
          {/* Advertisement Banner Section */}
          <div className="birthdayouter">
          <div className="birthdaytop">
            <div className="birthdayleft">
              <div className="arrow_birthday" onClick={() => {window.history.back()}}> <FaArrowLeft /></div>
              <div className="birthday_left_in">
                <h3>Birthdays</h3>
                <p>Celebrate birthdays with us </p>
              </div>
            </div>
            <div className="birthdayright">
              <button onClick={() => {navigate('/offerservices')}} className="primary-btn2">Offer Services</button>
            </div>
          </div>
          <div style={{ padding: '20px', textAlign: 'center' }}>Loading...</div>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <div className="birthday-ad-banner">
          <picture>
            <source media="(max-width: 768px)" srcSet={adMobile} />
            <img src={adDesktop} alt="Advertisement" className="ad-image" />
          </picture>
        </div>
        <div className="main">
          <div className="birthdayouter">
          <div className="birthdaytop">
            <div className="birthdayleft">
              <div className="arrow_birthday" onClick={() => {window.history.back()}}> <FaArrowLeft /></div>
              <div className="birthday_left_in">
                <h3>Birthdays</h3>
                <p>Celebrate birthdays with us </p>
              </div>
            </div>
            <div className="birthdayright">
              <button onClick={() => {navigate('/offerservices')}} className="primary-btn2">Offer Services</button>
            </div>
          </div>
          <div style={{ padding: '20px', textAlign: 'center', color: 'red' }}>{error}</div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="birthday-ad-banner">
        <picture>
          <source media="(max-width: 768px)" srcSet={adMobile} />
          <img src={adDesktop} alt="Advertisement" className="ad-image" />
        </picture>
      </div>
      <div className="main">
        <div className="birthdayouter">
        <div className="birthdaytop">
          <div className="birthdayleft">
            <div className="arrow_birthday" onClick={() => {window.history.back()}}> <FaArrowLeft /></div>
            <div className="birthday_left_in">
              <h3>Birthdays</h3>
              <p>Celebrate birthdays with us </p>
            </div>
          </div>
          <div className="birthdayright">
            <button  onClick={() => {navigate('/offerservices')}}
            className="primary-btn2">{hasMyService ? "Manage My Service" : "Offer Services"}</button>
          </div>
        </div>

        {data.length > 0 ? (
          <>
            <div className="birthdaybottom">
              {data.slice(startIdx, startIdx + 10).map(item => (
                <BirthdayCard
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  rating={item.rating}
                  description={item.description}
                  profileImage={item.profile_image}
                />
              ))}
            </div>
            <div className="page-buttons">
              {renderPages()}
            </div>
          </>
        ) : null}
        </div>

        {data.length === 0 && (
          <div style={{ width: '100%' }}>
            <div style={{ 
              width: '80%',
              margin: '0 auto',
              textAlign: 'center', 
              padding: '60px 20px',
              color: '#666'
            }}>
              <h3 style={{ marginBottom: '10px', fontSize: '24px', color: '#333' }}>No birthday services on board yet</h3>
              <p style={{ fontSize: '16px' }}>Be the first to offer birthday services and help others celebrate!</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Birthdays;

function BirthdayCard({ id, name, rating, description, profileImage }) {
  const navigate = useNavigate();
  return (
    <div className="birthdaycard">
      <div className="birthdaysec1">
        <div className="nameetc">
          <div className="profileimg">
            <ProfileCard image={profileImage} />
          </div>
          <div className="profilename">
            <h3 className="birthdayname">{name}</h3>
            <div className="rating_birthday">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  className={i < Math.round(rating) ? "goldStar" : "grayStar"}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="birthdaysec2">
        <p className="description">{description}</p>
      </div>

      <div className="birthdaysec3">
        <button onClick={()=>{navigate(`/visitprofile?freelancerId=${id}`)}}
        className="primary-btn">Visit Profile</button>
      </div>
    </div>
  );
}

function ProfileCard({ image }) {
  return (
    <div className="profilecard">
      <img src={image || logo} className="userimg" alt="user" />
    </div>
  );
}
