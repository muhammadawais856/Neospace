import { FaArrowLeft } from "react-icons/fa6";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { smallBusinessApi } from "../../services/smallBusinessApi";
import { useAuth } from "../../contexts/AuthContext";
import "../../Styles/Small_business/Business_offer_services.css";

function Business_offer_service(){
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
    const [hasExistingService, setHasExistingService] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        business_type: "",
        additional_comments: "",
        image: ""
    });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [checkingService, setCheckingService] = useState(true);
    const [imagePreview, setImagePreview] = useState("");

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }
        checkExistingService();
    }, [isAuthenticated, navigate]);

    async function checkExistingService() {
        try {
            setCheckingService(true);
            const response = await smallBusinessApi.getMyService();
            if (response.has_service && response.service) {
                // If service is approved, redirect to external dashboard
                if (response.service.approved === 1 || response.business?.approved === 1) {
                    const token = localStorage.getItem('authToken');
                    if (token) {
                      window.location.href = `http://localhost:3002/login?token=${token}`;
                    } else {
                      window.location.href = 'http://localhost:3002/login';
                    }
                    return;
                }
                // If there's a pending request, show message instead of form
                if (response.has_pending_request && response.service.approved === 0) {
                    setHasExistingService(true);
                    setIsSubmitted(true);
                    return;
                }
                // If approved service exists, allow editing (shouldn't reach here if approved)
                setHasExistingService(true);
                setIsEditing(true);
                setFormData({
                    name: response.service.name || "",
                    description: response.service.description || "",
                    business_type: response.service.business_type || "",
                    additional_comments: response.service.additional_comments || "",
                    image: response.business?.img || response.service.img || ""
                });
                if (response.business?.img || response.service.img) {
                    setImagePreview(response.business?.img || response.service.img);
                }
            }
        } catch (err) {
            console.error("Error checking service:", err);
        } finally {
            setCheckingService(false);
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                const base64Image = reader.result;
                setImagePreview(base64Image);
                setFormData({...formData, image: base64Image});
            };
            reader.readAsDataURL(file);
        }
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
                await smallBusinessApi.updateMyService({
                    name: formData.name,
                    description: formData.description,
                    business_type: formData.business_type,
                    additional_comments: formData.additional_comments || "",
                    image: formData.image || ""
                });
                alert("Service updated successfully!");
            } else {
                // Create new service
                await smallBusinessApi.offerService({
                    name: formData.name,
                    description: formData.description,
                    business_type: formData.business_type,
                    additional_comments: formData.additional_comments || "",
                    image: formData.image || ""
                });
                // Re-check service status after submission
                await checkExistingService();
            }
        } catch (err) {
            console.error("Error submitting business offer:", err);
            const errorMsg = err.message || "Failed to submit business offer. Please try again.";
            alert(errorMsg);
        } finally {
            setSubmitting(false);
        }
    };

    if (checkingService) {
        return (
            <div className="business_offer_main">
                <div className="business_offer_arrow" onClick={() => {window.history.back()}}> <FaArrowLeft /></div>
                <div className="business_offer_outer">
                    <div style={{ padding: '40px', textAlign: 'center' }}>Loading...</div>
                </div>
            </div>
        );
    }

    if (isSubmitted && hasExistingService) {
        return (
            <div className="business_offer_main">
                <div className="business_offer_arrow" onClick={() => {window.history.back()}}> <FaArrowLeft /></div>
                <div className="business_offer_outer">
                    <div style={{ 
                        padding: '60px 20px', 
                        textAlign: 'center',
                        maxWidth: '600px',
                        margin: '0 auto'
                    }}>
                        <h3 style={{ marginBottom: '15px', fontSize: '24px', color: '#333' }}>
                            Your request is under review
                        </h3>
                        <p style={{ 
                            marginBottom: '30px', 
                            fontSize: '16px', 
                            color: '#666',
                            lineHeight: '1.6'
                        }}>
                            Your business store request is currently pending approval. Once approved, you'll be able to manage your store here.
                        </p>
                        <button 
                            className="primary-btn" 
                            onClick={() => window.history.back()}
                            style={{ padding: '12px 24px', fontSize: '16px' }}
                        >
                            Go Back
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (isSubmitted && !isEditing) {
        return (
            <div className="business_offer_main">
                <div className="business_offer_arrow" onClick={() => {window.history.back()}}> <FaArrowLeft /></div>
                <div className="business_offer_outer">
                    <div style={{ padding: '40px', textAlign: 'center' }}>
                        <h3>Your request has been received!</h3>
                        <p>Please wait till our committee reviews your request. You will be updated via email.</p>
                    </div>
                </div>
            </div>
        );
    }

    return(
        <>
        <div className="business_offer_main">
            <div className="business_offer_arrow" onClick={() => {window.history.back()}}> <FaArrowLeft /></div>
            <div className="business_offer_outer">
                <div className="business_offer_sec1">
                <div className="business_offer_title">
                    <h3 className="business_offer_title_name">{isEditing ? "Manage Your Store" : "Start Your Business"}</h3>
                    <p className="business_offer_desc">{isEditing ? "Update your store information below" : "Your Journey to Success Begins Here"}</p>

                </div>
                </div>
                <div className="business_offer_sec2">
                {/* left */}
                <div className="business_offer_left_card">
                    <img src="https://helloalice.com/wp-content/uploads/2022/06/AdobeStock_415962900-scaled-1.jpg" alt="business"></img>

                </div>
                
                {/* right */}
                <div className="business_offer_right_card">
                <form className="business_offer_form" onSubmit={handleSubmit}>
                    <div className="business_offer_info">
                        <h3 className="business_offer_info_text">Online Store Information</h3>
                    </div>
                    <div className="business_offer_name">
                        <p className="business_offer_name_text">Store Image</p>
                        <div style={{ marginBottom: '15px' }}>
                            {imagePreview && (
                                <img 
                                    src={imagePreview} 
                                    alt="Store preview" 
                                    style={{ 
                                        width: '150px', 
                                        height: '150px', 
                                        objectFit: 'cover', 
                                        borderRadius: '8px',
                                        marginBottom: '10px',
                                        display: 'block'
                                    }} 
                                />
                            )}
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                style={{ marginTop: '10px' }}
                            />
                        </div>
                    </div>
                    <div className="business_offer_name">
                        <p className="business_offer_name_text"> Name</p>
                        <input  
                            type="text"
                            name="name"
                            placeholder="Enter your business name" 
                            className="business_offer_name_input"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                     <div className="business_offer_description">
                        <p className="business_offer_description_text">Description</p>
                        <textarea 
                            name="description"
                            placeholder="Enter your business description" 
                            rows={6} 
                            className="business_offer_description_textarea"
                            value={formData.description}
                            onChange={handleInputChange}
                            required
                        ></textarea>
                    </div>
                     <div className="business_offer_type">
                        <p className="business_offer_type_text">Type</p>
                        <select 
                            name="business_type"
                            className="business_offer_type_select"
                            value={formData.business_type}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="">Select Categorie</option>
                            <option value="Restaurant">Restaurant</option>
                            <option value="Café">Café</option>
                            <option value="Clothing">Clothing Store</option>
                            <option value="Electronics">Electronics</option>
                            <option value="Salon">Salon</option>
                            <option value="Grocery Store">Grocery Store</option>
                            <option value="Mobile Shop">Mobile Shop</option>
                            <option value="Dairy Store">Milk Shop</option>
                            <option value="Bakery">Bakery</option>
                            <option value="IT Services">IT Services</option>
                            <option value="Barber">Barber Shop</option>
                            <option value="Stationery Store">Stationery Store</option>
                            <option value="Accessories Shop">Accessories Shop</option>
                            <option value="Hardware">Hardware Store</option>
                            <option value="Sports Store">Sports Store</option>
                        </select>
                    </div>
                     <div className="business_offer_additional_comments">
                        <p className="business_offer_additional_comments_text">Additional Comments</p>
                        <textarea 
                            name="additional_comments"
                            placeholder="Additional Comments" 
                            rows={6}  
                            className="business_offer_additional_comments_textarea"
                            value={formData.additional_comments}
                            onChange={handleInputChange}
                        ></textarea>
                    </div>
                    <div className="business_offer_btn">
                        <button 
                            type="submit"
                            className="primary-btn"
                            disabled={submitting}
                        >
                            {submitting ? (isEditing ? "Updating..." : "Submitting...") : (isEditing ? "Update Store" : "Submit")}
                        </button>
                    </div>
                </form>
                </div>
                </div>

            </div>

        </div>
        </>
    );
}
export default Business_offer_service;