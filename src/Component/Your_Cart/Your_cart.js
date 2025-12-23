import { useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import "../../Styles/Your_cart/Your_cart.css"
function Your_cart(){
    return(
        <>
        <div className="cart_main">
            <div className="cart_home_icon">
            </div>
            <div cart_outer>
                <div className="cart_title">
                    <h3>Your Cart</h3>
                </div>
                <div className="Cart_Card">
                    <Cart_card></Cart_card>
                    
                </div>
                <hr class="divider" />
                <div className="cart_bottom">
                    <div className="cart_item">
                        <div>Total items</div>
                        <h3>10</h3>
                         
                    </div>
                    <div className="cart_price">
                        <div>Total Amount</div>
                        <h3>15000</h3>
                         
                    </div>
                    <div className="checkout_btn">
                        <button 
                        // onClick={() => { navigate("/Smallbusinessprofile");}}
                        className="primary-btn4">
                        Check Out
                        </button>
                    </div>
                    

                </div>

            </div>

        </div>
        </>

    );
}

export default Your_cart;

function Cart_card(){
    const [quantity, setQuantity] = useState(1);
    
      const increment = () => setQuantity((prev) => prev + 1);
      const decrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
    return(
        <>
        <div className="cart_card_main">
            <div className="cart_card_name">
                <h3>Ali Fast Foods</h3>
            </div>
            <div className="cart_card_detail_row">
                {/* col1 */}
                <div className="cart_card_img">
                    <img src="https://png.pngtree.com/thumb_back/fh260/background/20240408/pngtree-zinger-burger-ad-poster-design-image_15710081.jpg"></img>
                </div>
                {/* col2 */}
                <div className="cart_card_product&quantity">
                    <h3 className="cart_card_product_name">Zinger Burger</h3>
                    <p className="cart_card_description">
                        A crispy, golden fried chicken fillet topped with fresh lettuce, juicy tomatoes, and creamy mayo, served in a soft bun. Perfect for a quick and satisfying meat
                    </p>

                </div>
                {/* col 3 */}
                <div className="cart_card_col3">
                    {/* row 1 */}
                    <div className="cart_card_row1">
                        <div class="counter_box2">
                            <button class="counter_btn2" onClick={decrement}>−</button>
                            <span class="counter_value2">{quantity}</span>
                            <button class="counter_btn2" onClick={increment}>+</button>
                        </div>
                        <div className="cart_card_delete"><MdDeleteOutline /></div>

                    </div>
                    {/* row 2 */}
                    <div className="cart_card_row2">
                      <h3 className="cart_card_PKR">PKR</h3>
                      <h3 className="cart_card_price1">1000</h3>
                    
                    </div>

                </div>

            </div>
            
            <hr class="divider" />

            <div className="cart_card_item">
                <div>Total items</div>
                <h3>3</h3>
                         
            </div>
            <div className="cart_card_price">
                <div>Total Amount</div>
                <h3>1000</h3>
                         
            </div>


        </div>
        </>
    );
}