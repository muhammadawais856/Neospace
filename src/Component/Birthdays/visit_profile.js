import { FaArrowLeft } from "react-icons/fa6";
import "../../Styles/Birthdays/visit_profile.css";
import logo from "../../assets/user.png";
import { FaStar } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { birthdaysApi } from "../../services/birthdaysApi";


function VisitProfile() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const freelancerId = searchParams.get('freelancerId');
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (freelancerId) {
            fetchProfile();
        } else {
            setError("Freelancer ID not provided");
            setLoading(false);
        }
    }, [freelancerId]);

    async function fetchProfile() {
        try {
            setLoading(true);
            setError(null);
            const data = await birthdaysApi.getProfile(freelancerId);
            setProfileData(data);
        } catch (err) {
            console.error("Error fetching profile:", err);
            setError("Failed to load profile. Please try again later.");
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return (
            <div className="visitmain">
                <div className="visitarrow" onClick={() => window.history.back()}>
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
                <div className="visitarrow" onClick={() => window.history.back()}>
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

    const rating = Math.round(profileData.rating);
    const carddata = [
        {
            id: 1,
            service: "Completion",
            details: profileData.completed_services.toString()
        },
        {
            id: 2,
            service: "Reviews",
            details: profileData.reviews_count.toString()
        },
        {
            id: 3,
            service: "Average Price",
            details: profileData.average_price.toString()
        }
    ];

    return (
        <div className="visitmain">
            <div className="visitarrow" onClick={() => window.history.back()}>
               <FaArrowLeft />
            </div>
            <div className="visitexternal">
                <div className="visitouter">
                    <div className="visitleft">
                        <img src={profileData.profile_image || logo} className="visituserimg" alt="user" />
                        <div className="visitnames">
                            <h3 className="visitname">{profileData.name}</h3>
                        </div>
                    </div>

                    <div className="visitsec2">
                        <p className="visitrate">{profileData.rating.toFixed(1)}</p>
                        <div className="stars">
                            {[...Array(5)].map((_, i) => (
                                <FaStar key={i} className={i < rating ? "goldStar" : "grayStar"} />
                            ))}
                        </div>
                    </div>
                </div>

                <div className="visitdescription">
                    <p>{profileData.description}</p>
                </div>

                <div className="visitcards">
                    {carddata.map(item => (
                        <Visitcard 
                            key={item.id} 
                            service={item.service} 
                            details={item.details} 
                            onClick={() => {
                                if (item.id === 2) {
                                    navigate(`/birthdayreviews?providerId=${freelancerId}`);
                                }
                            }}
                        />
                    ))}
                </div>

                <div className="chatwith"> 
                    <h3 className="chatwithprovider">Chat with {profileData.name}</h3>
                </div>

                <div className="chatsection">
                    <Chatcard isBlur={false}/>    
                </div>
            </div>
        </div>
    );
}

export default VisitProfile;


function Visitcard({ service, details, onClick }) {
  return (
    <div className="visitcardmain" onClick={onClick}>
        <p className="visitcardservice">{service}</p>
        <p className="visitcarddetails">{details}</p>
        <p className="visitcarddetailsdark">{details}</p>
    </div>
  );
}

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


function getCurrentTime() {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}
