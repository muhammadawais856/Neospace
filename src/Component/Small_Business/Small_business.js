import logo from "../../assets/user.png";
import { FaStar } from "react-icons/fa";
import "../../Styles/Small_business/Small_business.css";
import { FaArrowLeft } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { smallBusinessApi } from "../../services/smallBusinessApi";
import { useAuth } from "../../contexts/AuthContext";


function SmallBusiness() {
  
const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [startIdx, setStartIndex] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBusinessType, setSelectedBusinessType] = useState("");
  const [showOfferService, setShowOfferService] = useState(true);
  const [isApproved, setIsApproved] = useState(false);

  useEffect(() => {
    fetchBusinesses();
    if (isAuthenticated) {
      checkMyService();
    }
  }, [selectedBusinessType, isAuthenticated]);

  async function checkMyService() {
    try {
      const response = await smallBusinessApi.getMyService();
      setShowOfferService(!response.has_service);
      // Check if service is approved
      setIsApproved(response.business?.approved === 1 || response.service?.approved === 1);
    } catch (err) {
      console.error("Error checking my service:", err);
    }
  }

  async function fetchBusinesses() {
    try {
      setLoading(true);
      setError(null);
      const businesses = await smallBusinessApi.getBusinesses(selectedBusinessType || null);
      setData(businesses);
      setTotalPages(Math.ceil(businesses.length / 9));
    } catch (err) {
      console.error("Error fetching businesses:", err);
      setError("Failed to load businesses. Please try again later.");
      setData([]);
    } finally {
      setLoading(false);
    }
  }

  function calculatePages(totalCards) {
    return Math.ceil(totalCards / 9); 
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
        className={`page-btn ${startIdx === i * 9 ? 'active' : ''}`}
        onClick={() => {setStartIndex(i * 9);
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
      <div className="businessmain">
        <div className="businessouter">
          <div className="businesstop">
            <div className="businessleft">
              <div className="arrow_smallbusiness" onClick={() => navigate('/')}> <FaArrowLeft /></div>
              <div className="business_left_in">
                <h3>Small Businesses</h3>
                <p>Serving with passion, growing with trust. </p>
              </div>
            </div>
          </div>
          <div style={{ padding: '20px', textAlign: 'center' }}>Loading...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="businessmain">
        <div className="businessouter">
          <div className="businesstop">
            <div className="businessleft">
              <div className="arrow_smallbusiness" onClick={() => navigate('/')}> <FaArrowLeft /></div>
              <div className="business_left_in">
                <h3>Small Businesses</h3>
                <p>Serving with passion, growing with trust. </p>
              </div>
            </div>
          </div>
          <div style={{ padding: '20px', textAlign: 'center', color: 'red' }}>{error}</div>
        </div>
      </div>
    );
  }


  return (
    
    <div className="businessmain">
      <div className="businessright">
            <button  
          onClick={() => {
            if (isApproved) {
              // Redirect to admin dashboard for approved stores with token
              const token = localStorage.getItem('authToken');
              if (token) {
                window.open(`http://localhost:3002/login?token=${token}`, '_blank');
              } else {
                window.open('http://localhost:3002/login', '_blank');
              }
            } else {
              navigate('/businessofferservices');
            }
          }}
          className="primary-btn2"
        >
          {showOfferService ? "Offer Services" : "My Store"}
        </button>
          </div>
      <div className="businessouter">
        <div className="businesstop">
          <div className="businessleft">
            <div className="arrow_smallbusiness" onClick={() => navigate('/')}> <FaArrowLeft /></div>
            <div className="business_left_in">
              <h3>Small Businesses</h3>
              <p>Serving with passion, growing with trust. </p>
            </div>
          </div>
          
          
        </div>
        <div className="businessdropdown">
          <div className="business_filter"> <p>Filter</p> </div>
          <select value={selectedBusinessType} onChange={(e) => setSelectedBusinessType(e.target.value)}>
            <option value="">All Categories</option>
            <option value="Restaurant">Restaurant</option>
            <option value="Café">Café</option>
            <option value="Clothing">Clothing Store</option>
            <option value="Electronics">Electronics</option>
            <option value="Salon">Salon</option>
            <option value="Grocery Store">Grocery Store</option>
            <option value="Mobile Shop">Mobile Shop</option>
            <option value="Dairy Store">Milk Shop</option>
            <option value="Bakery">Bakery</option>
            <option value="IT Services">IT Services</option>
            <option value="Barber">Barber Shop</option>
            <option value="Stationery Store">Stationery Store</option>
            <option value="Accessories Shop">Accessories Shop</option>
            <option value="Hardware">Hardware Store</option>
            <option value="Sports Store">Sports Store</option>
         </select>
          </div>


        <div className="businessbottom">
          {data.length === 0 ? (
            <div style={{ 
              width: '100%',
              margin: '0 auto',
              textAlign: 'center', 
              padding: '60px 10px',
              color: '#666'
            }}>
              <h3 style={{ marginBottom: '10px', width: '100%', fontSize: '24px', color: '#333' }}>No businesses on board yet</h3>
              <p style={{ fontSize: '16px' }}>Be the first to start your business and serve the community!</p>
            </div>
          ) : (
            <>
              {data.slice(startIdx, startIdx + 9).map(item => (
                <BusinessCard
                  key={item.id}
                  id={item.id}
                  imgurl={item.img}
                  name={item.name}
                  type={item.business_type}
                  description={item.description}
                  rating={item.rating}
                />
              ))}
            </>
          )}
        </div>

        {data.length > 0 && (
          <div className="page-buttons">
            {renderPages()}
          </div>
        )}
      </div>
    </div>
  );
}

export default SmallBusiness;

function BusinessCard({ id, name, description, type, rating, imgurl }) {
  const navigate = useNavigate();
  return (
    
    <div className="businesscard">
      <div className="businessimageurl">
        <img src={imgurl} alt="business" />
      </div>
      <div className="businesscardbottom">
        <div className="businesssec1">
        <div className="nameetc">
          <div className="profilename">
            <h3 className="businessname">{name}</h3>
            <div className="businesstype">
              <p className="businesstype">{type}</p>

            </div>
          </div>
        </div>
        </div>

        <div className="businesssec2">
        <p className="description">{description}</p>
       </div>

        <div className="businessrow">
            <div className="rating">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  className={i < Math.round(rating) ? "goldStar" : "grayStar"}
                />
              ))}
            </div>

            <div className="businessbtn">
                <button onClick={()=>{navigate(`/Smallbusinessprofile?businessId=${id}`)}}
                   className="primary-btn">Visit Profile</button>
            </div>
        </div>

      </div>
      

  

    
      
    </div>
  );
}

