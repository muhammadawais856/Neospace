import logo from "../../assets/user.png";
import { FaStar } from "react-icons/fa";
import "../../Styles/Small_business/Small_business.css";
import { FaArrowLeft } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";



// 10 different business service providers
const data = [
  {
    id: 1,
    imgurl: "https://images.unsplash.com/photo-1550547660-d9450f859349", // Fast food
    name: "Ali Fast Food",
    type: "Restaurant",
    description: "Serving fresh burgers, fries, and BBQ with affordable prices.",
    rating: 4
  },
  {
    id: 2,
    imgurl: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f", // Clothing store
    name: "Raza Clothing Store",
    type: "Clothing",
    description: "Trendy men and women clothing with modern designs and reasonable rates.",
    rating: 5
  },
  {
    id: 3,
    imgurl: "https://images.unsplash.com/photo-1518770660439-4636190af475", // Electronics
    name: "Malik Electronics",
    type: "Electronics",
    description: "Mobile phones, accessories, and home appliances with warranty and support.",
    rating: 4
  },
  {
    id: 4,
    imgurl: "https://images.unsplash.com/photo-1600948836101-f9ffda59d250", // Salon
    name: "Sheikh Beauty Salon",
    type: "Salon",
    description: "Professional haircuts, grooming, facial, and bridal makeup services.",
    rating: 5
  },
  {
    id: 5,
    imgurl: "https://miro.medium.com/v2/resize:fit:1400/0*I0eib7kRe1y278DY", // Grocery store
    name: "Qureshi Grocery Mart",
    type: "Grocery Store",
    description: "Daily grocery items, fresh vegetables, and household essentials at low prices.",
    rating: 4
  },
  {
    id: 6,
    imgurl: "https://images.unsplash.com/photo-1509042239860-f550ce710b93", // Café
    name: "Farhan Café",
    type: "Café",
    description: "Coffee, snacks, and comfortable sitting environment for friends and families.",
    rating: 5
  },
  {
    id: 7,
    imgurl: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9", // Mobile shop
    name: "Tariq Mobile Zone",
    type: "Mobile Shop",
    description: "New and used mobiles with accessories and repair services available.",
    rating: 4
  },
  {
    id: 8,
    imgurl: "https://milkfarmla.com/wp-content/uploads/2014/02/Final_storefront_milkfarm-624x752.png", // Milk shop
    name: "Faisal Milk Shop",
    type: "Dairy Store",
    description: "Fresh milk, yogurt, butter, and other dairy products at hygienic standards.",
    rating: 3
  },
  {
    id: 9,
    imgurl: "https://img.freepik.com/free-photo/various-cakes-supermarket-shelves-sale_627829-7332.jpg?semt=ais_hybrid&w=740&q=80", // Bakery
    name: "Imran Bakers",
    type: "Bakery",
    description: "Fresh cakes, bread, pastries, and customized birthday cakes.",
    rating: 5
  },
  {
    id: 10,
    imgurl: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789", // IT services
    name: "Omar Tech Solutions",
    type: "IT Services",
    description: "Computer repair, software installation, and small business IT solutions.",
    rating: 4
  },
  {
    id: 11,
    imgurl: "https://media.istockphoto.com/id/872361244/photo/man-getting-his-beard-trimmed-with-electric-razor.jpg?s=612x612&w=0&k=20&c=_IjZcrY0Gp-2z6AWTQederZCA9BLdl-iqWkH0hGMTgg=", // Barber shop
    name: "Adnan Barber Shop",
    type: "Barber",
    description: "Stylish haircuts, beard trimming, and grooming services for men.",
    rating: 5
  },
  {
    id: 12,
    imgurl: "https://images.stockcake.com/public/9/5/a/95a22301-818d-42fd-b526-a1173f1ac5a1/colorful-stationery-store-stockcake.jpg",
    
    name: "Sami Stationery",
    type: "Stationery Store",
    description: "School, office, and art supplies available at discounted rates.",
    rating: 4
  },

  {
    id: 13,
    imgurl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e", // Accessories
    name: "Haris Headphones Hub",
    type: "Accessories Shop",
    description: "Audio devices, headphones, and mobile accessories with quality assurance.",
    rating: 3
  },
  {
    id: 14,
    imgurl: "https://t4.ftcdn.net/jpg/03/08/14/81/240_F_308148122_N4HZfcjmjk2M8yTsbQHSpYOfmU1HycVC.jpg", // Hardware store
    name: "Ahsan Hardware Store",
    type: "Hardware",
    description: "Plumbing, electrical, and home repair tools under one roof.",
    rating: 4
  },
  {
    id: 15,
    imgurl: "https://sportsnation.pk/cdn/shop/files/download_2.png?v=1748333202", // Sports shop
    name: "Tariq Sports Shop",
    type: "Sports Store",
    description: "Cricket, football, gym equipment, and sports accessories at best prices.",
    rating: 5
  }
];






function SmallBusiness() {
  
const navigate = useNavigate();
  const [startIdx, setStartIndex] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [showOfferService, setShowOfferService] = useState(true);

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


  return (
    
    <div className="businessmain">
      <div className="arrow_smallbusiness" onClick={() => navigate('/')}> <FaArrowLeft /></div>
      <div className="businessright">
            <button  
          onClick={() => {
            if(showOfferService){
              navigate('/businessofferservices');
            } else {
              navigate('/mystore'); // Different navigation if false
            }
          }}
          className="primary-btn2"
        >
          {showOfferService ? "Offer Services" : "My Store"}
        </button>
          </div>
      <div className="businessouter">
        <div className="businesstop">
          <div className="businessleft">
            <h3>Small Businesses</h3>
            <p>Serving with passion, growing with trust. </p>
          </div>
          
          
        </div>
        <div className="businessdropdown">
          <div className="business_filter"> <p>Filter</p> </div>
          <select>
            <option value="">All Categories</option>
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


        <div className="businessbottom">
          
          {data.slice(startIdx, startIdx + 9).map(item => (
            <BusinessCard
              key={item.id}
              imgurl={item.imgurl}
              name={item.name}
              type={item.type}
              description={item.description}
              car={item.car}
              rating={item.rating}
            />
          ))}
        </div>

        <div className="page-buttons">
          {renderPages()}
        </div>
      </div>
    </div>
  );
}

export default SmallBusiness;

function BusinessCard({ name, description,type,rating,imgurl }) {
  const navigate = useNavigate();
  return (
    
    <div className="businesscard">
      <div className="businessimageurl">
        <img src={imgurl} alt="business" />
      </div>
      <div className="businesscardbottom">
        <div className="businesssec1">
        <div className="nameetc">
          <div className="profilename">
            <h3 className="businessname">{name}</h3>
            <div className="businesstype">
              <p className="businesstype">{type}</p>

            </div>
          </div>
        </div>
        </div>

        <div className="businesssec2">
        <p className="description">{description}</p>
       </div>

        <div className="businessrow">
            <div className="rating">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  className={i < rating ? "goldStar" : "grayStar"}
                />
              ))}
            </div>

            <div className="businessbtn">
                <button onClick={()=>{navigate('/Smallbusinessprofile')}}
                   className="primary-btn">Visit Profile</button>
            </div>
        </div>

      </div>
      

  

    
      
    </div>
  );
}


