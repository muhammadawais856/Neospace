import { FaArrowLeft } from "react-icons/fa6";
import "../../Styles/Birthdays/Offer_services.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { carpoolApi } from "../../services/carpoolApi";
import { useAuth } from "../../contexts/AuthContext";

function Carpool_offer_services() {
    const navigate = useNavigate();
    const { isAuthenticated, loading: authLoading } = useAuth();
    const [hasExistingService, setHasExistingService] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
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
    const [checkingService, setCheckingService] = useState(true);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        // Wait for auth to finish loading before checking
        if (authLoading) {
            return;
        }
        
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }
        checkExistingService();
        fetchUserInfo();
    }, [isAuthenticated, authLoading, navigate]);

    async function checkExistingService() {
        try {
            setCheckingService(true);
            const response = await carpoolApi.getMyService();
            if (response.has_service && response.service) {
                // If there's a pending request, show message instead of form
                if (response.has_pending_request && response.service.approved === 0) {
                    setHasExistingService(true);
                    setIsSubmitted(true);
                    return;
                }
                // If approved service exists, allow editing
                setHasExistingService(true);
                setIsEditing(true);
                setFormData({
                    location: response.service.location || "",
                    vehicle_type: response.service.vehicle_type || "",
                    price_per_seat: response.service.price_per_seat?.toString() || "",
                    seats_available: response.service.seats_available?.toString() || "",
                    description: response.service.description || ""
                });
            }
        } catch (err) {
            console.error("Error checking service:", err);
        } finally {
            setCheckingService(false);
        }
    }

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
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }

        try {
            setSubmitting(true);
            
            if (isEditing && hasExistingService) {
                // Update existing service
                await carpoolApi.updateMyService({
                    location: formData.location,
                    vehicle_type: formData.vehicle_type,
                    price_per_seat: parseFloat(formData.price_per_seat),
                    seats_available: parseInt(formData.seats_available),
                    description: formData.description
                });
                alert("Service updated successfully!");
            } else {
                // Create new service
                await carpoolApi.offerService({
                    location: formData.location,
                    vehicle_type: formData.vehicle_type,
                    price_per_seat: parseFloat(formData.price_per_seat),
                    seats_available: parseInt(formData.seats_available),
                    description: formData.description
                });
                setIsSubmitted(true);
            }
        } catch (err) {
            console.error("Error submitting service:", err);
            const errorMsg = err.message || "Failed to submit service. Please try again.";
            alert(errorMsg);
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async () => {
        const confirmed = window.confirm(
            "Are you sure you want to delete your service? This action cannot be undone."
        );
        
        if (!confirmed) {
            return;
        }

        try {
            setDeleting(true);
            
            await carpoolApi.deleteMyService();
            alert("Service deleted successfully!");
            // Redirect to carpool page
            navigate('/carpool');
        } catch (err) {
            console.error("Error deleting service:", err);
            const errorMsg = err.message || "Failed to delete service. Please try again.";
            alert(errorMsg);
        } finally {
            setDeleting(false);
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
                        <h3 className="offerservicesheadertitle">{isEditing ? "Manage Your Service" : "Offer Your Service"}</h3>
                        <p className="offerserviceheadersubtitle">{isEditing ? "Update your service information below" : "Join our community of service providers and reach more customers!"}</p>
                    </div>
                </div>

                {checkingService ? (
                    <div style={{ padding: '20px', textAlign: 'center' }}>Loading...</div>
                ) : (
                    <>
                    {isSubmitted && hasExistingService ? (
                        <div style={{ 
                            padding: '60px 20px', 
                            textAlign: 'center',
                            maxWidth: '600px',
                            margin: '0 auto'
                        }}>
                            <h3 style={{ marginBottom: '15px', fontSize: '24px', color: '#333' }}>
                                You already have a service request
                            </h3>
                            <p style={{ 
                                marginBottom: '30px', 
                                fontSize: '16px', 
                                color: '#666',
                                lineHeight: '1.6'
                            }}>
                                Your carpool service request is currently pending approval. Once approved, you'll be able to manage your service here.
                            </p>
                            <button 
                                className="primary-btn" 
                                onClick={() => window.history.back()}
                                style={{ padding: '12px 24px', fontSize: '16px' }}
                            >
                                Go Back
                            </button>
                        </div>
                    ) : !isSubmitted ? <>
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
                                <div className="offerservicesec6" style={{ display: 'flex', gap: '10px', flexDirection: 'column' }}>
                                    <button 
                                        className="primary-btn"
                                        type="submit"
                                        disabled={submitting || deleting}
                                    >
                                        {submitting ? (isEditing ? "Updating..." : "Submitting...") : (isEditing ? "Update Service" : "Submit")}
                                    </button>
                                    {isEditing && hasExistingService && (
                                        <button 
                                            className="primary-btn"
                                            type="button"
                                            onClick={handleDelete}
                                            disabled={submitting || deleting}
                                            style={{ 
                                                backgroundColor: '#dc3545', 
                                                borderColor: '#dc3545',
                                                marginTop: '10px'
                                            }}
                                        >
                                            {deleting ? "Deleting..." : "Delete Service"}
                                        </button>
                                    )}
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
                                {userInfo.school && (
                                    <>
                                        <p className="offerservicetitle">School</p> 
                                        <input 
                                            type="text" 
                                            className="offerservicestitleinput" 
                                            value={userInfo.school}
                                            disabled 
                                            maxLength={20} 
                                        />
                                    </>
                                )}                  
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
                </>
                )}

            </div>

        </div>
        
        </>
    );
}

export default Carpool_offer_services;