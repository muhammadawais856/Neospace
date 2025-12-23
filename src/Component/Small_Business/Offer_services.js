import { FaArrowLeft } from "react-icons/fa6";
import "../../Styles/Small_business/Business_offer_services.css";

function Business_offer_service(){
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
                    <img src="https://helloalice.com/wp-content/uploads/2022/06/AdobeStock_415962900-scaled-1.jpg"></img>

                </div>
                
                {/* right */}
                <div className="business_offer_right_card">
                    <div className="business_offer_info">
                        <h3 className="business_offer_info_text">Online Store Information</h3>
                    </div>
                    <div className="business_offer_name">
                        <p className="business_offer_name_text"> Name</p>
                        <input  type="text"placeholder="Enter your business name" className="business_offer_name_input"/>
                    </div>
                     <div className="business_offer_description">
                        <p className="business_offer_description_text">Description</p>
                        <textarea placeholder="Enter your business description" rows={6} className="business_offer_description_textarea"></textarea>
                    </div>
                     <div className="business_offer_type">
                        <p className="business_offer_type_text">Type</p>
                        <select className="business_offer_type_select">
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
                        <textarea placeholder="Additional Comments" rows={6}  className="business_offer_additional_comments_textarea" ></textarea>
                    </div>
                    <div className="business_offer_btn">
                        <button 
                            className="primary-btn">Submit</button>
                    </div>


                </div>
                </div>

            </div>

        </div>
        </>
    );
}
export default Business_offer_service;