import { FaArrowLeft } from "react-icons/fa6";
import "../../Styles/Small_business/Small_business_profile.css";
import { FaStar } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";



const data = [
  {
    id: 1,
    imgurl: "https://png.pngtree.com/thumb_back/fh260/background/20240408/pngtree-zinger-burger-ad-poster-design-image_15710081.jpg",
    name: "Zinger Burger",
    description: "Crispy chicken burger with cheese and mayo.",
    price: "450",
    rating: 4
  },
  {
    id: 2,
    imgurl: "https://thumbs.dreamstime.com/b/close-up-four-cheese-pizza-slice-close-up-shot-four-cheese-pizza-perfectly-melted-cheese-stretchy-gooey-ready-327216466.jpg",
    name: "Cheese Pizza",
    description: "Classic mozzarella cheese pizza with tomato sauce.",
    price: "950",
    rating: 5
  },
  {
    id: 3,
    imgurl: "https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZnJlbmNoJTIwZnJpZXN8ZW58MHx8MHx8fDA%3D",
    name: "French Fries",
    description: "Golden crispy fries with salt.",
    price: "250",
    rating: 4
  },
  {
    id: 4,
    imgurl: "https://i.ytimg.com/vi/VlHyNmTp90o/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBpvFOIOEcJ0gNPt8lHSngL6prEzA",
    name: "Chicken Shawarma",
    description: "Juicy chicken wrapped in pita with garlic sauce.",
    price: "400",
    rating: 5
  },
  {
    id: 5,
    imgurl: "https://i.ytimg.com/vi/XCMswR4fC5g/maxresdefault.jpg",
    name: "Club Sandwich",
    description: "Triple-layer sandwich with chicken and vegetables.",
    price: "550",
    rating: 4
  },
  {
    id: 6,
    imgurl: "https://cliftonnimco.com/wp-content/uploads/2018/04/Chicken-Roll.jpg",
    name: "Chicken Roll",
    description: "Paratha roll filled with spicy chicken.",
    price: "300",
    rating: 4
  },
  {
    id: 7,
    imgurl: "https://searafoodsme.com/wp-content/uploads/2022/04/Beef-Burger1080x720px.jpg",
    name: "Beef Burger",
    description: "Juicy grilled beef patty with cheese slice.",
    price: "500",
    rating: 5
  },
  {
    id: 8,
    imgurl: "https://www.licious.in/blog/wp-content/uploads/2016/07/Hot-Dogs.jpg",
    name: "Hot Dog",
    description: "Sausage in bun topped with mustard & sauce.",
    price: "280",
    rating: 3
  },
  {
    id: 9,
    imgurl: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38",
    name: "Pepperoni Pizza",
    description: "Loaded with pepperoni and extra cheese.",
    price: "1100",
    rating: 5
  },
  {
    id: 10,
    imgurl: "https://hamariweb.com/recipes/images/recipeimages/258.jpg",
    name: "Chicken Nuggets",
    description: "Crispy bite-sized chicken nuggets.",
    price: "350",
    rating: 4
  },
  {
    id: 11,
    imgurl: "https://iamhomesteader.com/wp-content/uploads/2023/02/bbq-wings.jpg",
    name: "BBQ Wings",
    description: "Spicy BBQ coated chicken wings.",
    price: "650",
    rating: 5
  },
  {
    id: 12,
    imgurl: "https://i.pinimg.com/736x/00/c4/07/00c407443906c34a0a5af65775881931.jpg",
    name: "Loaded Fries",
    description: "Fries topped with cheese and chicken chunks.",
    price: "480",
    rating: 4
  },
  {
    id: 13,
    imgurl: "https://static.sooperchef.pk/topics/2024/05/chicken-vegetable-macaroni-recipe-550x375.jpg",
    name: "Chicken Pasta",
    description: "Creamy white sauce pasta with chicken.",
    price: "750",
    rating: 4
  },
  {
    id: 14,
    imgurl: "https://static.toiimg.com/thumb/61589069.cms?imgsize=788682&width=800&height=800",
    name: "Fried Chicken",
    description: "Crispy fried chicken pieces.",
    price: "700",
    rating: 5
  },
  {
    id: 15,
    imgurl: "https://www.kitchensanctuary.com/wp-content/uploads/2021/05/Double-Cheeseburger-square-FS-42.jpg",
    name: "Double Cheese Burger",
    description: "Two cheese slices with double chicken patty.",
    price: "650",
    rating: 5
  }
];


function Small_business_profile(){
    const navigate = useNavigate();
  const [startIdx, setStartIndex] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  function calculatePages(totalCards) {
    return Math.ceil(totalCards / 9); 
  }

  useEffect(() => {
    setTotalPages(calculatePages(data.length));
  },[]);

  function renderPages() {
  const buttons = [];
  for (let i = 0; i < totalPages; i++) {
    buttons.push(
      <button
        key={i}
        className={`page-btn ${startIdx === i * 9 ? 'active' : ''}`}
        onClick={() => {setStartIndex(i * 10);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      >
        {i + 1}
      </button>
    );
  }
  return buttons;
}
    return(
        <>
        <div className="business_profile_main">
            <div className="business_profile_arrow" onClick={() => navigate("/smallbusiness")}> <FaArrowLeft /></div>
            <div className="business_profile_outer">
                {/*----------------------------------------
                                Section 1
                   ----------------------------------------
                */}
                <div className="business_profile_sec1">
                    <div className="business_profile_left">
                        <h3 className="business_profile_name">Ali fast food</h3>
                        <p className="business_profile_type">Restaurant</p>
                        <p className="business_profile_description">Serving fresh burgers, fries, and BBQ with affordable prices.</p>

                    </div>
                    <div className="business_profile_right">
                        <Ratingcard/>

                    </div>

                </div>
                {/*----------------------------------------
                                Section 2
                   ----------------------------------------
                */}
                <div className="business_profile_sec2">
                    <div className="search-wrapper">
                        <input type="text" className="search-input" placeholder="Search products" />
                        <IoSearch className="search-icon" />
                    </div>
                </div>

                {/*----------------------------------------
                                Section 3
                   ----------------------------------------
                */}
                <div className="business_profile_item_card">
                    {data.slice(startIdx, startIdx + 9).map(item => (
                     <Carditems
                        key={item.id}
                        imgurl={item.imgurl}
                        name={item.name}
                        description={item.description}
                        price={item.price}
                        rating={item.rating}/>
                   ))}
                    
                </div>
                <div className="page-buttons">
                    {renderPages()}
               </div>

            </div>

        </div>
        </>
    )
}
export default Small_business_profile;

function Ratingcard() {
    return(
        <>
        <div className="rating_card">
            <h3>3.5</h3>
            <div className="rating">
                <FaStar className="goldStar" />
                <FaStar className="goldStar" />
                <FaStar className="goldStar" />
                <FaStar className="goldStar" />
                <FaStar className="grayStar" />
            </div>
            <p>22 Orders completed</p>
        </div>
        
        </>
    );
}

function Carditems({imgurl, name, description, price, rating}){
     const navigate = useNavigate();

      const handleClick = () => {
      navigate("/Smallbusinessitem"); // navigate on click
     }  ;
    return(
        <>
        <div className="business_profile_items"
        onClick={handleClick}   // correct placement
        style={{ cursor: "pointer" }}>
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