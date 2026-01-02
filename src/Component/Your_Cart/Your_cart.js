import { useState, useEffect } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { getCartByStores, removeFromCart, updateCartItemQuantity, getCartTotal, getCartItemsCount } from "../../utils/cartUtils";
import { useAuth } from "../../contexts/AuthContext";
import SignupModal from "../Common/SignupModal";
import "../../Styles/Your_cart/Your_cart.css";

function Your_cart() {
  const { isAuthenticated } = useAuth();
  const [stores, setStores] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [showSignupModal, setShowSignupModal] = useState(false);

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = () => {
    setStores(getCartByStores());
    setTotalAmount(getCartTotal());
    setTotalItems(getCartItemsCount());
  };

  const changeQty = (id, qty) => {
    if (qty <= 0) removeFromCart(id);
    else updateCartItemQuantity(id, qty);
    loadCart();
  };

  return (
    <div className="cart_page">

      {/* LEFT SIDE - VENDORS */}
      <div className="cart_left">

        {stores.map((store) => (
          <div className="vendor_card" key={store.business_name}>

            <h3 className="vendor_name">{store.business_name}</h3>

            {store.items.map(item => (
              <div className="cart_row" key={item.id}>

                <img src={item.image} className="cart_img" alt="" />

                <div className="cart_info">
                  <h4>{item.product_name}</h4>
                  <span className="price_each">Rs{item.price} each</span>
                  <div className="qty_box_row">
                    <p>Quantity:</p>
                    <div className="qty_box">
                     <button onClick={() => changeQty(item.id, item.quantity - 1)}>-</button>
                     <span>{item.quantity}</span>
                     <button onClick={() => changeQty(item.id, item.quantity + 1)}>+</button>
                 </div>
                </div>


                  
                </div>

                <div className="cart_right">
                    <div className="cart_right_top">
                    <p className="price_label">Subtotal</p>
                    <span className="subtotal">Rs{item.total_amount}</span>
                    </div>

                    <div className="cart_right_bottom">
                        <button className="remove_btn" onClick={() => removeFromCart(item.id) & loadCart()}>
                        Remove
                        </button>
                    </div>
                  
                  
                </div>

              </div>
            ))}

            <div className="vendor_total">
              <span>Subtotal</span>
              <strong>Rs{store.subtotal}</strong>
            </div>

          </div>
        ))}
      </div>

      {/* RIGHT SIDE - SUMMARY */}
      <div className="cart_summary">
        <h3>Order Summary</h3>

        <div className="summary_row">
          <span>Item Count:</span>
          <strong>{totalItems}</strong>
        </div>

        <div className="summary_row">
          <span>Unique Items:</span>
          <strong>{stores.length}</strong>
        </div>

        <div className="summary_row">
          <span>Subtotal:</span>
          <strong>Rs{totalAmount}</strong>
        </div>

        <div className="summary_total">
          <span>Total:</span>
          <strong>Rs{totalAmount}</strong>
        </div>

        <button 
          className="primary-btn"
          onClick={() => {
            if (!isAuthenticated) {
              // Store that user came from cart
              sessionStorage.setItem('signupRedirect', '/yourcart');
              setShowSignupModal(true);
            } else {
              // Handle checkout
              alert('Checkout functionality coming soon!');
            }
          }}
        >
          Proceed to Checkout
        </button>
      </div>

      <SignupModal 
        isOpen={showSignupModal}
        onClose={() => setShowSignupModal(false)}
        redirectPath="/yourcart"
      />

    </div>
  );
}

export default Your_cart;