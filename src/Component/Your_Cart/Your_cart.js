import { useState, useEffect } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { getCartByStores, getCart, removeFromCart, updateCartItemQuantity, getCartTotal, getCartItemsCount } from "../../utils/cartUtils";
import "../../Styles/Your_cart/Your_cart.css"

function Your_cart(){
    const navigate = useNavigate();
    const [stores, setStores] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const [totalItems, setTotalItems] = useState(0);
    const [loading, setLoading] = useState(false);

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
                
                {loading ? (
                    <div style={{ padding: '20px', textAlign: 'center' }}>Loading...</div>
                ) : stores.length === 0 ? (
                    <div style={{ padding: '20px', textAlign: 'center' }}>Your cart is empty</div>
                ) : (
                    <>
                        {stores.map((store, storeIndex) => (
                            <div key={storeIndex} className="store-section">
                                <div className="store-header">
                                    <h3 className="store-name">{store.business_name}</h3>
                                </div>
                                
                                <div className="Cart_Card">
                                    {store.items.map((item, index) => (
                                        <Cart_card 
                                            key={item.id || index}
                                            item={item}
                                            onDelete={() => handleDeleteItem(item.id)}
                                            onQuantityChange={handleQuantityChange}
                                        />
                                    ))}
                                </div>
                                
                                <div className="store-subtotal">
                                    <div className="store-subtotal-row">
                                        <span>Subtotal ({store.business_name}):</span>
                                        <strong>PKR {store.subtotal.toFixed(2)}</strong>
                                    </div>
                                </div>
                                
                                {storeIndex < stores.length - 1 && <hr className="divider" />}
                            </div>
                        ))}
                        
                        <hr className="divider" />
                        <div className="cart_bottom">
                            <div className="cart_item">
                                <div>Total items</div>
                                <h3>{totalItems}</h3>
                            </div>
                            <div className="cart_price">
                                <div>Total Amount</div>
                                <h3>PKR {totalAmount.toFixed(2)}</h3>
                            </div>
                            <div className="checkout_btn">
                                <button 
                                    onClick={() => { 
                                        // Handle checkout
                                        alert('Checkout functionality coming soon!');
                                    }}
                                    className="primary-btn4">
                                    Check Out
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>

        </div>
        <ToastContainer />
        </>
    );
}

export default Your_cart;

function Cart_card({ item, onDelete, onQuantityChange }){
    const [quantity, setQuantity] = useState(item?.quantity || 1);
    
    const increment = () => {
        const newQty = item.store_type === 'nustfruita' ? quantity + 0.5 : quantity + 1;
        setQuantity(newQty);
        if (onQuantityChange) {
            onQuantityChange(item.id, newQty);
        }
    };
    
    const decrement = () => {
        const minQty = item.store_type === 'nustfruita' ? 0.5 : 1;
        const newQty = quantity > minQty ? (item.store_type === 'nustfruita' ? quantity - 0.5 : quantity - 1) : minQty;
        setQuantity(newQty);
        if (onQuantityChange) {
            onQuantityChange(item.id, newQty);
        }
    };

    useEffect(() => {
        setQuantity(item?.quantity || 1);
    }, [item?.quantity]);

    if (!item) return null;

    const itemPrice = item.price || 0;
    const totalPrice = item.total_amount || (itemPrice * quantity);

    return(
        <div className="cart-item-card">
            <div className="cart-item-image">
                <img 
                    src={item.image || "https://png.pngtree.com/thumb_back/fh260/background/20240408/pngtree-zinger-burger-ad-poster-design-image_15710081.jpg"} 
                    alt={item.product_name || "Product"}
                />
            </div>
            
            <div className="cart-item-details">
                <div className="cart-item-info">
                    <h3 className="cart-item-name">{item.product_name || `Product ID: ${item.product_id}`}</h3>
                    <p className="cart-item-description">
                        {item.description || `Product from ${item.business_name}`}
                    </p>
                    {item.unit_type && (
                        <span className="cart-item-unit">Unit: {item.unit_type}</span>
                    )}
                </div>
                
                <div className="cart-item-actions">
                    <div className="cart-item-quantity-section">
                        <label className="quantity-label">Quantity:</label>
                        <div className="quantity-controls">
                            <button 
                                className="quantity-btn minus" 
                                onClick={decrement}
                                aria-label="Decrease quantity"
                            >
                                −
                            </button>
                            <span className="quantity-value">
                                {quantity}
                                {item.unit_type && <span className="unit-display"> {item.unit_type}</span>}
                            </span>
                            <button 
                                className="quantity-btn plus" 
                                onClick={increment}
                                aria-label="Increase quantity"
                            >
                                +
                            </button>
                        </div>
                    </div>
                    
                    <div className="cart-item-price-section">
                        <div className="price-per-unit">
                            <span className="price-label">Price:</span>
                            <span className="price-value">PKR {itemPrice.toFixed(2)}</span>
                            {item.unit_type && <span className="price-unit">/{item.unit_type}</span>}
                        </div>
                        <div className="price-total">
                            <span className="total-label">Total:</span>
                            <span className="total-value">PKR {totalPrice.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="cart-item-remove">
                <button 
                    className="remove-btn" 
                    onClick={() => onDelete && onDelete(item.id)}
                    aria-label="Remove item"
                >
                    <MdDeleteOutline />
                </button>
            </div>
        </div>
    );
}

export default Your_cart;
