
import logo from "../../assets/user.png";
import { FaStar } from "react-icons/fa";
import "../../Styles/Birthdays/Birthdays.css";
import "../../Styles/Birthdays/BirthdayCard.css";
import { FaArrowLeft } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RiMotorbikeFill } from "react-icons/ri";
import { FaCar } from "react-icons/fa";


// 10 different birthday service providers
const data = [
  {
    id: 1,
    name: "Ali Khan",
    description: "Reliable driver offering carpool rides in G-9 Islamabad. Comfortable and punctual service for daily commutes.",
    location: "G-9, Islamabad",
    car: true,
    available: "3 seat available",
  },
  {
    id: 2,
    name: "Ahmed Raza",
    description: "Part-time carpool driver in F-8 Islamabad. Flexible schedule for shared rides.",
    location: "F-8, Islamabad",
    car: false,
    available: "1 seat available"
  },
  {
    id: 3,
    name: "Zain Malik",
    description: "Experienced driver providing daily carpool service in Bheria Rawalpindi. Safe and friendly rides.",
    location: "Bheria, Rawalpindi",
    car: true,
    available: "4 seat available"
  },
  {
    id: 4,
    name: "Hassan Sheikh",
    description: "Part-time carpool driver in Lalkurti Rawalpindi. Comfortable vehicle and timely pick-ups.",
    location: "Lalkurti, Rawalpindi",
    car: false,
    available: "1 seat available"
  },
  {
    id: 5,
    name: "Bilal Qureshi",
    description: "Regular carpool rides available in Sadar Rawalpindi. Affordable and reliable transportation for commuters.",
    location: "Sadar, Rawalpindi",
    car: true,
    available: "2 seat available"
  },
  {
    id: 6,
    name: "Farhan Saeed",
    description: "Providing daily carpooling in G-10 Islamabad. Friendly driver with clean and safe car.",
    location: "G-10, Islamabad",
    car: true,
    available: "4 seat available"
  },
  {
    id: 7,
    name: "Usman Tariq",
    description: "Occasionally available for carpool in F-7 Islamabad. Flexible and convenient rides for commuters.",
    location: "F-7, Islamabad",
    car: false,
    available: "1 seat available"
  },
  {
    id: 8,
    name: "Faisal Iqbal",
    description: "Dedicated carpool driver in Raja Bazar Rawalpindi. Comfortable rides with on-time pickups.",
    location: "Raja Bazar, Rawalpindi",
    car: true,
    available: "3 seat available"
  },
  {
    id: 9,
    name: "Imran Ali",
    description: "Luxury carpool rides in Chaklala Rawalpindi. Perfect for office commutes and group sharing.",
    location: "Chaklala, Rawalpindi",
    car: true,
    available: "4 seat available"
  },
  {
    id: 10,
    name: "Omar Farooq",
    description: "Part-time carpool driver in G-11 Islamabad. Affordable rides for daily commuting.",
    location: "G-11, Islamabad",
    car: false,
    available: "1 seat available"
  },
  {
    id: 11,
    name: "Adnan Tariq",
    description: "Reliable carpool driver in D-Chowk Islamabad. Comfortable and safe daily rides.",
    location: "D-Chowk, Islamabad",
    car: true,
    available: "3 seat available"
  },
  {
    id: 12,
    name: "Sami Shah",
    description: "Part-time driver for carpool in Saddar Rawalpindi. Convenient rides for office goers.",
    location: "Saddar, Rawalpindi",
    car: false,
    available: "1 seat available"
  },
  {
    id: 13,
    name: "Haris Ahmed",
    description: "Daily carpool service in G-12 Islamabad. Safe and punctual rides for commuters.",
    location: "G-12, Islamabad",
    car: true,
    available: "2 seat available"
  },
  {
    id: 14,
    name: "Ahsan Malik",
    description: "Available for shared rides in Pirwadhai Rawalpindi. Comfortable and reliable carpool service.",
    location: "Pirwadhai, Rawalpindi",
    car: false,
    available: "1 seat available"
  },
  {
    id: 15,
    name: "Tariq Javed",
    description: "Experienced carpool driver in I-8 Islamabad. Friendly and punctual service for daily commuting.",
    location: "I-8, Islamabad",
    car: true,
    available: "3 seat available"
  }
];




function Carpool() {
  
const navigate = useNavigate();
  const [startIdx, setStartIndex] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  function calculatePages(totalCards) {
    return Math.ceil(totalCards / 10); 
  }

  useEffect(() => {
    setTotalPages(calculatePages(data.length));
  },[]);

  function renderPages() {
  const buttons = [];
  for (let i = 0; i < totalPages; i++) {
    buttons.push(
      <button
        key={i}
        className={`page-btn ${startIdx === i * 10 ? 'active' : ''}`}
        onClick={() => setStartIndex(i * 10)}
      >
        {i + 1}
      </button>
    );
  }
  return buttons;
}


  return (
    
    <div className="main">
      <div className="Carpool_arrow" onClick={() => {navigate("/")}}> <FaArrowLeft /></div>
      <div className="birthdayouter">
        <div className="birthdaytop">
          <div className="birthdayleft">
            <h3>Carpool</h3>
            <p>Ride Together, Save Together </p>
          </div>
          <div className="birthdayright">
            <button  onClick={() => {navigate('/Carpoolofferservices')}}
            className="primary-btn2">Offer Services</button>
          </div>
        </div>

        <div className="birthdaybottom">
          {data.slice(startIdx, startIdx + 10).map(item => (
            <BirthdayCard
              key={item.id}
              name={item.name}
              location={item.location}
              description={item.description}
              car={item.car}
              available={item.available}
            />
          ))}
        </div>

        <div className="page-buttons">
          {renderPages()}
        </div>
      </div>
    </div>
  );
}

export default Carpool;

function BirthdayCard({ name, car, description,location,available }) {
  const navigate = useNavigate();
  return (
    <div className="carpoolcard">
      <div className="birthdaysec1">
        <div className="nameetc">
          <div className="profileimg">
            <ProfileCard />
          </div>
          <div className="profilename">
            <h3 className="birthdayname">{name}</h3>
            <div className="location">
              <p className="location">{location}</p>

            </div>
          </div>
        </div>

        <div className="car">
            {[...Array(1)].map((_, i) =>
                car ? <FaCar  key={i} className="vehicleIcon" /> : <RiMotorbikeFill key={i} className="vehicleIcon" />
               )}
        </div>
      </div>

      <div className="birthdaysec2">
        <p className="description">{description}</p>
      </div>

        <div className="carpoolrow">
            <div className="carpoolavailabe">
               <p className="available">{available}</p>
            </div>

            <div className="carpoolbtn">
                <button onClick={()=>{navigate('/Carpoolvisitprofile')}}
                   className="primary-btn">Visit Profile</button>
            </div>
        </div>
      
    </div>
  );
}

function ProfileCard() {
  return (
    <div className="profilecard">
      <img src={logo} className="userimg" alt="user" />
    </div>
  );
}
