import { FaArrowLeft } from "react-icons/fa6";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { smallBusinessApi } from "../../services/smallBusinessApi";
import "../../Styles/Small_business/Business_offer_services.css";

function Business_offer_service(){
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        business_type: "",
        additional_comments: ""
    });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setSubmitting(true);
            await smallBusinessApi.offerService({
                name: formData.name,
                description: formData.description,
                business_type: formData.business_type,
                additional_comments: formData.additional_comments || ""
            });
            setIsSubmitted(true);
        } catch (err) {
            console.error("Error submitting business offer:", err);
            alert("Failed to submit business offer. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    if (isSubmitted) {
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
                    <h3 className="business_offer_title_name">Start Your Business</h3>
                    <p className="business_offer_desc">Your Journey to Success Begins Here</p>

                </div>
                </div>
                <div className="business_offer_sec2">
                {/* left */}
                <div className="business_offer_left_card">
                    <img src="https://helloalice.com/wp-content/uploads/2022/06/AdobeStock_415962900-scaled-1.jpg" alt="business"></img>

                </div>
                
                {/* right */}
                <form onSubmit={handleSubmit}>
                <div className="business_offer_right_card">
                    <div className="business_offer_info">
                        <h3 className="business_offer_info_text">Online Store Information</h3>
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
                            {submitting ? "Submitting..." : "Submit"}
                        </button>
                    </div>
                </div>
                </form>
                </div>

            </div>

        </div>
        </>
    );
}
export default Business_offer_service;