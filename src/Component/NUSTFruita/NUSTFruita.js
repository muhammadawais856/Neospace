import { FaArrowLeft } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../Styles/NustFruita/Nustfruita.css";

const data = [
  { id: 1, name: "Apple", image: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce", 
    price: 250, type: "Per kg",type2: "kg", stock: true },
  { id: 2, name: "Banana", image: "https://media.istockphoto.com/id/1494763483/photo/banana-concept.jpg?s=612x612&w=0&k=20&c=ZeVP-L6ClmyT-i0N-QAbDK7q37uHhrzg7KOzMkaOtg4=", 
    price: 180, type: "Per dozen",type2: "dozen", stock: false },
  { id: 3, name: "Orange", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPTkp31PKuS6rw3jMnWtSNFsXZ8Y6K_juUtg&s", 
    price: 220, type: "Per dozen",type2: "dozen", stock: false },
  { id: 4, name: "Mango", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAGKljhrQxtf2--UxfAGyj7jMHwTgWDpKkhQ&s", 
    price: 300, type: "Per kg",type2: "kg", stock: true },
  { id: 5, name: "Grapes", image: "https://images.unsplash.com/photo-1537640538966-79f369143f8f", 
    price: 280, type: "Per kg",type2: "kg", stock: true },
  { id: 6, name: "Pineapple", image: "https://images2.alphacoders.com/241/241720.jpg", 
    price: 200, type: "Per kg",type2: "kg", stock: false },
  { id: 7, name: "Strawberry", image: "https://media.istockphoto.com/id/2004978876/photo/strawberries-in-a-plate-on-a-wooden-table.jpg?s=612x612&w=0&k=20&c=_jCHaYs3wC-yBiq2C7Swnkv-_HXJH6Uxm2YEdhytYRs=", 
    price: 450, type: "Per kg",type2: "kg", stock: true },
  { id: 8, name: "Watermelon", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNCNilcM7jLltJTL3cmWfGHxd56zuiSisBIw&s", 
    price: 120, type: "Per kg",type2: "kg", stock: true },
  { id: 9, name: "Papaya", image: "https://media.istockphoto.com/id/1163930184/photo/papaya-on-wooden-background.jpg?s=612x612&w=0&k=20&c=W-1l2k1J8raJGvUb1NM0oeqEdC2DqRbt-2gpzfXL01o=", 
    price: 160, type: "Per kg",type2: "kg", stock: false },
  { id: 10, name: "Pomegranate", image: "https://images.unsplash.com/photo-1541345023926-55d6e0853f4b", 
    price: 350, type: "Per kg",type2: "kg", stock: false },
  { id: 11, name: "Peach", image: "https://www.womansworld.com/wp-content/uploads/2021/06/Fresh-peaches.jpg?quality=86&strip=all", 
    price: 260, type: "Per kg",type2: "kg", stock: true },
  { id: 12, name: "Kiwi", image: "https://images.unsplash.com/photo-1585059895524-72359e06133a", 
    price: 500, type: "Per kg",type2: "kg", stock: false },
  { id: 13, name: "Guava", image: "https://media.istockphoto.com/id/153980915/photo/a-photo-of-fresh-red-guavas-a-typical-tropical-fruit.jpg?s=612x612&w=0&k=20&c=QoDnC0jGzDrDnb2nU9fNRA3LdpQrlMwDnMngFChfLXM=", 
    price: 200, type: "Per kg",type2: "kg", stock: true },
  { id: 14, name: "Cherries", image: "https://media.istockphoto.com/id/1693717637/photo/cherry-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=lgZX1YqIPuTlkdEEX_xufZmL9AZzxHUgWzmWHEoKfOQ=", 
    price: 900, type: "Per kg",type2: "kg", stock: true },
  { id: 15, name: "Pear", image: "https://images4.alphacoders.com/686/thumb-1920-686881.jpg", 
    price: 240, type: "Per kg",type2: "kg", stock: true }
];



function NUSTFruita(){
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
          >{i + 1}
          </button>
        );
      }
      return buttons;
    }
    
    return(
        <>
        <div className="nustfruita_main"> 
            <div className="arrow_nustfruita" onClick={() => navigate('/')}> <FaArrowLeft /></div>
            <div className="nustfruita_outer">
                <div className="nustfruita_maintitle">
                    <h3>NUSTFruita</h3>
                </div>
                <div className="nustfruita_bottom">
                    {data.slice(startIdx, startIdx + 9).map(item => (
                        <Nustfruita_card
                            key={item.id}
                            imgurl={item.image}
                            name={item.name}
                            price={item.price}
                            type={item.type}
                            type2={item.type2}
                            stock={item.stock}
                         />
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

export default NUSTFruita;

function Nustfruita_card({ name, price, type,type2, imgurl,stock }) {
    const [quantity, setQuantity] = useState(1);
    
      const increment = () => setQuantity((prev) => prev + 0.5);
      const decrement = () => setQuantity((prev) => (prev > 1 ? prev - 0.5 : 0.5));

    return(
        <>
        <div className="nustfruita_card">
              <div className="nustfruita_imageurl">
                {!stock && <p className="outofstock">Out Of Stock</p>}
                <img src={imgurl} alt="nustfruita" />
              </div>
              <div className="nustfruita_card_bottom">
                
                <div className="nustfruita_sec1">
                <div className="nustfruita_nameetc">
                    <div className="nustfruita_profilename">
                        <h3 className="nustfruita_businessname">{name}</h3>
                        <div className="businesstype_price_detail">
                            <p className="nustfruita_price_PKR">PKR</p>
                            <p className="nustfruita_price">{price}</p>
                            <p className="nustfruita_price_kg">{type}</p>
                        </div>
                    </div>
                </div>
                </div>
        
                <div className="businesssec2">
                    <div class="counter_box2">
                        <button class="counter_btn2" onClick={decrement}>−</button>
                        <span class="counter_value2">{quantity}</span>
                        <button class="counter_btn2" onClick={increment}>+</button>
                    </div>
                    <div className="nustfruita_price_kg">
                        <p className="nustfruita_price_kg">{type2}</p>
                    </div>
                </div>
        
                <div className="nustfruita_btn">
                    <button 
                    //onClick={()=>{navigate('/Smallbusinessprofile')}}
                    className="primary-btn">Add To Cart</button>
                </div>
        
              </div>
              
        
          
        
            
              
            </div>
        </>
    );
}