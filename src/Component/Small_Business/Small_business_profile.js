import { FaArrowLeft } from "react-icons/fa6";
import "../../Styles/Small_business/Small_business_profile.css";
import { FaStar } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { smallBusinessApi } from "../../services/smallBusinessApi";


function Small_business_profile(){
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const businessId = searchParams.get('businessId');
    const [startIdx, setStartIndex] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [profileData, setProfileData] = useState(null);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (businessId) {
      fetchProfile();
    } else {
      setError("Business ID not provided");
      setLoading(false);
    }
  }, [businessId]);

  async function fetchProfile() {
    try {
      setLoading(true);
      setError(null);
      const profile = await smallBusinessApi.getProfile(businessId);
      setProfileData(profile);
      setData(profile.products || []);
      setTotalPages(Math.ceil((profile.products || []).length / 9));
    } catch (err) {
      console.error("Error fetching profile:", err);
      setError("Failed to load business profile. Please try again later.");
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

  // Filter products based on search query
  const filteredData = data.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="business_profile_main">
        <div className="business_profile_arrow" onClick={() => navigate("/smallbusiness")}> <FaArrowLeft /></div>
        <div className="business_profile_outer">
          <div style={{ padding: '20px', textAlign: 'center' }}>Loading...</div>
        </div>
      </div>
    );
  }

  if (error || !profileData) {
    return (
      <div className="business_profile_main">
        <div className="business_profile_arrow" onClick={() => navigate("/smallbusiness")}> <FaArrowLeft /></div>
        <div className="business_profile_outer">
          <div style={{ padding: '20px', textAlign: 'center', color: 'red' }}>
            {error || "Business profile not found"}
          </div>
        </div>
      </div>
    );
  }

    return(
        <>
        <div className="business_profile_main">
            <div className="business_profile_arrow" onClick={() => navigate("/smallbusiness")}> <FaArrowLeft /></div>
            <div className="business_profile_outer">
                {/*----------------------------------------
                                Section 1
                   ----------------------------------------
                */}
                <div className="business_profile_sec1">
                    <div className="business_profile_left">
                        <h3 className="business_profile_name">{profileData.name}</h3>
                        <p className="business_profile_type">{profileData.business_type}</p>
                        <p className="business_profile_description">{profileData.description}</p>

                    </div>
                    <div className="business_profile_right">
                        <Ratingcard rating={profileData.rating} ordersCompleted={profileData.order_completed} />

                    </div>

                </div>
                {/*----------------------------------------
                                Section 2
                   ----------------------------------------
                */}
                <div className="business_profile_sec2">
                    <div className="search-wrapper">
                        <input 
                            type="text" 
                            className="search-input" 
                            placeholder="Search products"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <IoSearch className="search-icon" />
                    </div>
                </div>

                {/*----------------------------------------
                                Section 3
                   ----------------------------------------
                */}
                <div className="business_profile_item_card">
                    {filteredData.slice(startIdx, startIdx + 9).map(item => (
                     <Carditems
                        key={item.id}
                        id={item.id}
                        imgurl={item.img}
                        name={item.name}
                        description={item.description}
                        price={item.price}
                        rating={item.rating}/>
                   ))}
                    
                </div>
                <div className="page-buttons">
                    {renderPages()}
               </div>

            </div>

        </div>
        </>
    )
}
export default Small_business_profile;

function Ratingcard({ rating, ordersCompleted }) {
    return(
        <>
        <div className="rating_card">
            <h3>{rating.toFixed(1)}</h3>
            <div className="rating">
                {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className={i < Math.round(rating) ? "goldStar" : "grayStar"} />
                ))}
            </div>
            <p>{ordersCompleted} Orders completed</p>
        </div>
        
        </>
    );
}

function Carditems({id, imgurl, name, description, price, rating}){
     const navigate = useNavigate();

      const handleClick = () => {
      navigate(`/Smallbusinessitem?productId=${id}`); // navigate on click
     }  ;
    return(
        <>
        <div className="business_profile_items"
        onClick={handleClick}   // correct placement
        style={{ cursor: "pointer" }}>
            <div
                className="business_profile_image"
                style={{ backgroundImage: `url(${imgurl})` }}
                ></div>
            <div className="business_profile_bottom">
                <h3 className="item_name">{name}</h3>
                <p className="description">{description}</p>
                <div className="items_items">
                    <div className="item_price">
                        <h3>PKR</h3>
                        <h3>{price}</h3>
                    </div>
                    <div className="item_star">
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
        </>

    );
}
