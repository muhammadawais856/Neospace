import logo from "../../assets/user.png";
import { FaStar } from "react-icons/fa";
import "../../Styles/Birthdays/Birthdays.css";
import "../../Styles/Birthdays/BirthdayCard.css";
import { FaArrowLeft } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


// 10 different birthday service providers
const data = [
  {
    id: 1,
    name: "John's Party Planners",
    rating: 4,
    description: "We provide complete birthday event services including décor, catering, photography, and entertainment. Make your day memorable!"
  },
  {
    id: 2,
    name: "Sparkle Events",
    rating: 5,
    description: "Sparkle Events offers custom birthday themes, decorations, cakes, and fun activities for kids and adults."
  },
  {
    id: 3,
    name: "Happy Moments Co.",
    rating: 4,
    description: "Professional birthday organizers with photography, music, and catering services for a seamless celebration."
  },
  {
    id: 4,
    name: "Party Time Planners",
    rating: 5,
    description: "Party Time Planners specialize in creative birthday setups, from balloons and flowers to games and shows."
  },
  {
    id: 5,
    name: "Joyful Celebrations",
    rating: 3,
    description: "Affordable birthday packages including decoration, catering, and entertainment for small to medium gatherings."
  },
  {
    id: 6,
    name: "Cake & Confetti",
    rating: 5,
    description: "We handle everything from cake design, decorations, themed parties to photography for a perfect birthday."
  },
  {
    id: 7,
    name: "Birthday Bliss",
    rating: 4,
    description: "Birthday Bliss organizes fun, colorful, and memorable birthday events for all ages."
  },
  {
    id: 8,
    name: "Event Horizon",
    rating: 4,
    description: "Expert planners for birthday parties with catering, décor, and fun activities tailored to your needs."
  },
  {
    id: 9,
    name: "Golden Star Parties",
    rating: 5,
    description: "From luxury birthday setups to entertainment and catering, Golden Star Parties makes every event special."
  },
  {
    id: 10,
    name: "Magic Moments",
    rating: 3,
    description: "We provide personalized birthday services including themed décor, photography, and fun-filled entertainment."
  },
  {
    id: 6,
    name: "Cake & Confetti",
    rating: 5,
    description: "We handle everything from cake design, decorations, themed parties to photography for a perfect birthday."
  },
  {
    id: 7,
    name: "Birthday Bliss",
    rating: 4,
    description: "Birthday Bliss organizes fun, colorful, and memorable birthday events for all ages."
  },
  {
    id: 8,
    name: "Event Horizon",
    rating: 4,
    description: "Expert planners for birthday parties with catering, décor, and fun activities tailored to your needs."
  },
  {
    id: 9,
    name: "Golden Star Parties",
    rating: 5,
    description: "From luxury birthday setups to entertainment and catering, Golden Star Parties makes every event special."
  },
  {
    id: 10,
    name: "Magic Moments",
    rating: 3,
    description: "We provide personalized birthday services including themed décor, photography, and fun-filled entertainment."
  },
  
];

function Birthdays() {
  
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


  return (
    
    <div className="main">
      <div className="arrow_birthday" onClick={() => {window.history.back()}}> <FaArrowLeft /></div>
      <div className="birthdayright">
            <button  onClick={() => {navigate('/offerservices')}}
            className="primary-btn2">Offer Services</button>
          </div>
      <div className="birthdayouter">
        <div className="birthdaytop">
          <div className="birthdayleft">
            <h3>Birthdays</h3>
            <p>Celebrate birthdays with us </p>
          </div>
        </div>

        <div className="birthdaybottom">
          {data.slice(startIdx, startIdx + 10).map(item => (
            <BirthdayCard
              key={item.id}
              name={item.name}
              rating={item.rating}
              description={item.description}
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

export default Birthdays;

function BirthdayCard({ name, rating, description }) {
  const navigate = useNavigate();
  return (
    <div className="birthdaycard">
      <div className="birthdaysec1">
        <div className="nameetc">
          <div className="profileimg">
            <ProfileCard />
          </div>
          <div className="profilename">
            <h3 className="birthdayname">{name}</h3>
            <div className="rating_birthday">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  className={i < rating ? "goldStar" : "grayStar"}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="featured_birthday">
            <span className="icon">★</span>
            Featured
        </div>
      </div>

      <div className="birthdaysec2">
        <p className="description">{description}</p>
      </div>

      <div className="birthdaysec3">
        <button onClick={()=>{navigate('/visitprofile')}}
        className="primary-btn">Visit Profile</button>
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
