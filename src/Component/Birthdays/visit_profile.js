import { FaArrowLeft } from "react-icons/fa6";
import "../../Styles/Birthdays/visit_profile.css";
import logo from "../../assets/user.png";
import { FaStar } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import { useNavigate } from "react-router-dom";


const carddata = [
  {
    id: 1,
    service: "Completion",
    details: "15"
  },
  {
    id: 2,
    service: "Reviews",
    details: "10"
  },
  {
    id: 3,
    service: "Average Price",
    details: "500"
  }
];

function VisitProfile() {
    const navigate = useNavigate();
  const rating = 4;
  return (
    <div className="visitmain">
        <div className="visitarrow" onClick={() => window.history.back()}>
           <FaArrowLeft />
        </div>
        <div className="visitexternal">
            <div className="visitouter">
                <div className="visitleft">
                <img src={logo} className="visituserimg" alt="user" />
                <div className="visitnames">
                        <h3 className="visitname">Awais Lateef</h3>
                        <p className="visitcompany">Neosyss</p>
                    </div>
                </div>

                <div className="visitsec2">
                    <p className="visitrate">4.8</p>
                    <div className="stars">
                    {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className={i < rating ? "goldStar" : "grayStar"} />
                    ))}
                    </div>
                </div>
            </div>

            <div className="visitdescription">
                <p >
                    Celebrate your special day with unforgettable experiences! We offer personalized birthday party planning tailored to your style and preferences. From fun decorations and delicious cakes to exciting games and entertainment, we make every moment memorable. Our professional team handles everything so you can relax and enjoy the celebration. Perfect for kids, teens, and adults alike, we create magical memories that last a lifetime. Let us turn your birthday into a truly spectacular event!
                </p>
            </div>

            <div className="visitcards">
                {carddata.map(item => (
                <Visitcard 
                    key={item.id} 
                    service={item.service} 
                    details={item.details} 
                    onClick={() => {
              if (item.id === 2) {
                navigate("/birthdayreviews"); // 👈 YOUR 2ND PAGE
              }
            }}
                    />
                ))}
            </div>

            <div className="chatwith"> 
                <h3 className="chatwithprovider">Chat with Awais Lateef</h3>
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