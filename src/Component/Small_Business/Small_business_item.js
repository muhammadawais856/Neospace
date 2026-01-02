import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { smallBusinessApi } from "../../services/smallBusinessApi";
import { smallBusinessApi as profileApi } from "../../services/smallBusinessApi";
import { addToCart } from "../../utils/cartUtils";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../Styles/Small_business/Small_business_item.css";

function Small_business_item() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const productId = searchParams.get("productId");
  const businessId = searchParams.get("businessId");
  
  const [productData, setProductData] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [businessName, setBusinessName] = useState("");

  useEffect(() => {
    if (productId) {
      fetchProductData();
      if (businessId) {
        fetchBusinessProducts();
      }
    } else {
      setError("Product ID not provided");
      setLoading(false);
    }
  }, [productId, businessId]);

  const handleAddToCart = () => {
    if (!productData) return;
    
    // Get user data from localStorage
    const userData = localStorage.getItem('userData');
    const userInfo = userData ? JSON.parse(userData) : { name: 'default_user' };
    
    // Get business name from profile if available
    const businessInfo = businessName || productData.business_type || 'Unknown Store';
    
    addToCart({
      business_name: businessInfo,
      product_id: productId,
      product_name: productData.name,
      price: productData.price,
      quantity: quantity,
      user_id: userInfo.name || 'default_user',
      image: mainImage || productData.imgs?.[0] || '',
      store_type: 'small_business',
      description: productData.description
    });
    
    toast.success(`${productData.name} added to cart!`);
  };

  async function fetchProductData() {
    try {
      setLoading(true);
      setError(null);
      const data = await smallBusinessApi.getBusinessItem(productId);
      setProductData(data);
      if (data.imgs && data.imgs.length > 0) {
        setMainImage(data.imgs[0]);
      }
    } catch (err) {
      console.error("Error fetching product:", err);
      setError("Failed to load product. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  async function fetchBusinessProducts() {
    try {
      const data = await profileApi.getProfile(businessId);
      setProducts(data.products || []);
      setBusinessName(data.name || "");
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  }

  if (loading) {
    return (
      <div className="business_item_main">
        <div className="arrow" onClick={() => {
          if (businessId) {
            navigate(`/Smallbusinessprofile?businessId=${businessId}`);
          } else {
            window.history.back();
          }
        }}>
          <FaArrowLeft />
        </div>
        <div style={{ padding: '20px', textAlign: 'center' }}>Loading...</div>
      </div>
    );
  }

  if (error || !productData) {
    return (
      <div className="business_item_main">
        <div className="arrow" onClick={() => {
          if (businessId) {
            navigate(`/Smallbusinessprofile?businessId=${businessId}`);
          } else {
            window.history.back();
          }
        }}>
          <FaArrowLeft />
        </div>
        <div style={{ padding: '20px', textAlign: 'center', color: 'red' }}>
          {error || "Product not found"}
        </div>
      </div>
    );
  }

  const subImages = productData.imgs || [];

  const increment = () => setQuantity((prev) => prev + 1);
  const decrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <>
      <div className="business_item_main">
        <div
          className="arrow"
          onClick={()=>{
            if (businessId) {
              navigate(`/Smallbusinessprofile?businessId=${businessId}`);
            } else {
              window.history.back();
            }
          }}
        >
          {" "}
          <FaArrowLeft />
        </div>
        <div className="business_item_forbottom">
          <div className="business_item_outer">
            {/*----------------------------------------
                                left
               ----------------------------------------
            */}
            <div className="business_item_left">
              <div className="business_item_mainimg">
                <img src={mainImage} alt="Main" />
              </div>
              <div className="business_item_subimg">
                {subImages.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`Sub ${index}`}
                    onClick={() => setMainImage(img)}
                  />
                ))}
              </div>
            </div>

            {/*----------------------------------------
                                Right
                   ----------------------------------------
                */}
            <div className="business_item_right">
              <div className="business_item_detail">
                <h3 className="business_item_name">{productData.name}</h3>
                <p className="business_item_type">{productData.business_type}</p>
                <div className="business_item_price">
                  <p className="business_item_pkr">PKR</p>
                  <p className="business_item_price_act">{productData.price}</p>
                </div>
                <p className="busines_item_description">
                  {productData.description}
                </p>
              </div>
              <div className="counter_box">
                <button className="counter_btn" onClick={decrement}>
                  −
                </button>
                <span className="counter_value">{quantity}</span>
                <button className="counter_btn" onClick={increment}>
                  +
                </button>
              </div>
              <div className="businessbtn3">
                <button
                  onClick={handleAddToCart}
                  className="primary-btn"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>

          {/*----------------------------------------
                          Bottom
          ----------------------------------------*/}

          <div className="business_profile_item_card_more">
            {products.map((item, index) => {
              // If last item, show the blurred card with "Show More"
              if (index === products.length - 1) {
                return (
                  <div
                    key="showMore"
                    className="business_profile_items show_more_card"
                    onClick={() => navigate(`/Smallbusinessprofile?businessId=${businessId}`)}
                    style={{ cursor: "pointer" }}
                  >
                    <div
                      className="business_profile_image_show_more"
                      style={{
                        backgroundImage: `url(${item.img})`,
                        filter: "blur(7px)", // blur the image
                        position: "relative",
                      }}
                    ></div>
                    <div className="show_more_text">
                      <h3>Show<br/> More</h3>
                    </div>
                  </div>
                );
              }

              // Normal card
              return (
                <Carditems
                  key={item.id}
                  id={item.id}
                  imgurl={item.img}
                  name={item.name}
                  description={item.description}
                  price={item.price}
                  rating={item.rating}
                  businessId={businessId}
                />
              );
            })}
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default Small_business_item;

function Carditems({ id, imgurl, name, description, price, rating, businessId }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/Smallbusinessitem?productId=${id}&businessId=${businessId}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
    // navigate on click
  };
  return (
    <>
      <div
        className="business_profile_items"
        onClick={handleClick} // correct placement
        style={{ cursor: "pointer" }}
      >
        <div
          className="business_profile_image"
          style={{ backgroundImage: `url(${imgurl})` }}
        ></div>
        <div className="business_profile_bottom">
          <h3 className="item_name">{name}</h3>
          <p className="description">{description}</p>
          <div className="items_items">
            <div className="item_price">
              <h3>PKR</h3>
              <h3>{price}</h3>
            </div>
            <div className="item_star">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  className={i < rating ? "goldStar" : "grayStar"}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
