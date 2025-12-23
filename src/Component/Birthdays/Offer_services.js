import { FaArrowLeft } from "react-icons/fa6";
import "../../Styles/Birthdays/Offer_services.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Offer_services() {

    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const navigate = useNavigate();

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
                        <div className="offerserviceleft">
                            <p className="offerservicetitle">Service Title (Max 20 Letters)</p> 
                            <input 
                            type="text" 
                            className="offerservicestitleinput" 
                            placeholder="e.g. Birthday Party Planning" 
                            maxLength={20} 
                            />
                    
                            <p className="offerservicetitle">Pricing Details</p>
                            <input 
                            type="number" 
                            className="offerservicespricinginput" 
                            placeholder="e.g. 1000"
                            />  

                            <p className="offerservicetitle">Service Description</p>
                            <textarea 
                            className="offerservicestitleinput"
                            maxLength={200}
                            rows={10}
                            placeholder="Describe your service here..."
                            />
                            <div className="offerservicesec6">
                                <button className="primary-btn"
                                onClick={()=>{setIsSubmitted(true)}}
                                >Submit</button>
                            </div>
                        </div>

                        <div className="offerserviceright">
                            <p className="offerservicetitle">Name</p> 
                            <input 
                                type="text" 
                                className="offerservicestitleinput" 
                                placeholder="Awais"
                                disabled 
                                maxLength={20} 
                            />
                            <p className="offerservicetitle">Email</p> 
                            <input 
                                type="text" 
                                className="offerservicestitleinput" 
                                placeholder="awais@gmail.com"
                                disabled 
                                maxLength={20} 
                            />
                            <p className="offerservicetitle">Contact</p> 
                            <input 
                                type="text" 
                                className="offerservicestitleinput" 
                                placeholder="+92 123 4567890"
                                disabled 
                                maxLength={20} 
                            />
                            <p className="offerservicetitle">School</p> 
                            <input 
                                type="text" 
                                className="offerservicestitleinput" 
                                placeholder="NSTP"
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