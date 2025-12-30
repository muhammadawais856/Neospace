
import logo from "../../assets/user.png";
import { FaStar } from "react-icons/fa";
import "../../Styles/Birthdays/Birthdays.css";
import "../../Styles/Birthdays/BirthdayCard.css";
import { FaArrowLeft } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RiMotorbikeFill } from "react-icons/ri";
import { FaCar } from "react-icons/fa";
import { carpoolApi } from "../../services/carpoolApi";


function Carpool() {
  
const navigate = useNavigate();
  const [startIdx, setStartIndex] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchFreelancers();
  }, []);

  async function fetchFreelancers() {
    try {
      setLoading(true);
      setError(null);
      const freelancers = await carpoolApi.getFreelancers();
      setData(freelancers);
      setTotalPages(Math.ceil(freelancers.length / 10));
    } catch (err) {
      console.error("Error fetching freelancers:", err);
      setError("Failed to load carpool services. Please try again later.");
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
        onClick={() => setStartIndex(i * 10)}
      >
        {i + 1}
      </button>
    );
  }
  return buttons;
}

  if (loading) {
    return (
      <div className="main">
        <div className="Carpool_arrow" onClick={() => {navigate("/")}}> <FaArrowLeft /></div>
        <div className="birthdayouter">
          <div className="birthdaytop">
            <div className="birthdayleft">
              <h3>Carpool</h3>
              <p>Ride Together, Save Together </p>
            </div>
          </div>
          <div style={{ padding: '20px', textAlign: 'center' }}>Loading...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="main">
        <div className="Carpool_arrow" onClick={() => {navigate("/")}}> <FaArrowLeft /></div>
        <div className="birthdayouter">
          <div className="birthdaytop">
            <div className="birthdayleft">
              <h3>Carpool</h3>
              <p>Ride Together, Save Together </p>
            </div>
          </div>
          <div style={{ padding: '20px', textAlign: 'center', color: 'red' }}>{error}</div>
        </div>
      </div>
    );
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
          {data.slice(startIdx, startIdx + 10).map((item) => (
            <BirthdayCard
              key={item.id}
              id={item.id}
              name={item.name}
              location={item.location}
              description={item.description}
              car={item.vehicle_type === "Car"}
              available={`${item.seats_available} seat${item.seats_available > 1 ? 's' : ''} available`}
              image={item.image}
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

function BirthdayCard({ id, name, car, description, location, available, image }) {
  const navigate = useNavigate();
  return (
    <div className="carpoolcard">
      <div className="birthdaysec1">
        <div className="nameetc">
          <div className="profileimg">
            <ProfileCard image={image} />
          </div>
          <div className="profilename">
            <h3 className="birthdayname">{name}</h3>
            <div className="location">
              <p className="location">{location}</p>

            </div>
          </div>
        </div>

        <div className="car">
            {car ? <FaCar className="vehicleIcon" /> : <RiMotorbikeFill className="vehicleIcon" />}
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
                <button onClick={()=>{navigate(`/Carpoolvisitprofile?freelancerId=${id}`)}}
                   className="primary-btn">Visit Profile</button>
            </div>
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
