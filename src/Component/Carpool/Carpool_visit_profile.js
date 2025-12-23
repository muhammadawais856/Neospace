import { FaArrowLeft } from "react-icons/fa6";
import "../../Styles/Birthdays/visit_profile.css";
import logo from "../../assets/user.png";
import { FaStar } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import { RiMotorbikeFill } from "react-icons/ri";
import { FaCar } from "react-icons/fa";
import { MdChair } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { FaDollarSign } from "react-icons/fa";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const carpooldata = [
  {
    id: 1,
    service: "Seats Available",
    details: "3"
  },
  {
    id: 2,
    service: "Price",
    details: "10"
  },
  {
    id: 3,
    service: "Location",
    details: "G-9 Islamabad"
  }
];

function Carpoolvisitprofile() {
  const rating = 4;
  const navigate = useNavigate();
  return (
    <div className="visitmain">
        <div className="visitarrow" onClick={() =>  navigate("/carpool")}>
           <FaArrowLeft />
        </div>
        <div className="visitexternal">
            <div className="visitouter">
                <div className="visitleft">
                <img src={logo} className="visituserimg" alt="user" />
                <div className="visitnames">
                        <h3 className="visitname">Awais Lateef</h3>
                        <p className="visitcompany">G-9, Islamabad</p>
                    </div>
                </div>

                <div className="car2">
                    <FaCar className="vehicleIcon2"></FaCar>
                </div>
            </div>

            <div className="visitdescription">
                <p >
                    Share your daily commute with reliable and friendly drivers! 
                    We offer safe and convenient carpool rides tailored to your schedule and location. 
                    Whether you’re heading to work, school, or running errands, enjoy comfortable rides 
                    while saving time and money. Our professional drivers ensure punctual pickups, 
                    clean vehicles, and a smooth journey. Perfect for solo commuters or small groups, 
                    we make traveling together easy, affordable, and eco-friendly. 
                    Hop in and make your ride a pleasant experience!
                </p>
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
                <h3 className="chatwithdriver">Chat with Awais Lateef</h3>
             </div>

            <div className="chatsection">
                <Chatcard isBlur={false}/>    
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