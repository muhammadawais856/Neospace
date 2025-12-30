import { FaArrowLeft } from "react-icons/fa6";
import "../../Styles/Birthdays/Offer_services.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { birthdaysApi } from "../../services/birthdaysApi";

function Offer_services() {

    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [formData, setFormData] = useState({
        service_title: "",
        price: "",
        description: ""
    });
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        contact: "",
        school: ""
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchUserData();
    }, []);

    async function fetchUserData() {
        try {
            const data = await birthdaysApi.getOfferServiceFormData();
            setUserData(data);
        } catch (err) {
            console.error("Error fetching user data:", err);
        }
    }

    async function handleSubmit() {
        if (!formData.service_title || !formData.price || !formData.description) {
            setError("Please fill in all fields");
            return;
        }

        try {
            setLoading(true);
            setError(null);
            await birthdaysApi.offerService({
                service_title: formData.service_title,
                price: parseFloat(formData.price),
                description: formData.description
            });
            setIsSubmitted(true);
        } catch (err) {
            console.error("Error submitting service:", err);
            setError("Failed to submit service. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <> 
        <div className="offer_services" >

            {/* div main */}

            <div className="offerservicemain">
                
                <div className="offerservicesec1">
                    <div className="offerserviceback" onClick={() => window.history.back()}>
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
                    <div className="offerservicescontent">
                        {error && <div style={{ color: 'red', padding: '10px' }}>{error}</div>}
                        <div className="offerserviceleft">
                            <p className="offerservicetitle">Service Title (Max 20 Letters)</p> 
                            <input 
                            type="text" 
                            className="offerservicestitleinput" 
                            placeholder="e.g. Birthday Party Planning" 
                            maxLength={20}
                            value={formData.service_title}
                            onChange={(e) => setFormData({...formData, service_title: e.target.value})}
                            />
                    
                            <p className="offerservicetitle">Pricing Details</p>
                            <input 
                            type="number" 
                            className="offerservicespricinginput" 
                            placeholder="e.g. 1000"
                            value={formData.price}
                            onChange={(e) => setFormData({...formData, price: e.target.value})}
                            />  

                            <p className="offerservicetitle">Service Description</p>
                            <textarea 
                            className="offerservicestitleinput"
                            maxLength={200}
                            rows={10}
                            placeholder="Describe your service here..."
                            value={formData.description}
                            onChange={(e) => setFormData({...formData, description: e.target.value})}
                            />
                            <div className="offerservicesec6">
                                <button className="primary-btn"
                                onClick={handleSubmit}
                                disabled={loading}
                                >{loading ? "Submitting..." : "Submit"}</button>
                            </div>
                        </div>

                        <div className="offerserviceright">
                            <p className="offerservicetitle">Name</p> 
                            <input 
                                type="text" 
                                className="offerservicestitleinput" 
                                placeholder="Awais"
                                value={userData.name}
                                disabled 
                                maxLength={20} 
                            />
                            <p className="offerservicetitle">Email</p> 
                            <input 
                                type="text" 
                                className="offerservicestitleinput" 
                                placeholder="awais@gmail.com"
                                value={userData.email}
                                disabled 
                                maxLength={20} 
                            />
                            <p className="offerservicetitle">Contact</p> 
                            <input 
                                type="text" 
                                className="offerservicestitleinput" 
                                placeholder="+92 123 4567890"
                                value={userData.contact}
                                disabled 
                                maxLength={20} 
                            />
                            <p className="offerservicetitle">School</p> 
                            <input 
                                type="text" 
                                className="offerservicestitleinput" 
                                placeholder="NSTP"
                                value={userData.school}
                                disabled 
                                maxLength={20} 
                            />                  
                        </div>
                    </div>   
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

export default Offer_services;
