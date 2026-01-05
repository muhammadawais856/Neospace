import { FaArrowLeft } from "react-icons/fa6";
import "../../Styles/Birthdays/Offer_services.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { birthdaysApi } from "../../services/birthdaysApi";
import { useAuth } from "../../contexts/AuthContext";

function Offer_services() {
    const navigate = useNavigate();
    const { isAuthenticated, loading: authLoading } = useAuth();
    const [hasExistingService, setHasExistingService] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
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
        fetchUserData();
    }, [isAuthenticated, authLoading, navigate]);

    async function checkExistingService() {
        try {
            setCheckingService(true);
            const response = await birthdaysApi.getMyService();
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
                    service_title: response.service.service_title || "",
                    price: response.service.price?.toString() || "",
                    description: response.service.description || ""
                });
            }
        } catch (err) {
            console.error("Error checking service:", err);
        } finally {
            setCheckingService(false);
        }
    }

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
            
            if (isEditing && hasExistingService) {
                // Update existing service
                await birthdaysApi.updateMyService({
                    service_title: formData.service_title,
                    price: parseFloat(formData.price),
                    description: formData.description
                });
                setError(null);
                alert("Service updated successfully!");
            } else {
                // Create new service
                await birthdaysApi.offerService({
                    service_title: formData.service_title,
                    price: parseFloat(formData.price),
                    description: formData.description
                });
                setIsSubmitted(true);
            }
        } catch (err) {
            console.error("Error submitting service:", err);
            const errorMessage = err.message || "Failed to submit service. Please try again.";
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    }

    async function handleDelete() {
        const confirmed = window.confirm(
            "Are you sure you want to delete your service? This action cannot be undone."
        );
        
        if (!confirmed) {
            return;
        }

        try {
            setDeleting(true);
            setError(null);
            
            await birthdaysApi.deleteMyService();
            alert("Service deleted successfully!");
            // Redirect to birthdays page
            navigate('/birthdays');
        } catch (err) {
            console.error("Error deleting service:", err);
            const errorMessage = err.message || "Failed to delete service. Please try again.";
            setError(errorMessage);
            alert(errorMessage);
        } finally {
            setDeleting(false);
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
                                Your birthday service request is currently pending approval. Once approved, you'll be able to manage your service here.
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
                            <div className="offerservicesec6" style={{ display: 'flex', gap: '10px', flexDirection: 'column' }}>
                                <button className="primary-btn"
                                onClick={handleSubmit}
                                disabled={loading || deleting}
                                >{loading ? (isEditing ? "Updating..." : "Submitting...") : (isEditing ? "Update Service" : "Submit")}</button>
                                {isEditing && hasExistingService && (
                                    <button 
                                        className="primary-btn"
                                        onClick={handleDelete}
                                        disabled={loading || deleting}
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
                            {userData.school && (
                                <>
                                    <p className="offerservicetitle">School</p> 
                                    <input 
                                        type="text" 
                                        className="offerservicestitleinput" 
                                        value={userData.school}
                                        disabled 
                                        maxLength={20} 
                                    />
                                </>
                            )}                  
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
                </>
                )}

            </div>

        </div>
        
        </>
    );
}

export default Offer_services;
