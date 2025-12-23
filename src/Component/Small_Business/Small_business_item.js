import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaStar } from "react-icons/fa";
import "../../Styles/Small_business/Small_business_item.css";

const data = [
  {
    id: 1,
    imgurl:
      "https://png.pngtree.com/thumb_back/fh260/background/20240408/pngtree-zinger-burger-ad-poster-design-image_15710081.jpg",
    name: "Zinger Burger",
    description: "Crispy chicken burger with cheese and mayo.",
    price: "450",
    rating: 4,
  },
  {
    id: 2,
    imgurl:
      "https://thumbs.dreamstime.com/b/close-up-four-cheese-pizza-slice-close-up-shot-four-cheese-pizza-perfectly-melted-cheese-stretchy-gooey-ready-327216466.jpg",
    name: "Cheese Pizza",
    description: "Classic mozzarella cheese pizza with tomato sauce.",
    price: "950",
    rating: 5,
  },
  {
    id: 3,
    imgurl:
      "https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZnJlbmNoJTIwZnJpZXN8ZW58MHx8MHx8fDA%3D",
    name: "French Fries",
    description: "Golden crispy fries with salt.",
    price: "250",
    rating: 4,
  },
];

function Small_business_item() {
  const navigate = useNavigate();

  // State to hold the currently displayed main image
  const [mainImage, setMainImage] = useState(
    "https://png.pngtree.com/background/20250104/original/pngtree-zinger-burger-ad-poster-design-picture-image_15456216.jpg"
  );

  const subImages = [
    "https://png.pngtree.com/background/20250104/original/pngtree-zinger-burger-ad-poster-design-picture-image_15456216.jpg",
    "https://fillicafepk.com/wp-content/uploads/2023/12/zinger-burgerpsd.jpg",
  ];
  const [quantity, setQuantity] = useState(1);

  const increment = () => setQuantity((prev) => prev + 1);
  const decrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <>
      <div className="business_item_main">
        <div
          className="arrow"
          onClick={()=>{navigate('/Smallbusinessprofile')}}
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
                <h3 className="business_item_name">Zinger Burger</h3>
                <p className="business_item_type">Restaurant</p>
                <div className="business_item_price">
                  <p className="business_item_pkr">PKR</p>
                  <p className="business_item_price_act">450</p>
                </div>
                <p className="busines_item_description">
                  Crispy and juicy chicken patty fried to golden perfection.
                  Layered with fresh lettuce, ripe tomatoes, and crunchy
                  pickles. Topped with creamy mayonnaise and a slice of cheddar
                  cheese for extra flavor. Served in a soft, toasted bun.
                  Perfect for a quick lunch or a satisfying snack. Every bite is
                  packed with flavor and crunch.
                </p>
              </div>
              <div class="counter_box">
                <button class="counter_btn" onClick={decrement}>
                  −
                </button>
                <span class="counter_value">{quantity}</span>
                <button class="counter_btn" onClick={increment}>
                  +
                </button>
              </div>
              <div className="businessbtn3">
                <button
                  onClick={() => {
                    
                  }}
                  className="primary-btn3"
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
            {data.map((item, index) => {
              // If last item, show the blurred card with "Show More"
              if (index === data.length - 1) {
                return (
                  <div
                    key="showMore"
                    className="business_profile_items show_more_card"
                    onClick={() => navigate("/Smallbusinessprofile")}
                    style={{ cursor: "pointer" }}
                  >
                    <div
                      className="business_profile_image_show_more"
                      style={{
                        backgroundImage: `url(${item.imgurl})`,
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
                  imgurl={item.imgurl}
                  name={item.name}
                  description={item.description}
                  price={item.price}
                  rating={item.rating}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default Small_business_item;

function Carditems({ imgurl, name, description, price, rating }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/Smallbusinessitem");
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
