import { FaArrowLeft } from "react-icons/fa6";
import "../../Styles/Birthdays/Offer_services.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { carpoolApi } from "../../services/carpoolApi";

function Carpool_offer_services() {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        location: "",
        vehicle_type: "",
        price_per_seat: "",
        seats_available: "",
        description: ""
    });
    const [userInfo, setUserInfo] = useState({
        name: "",
        email: "",
        contact: "",
        school: ""
    });
    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        // Check if user is logged in (check localStorage)
        const userData = localStorage.getItem('userData');
        if (userData) {
            setIsLoggedIn(true);
            fetchUserInfo();
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    async function fetchUserInfo() {
        try {
            setLoading(true);
            const data = await carpoolApi.getOfferServiceFormData();
            setUserInfo(data);
        } catch (err) {
            console.error("Error fetching user info:", err);
        } finally {
            setLoading(false);
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isLoggedIn) {
            navigate('/login');
            return;
        }

        try {
            setSubmitting(true);
            await carpoolApi.offerService({
                location: formData.location,
                vehicle_type: formData.vehicle_type,
                price_per_seat: parseFloat(formData.price_per_seat),
                seats_available: parseInt(formData.seats_available),
                description: formData.description
            });
            setIsSubmitted(true);
        } catch (err) {
            console.error("Error submitting service:", err);
            alert("Failed to submit service. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <> 
        <div className="offer_services" >

            {/* div main */}

            <div className="offerservicemain">
                
                <div className="offerservicesec1">
                    <div className="offerserviceback" onClick={() => navigate("/carpool")}>
                        <FaArrowLeft />
                    </div> 
                    <div className="offer-flex-column">
                        <h3 className="offerservicesheadertitle">Offer Your Service</h3>
                        <p className="offerserviceheadersubtitle">Join our community of service providers and reach more customers!</p>
                    </div>
                </div>

                {
                    isLoggedIn ? <>


                {
                    !isSubmitted ? <>
                    <form onSubmit={handleSubmit}>
                        <div className="offerservicescontent">
                            <div className="offerserviceleft">
                                <p className="offerservicetitle">Location</p> 
                                <input 
                                    type="text" 
                                    name="location"
                                    className="offerservicestitleinput" 
                                    placeholder="e.g. Bheria Town phase 7" 
                                    maxLength={100}
                                    value={formData.location}
                                    onChange={handleInputChange}
                                    required
                                />
                        
                                <p className="offerservicetitle">Vehicle Type</p>
                                <select 
                                    name="vehicle_type"
                                    className="offerservicestitleinput"
                                    value={formData.vehicle_type}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="">Select Vehicle</option>
                                    <option value="car">Car</option>
                                    <option value="bike">Bike</option>
                                </select>

                                <p className="offerservicetitle">Price per seat</p>
                                <input 
                                    type="number" 
                                    name="price_per_seat"
                                    className="offerservicestitleinput" 
                                    placeholder="e.g. 200"
                                    value={formData.price_per_seat}
                                    onChange={handleInputChange}
                                    min="0"
                                    required
                                /> 

                                <p className="offerservicetitle">Seat available</p>
                                <input 
                                    type="number" 
                                    name="seats_available"
                                    className="offerservicestitleinput" 
                                    placeholder="e.g. 2"
                                    value={formData.seats_available}
                                    onChange={handleInputChange}
                                    min="1"
                                    required
                                /> 

                                <p className="offerservicetitle">Service Description</p>
                                <textarea 
                                    name="description"
                                    className="offerservicestitleinput"
                                    maxLength={200}
                                    rows={10}
                                    placeholder="Describe your service here..."
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    required
                                />
                                <div className="offerservicesec6">
                                    <button 
                                        className="primary-btn"
                                        type="submit"
                                        disabled={submitting}
                                    >
                                        {submitting ? "Submitting..." : "Submit"}
                                    </button>
                                </div>
                            </div>

                            <div className="offerserviceright">
                                <p className="offerservicetitle">Name</p> 
                                <input 
                                    type="text" 
                                    className="offerservicestitleinput" 
                                    placeholder={loading ? "Loading..." : "Awais"}
                                    value={userInfo.name}
                                    disabled 
                                    maxLength={20} 
                                />
                                <p className="offerservicetitle">Email</p> 
                                <input 
                                    type="text" 
                                    className="offerservicestitleinput" 
                                    placeholder={loading ? "Loading..." : "awais@gmail.com"}
                                    value={userInfo.email}
                                    disabled 
                                    maxLength={20} 
                                />
                                <p className="offerservicetitle">Contact</p> 
                                <input 
                                    type="text" 
                                    className="offerservicestitleinput" 
                                    placeholder={loading ? "Loading..." : "+92 123 4567890"}
                                    value={userInfo.contact}
                                    disabled 
                                    maxLength={20} 
                                />
                                <p className="offerservicetitle">School</p> 
                                <input 
                                    type="text" 
                                    className="offerservicestitleinput" 
                                    placeholder={loading ? "Loading..." : "NSTP"}
                                    value={userInfo.school}
                                    disabled 
                                    maxLength={20} 
                                />                  
                            </div>
                        </div>
                    </form>   
                </> : 
                <>
                <div className="submit-div">
                    <h3>Your request has been recieved!</h3>
                    <p>Please wait till our committee reviews your request. You will be updated via email.</p>
                </div>
                </>
                }
            </> : <>
            
            <div className="submit-div">
                    <h3>Oops! You are not Logged In</h3>
                    <p>Please login to continue offering your services.</p>
                    <button className="primary-btn"
                    onClick={()=>{navigate('/login')}}
                    >Login</button>
                </div>
            </>
        }

            </div>

        </div>
        
        </>
    );
}

export default Carpool_offer_services;