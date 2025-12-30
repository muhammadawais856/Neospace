import { FaArrowLeft } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../Styles/NustFruita/Nustfruita.css";
import { nustfruitaApi } from "../../services/nustfruitaApi";


function NUSTFruita(){
      const navigate = useNavigate();
      const [startIdx, setStartIndex] = useState(0);
      const [totalPages, setTotalPages] = useState(0);
      const [data, setData] = useState([]);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState(null);
    
      useEffect(() => {
        fetchProducts();
      }, []);

      async function fetchProducts() {
        try {
          setLoading(true);
          setError(null);
          const products = await nustfruitaApi.getProducts();
          setData(products);
          setTotalPages(Math.ceil(products.length / 9));
        } catch (err) {
          console.error("Error fetching products:", err);
          setError("Failed to load products. Please try again later.");
          setData([]);
        } finally {
          setLoading(false);
        }
      }
    
      function calculatePages(totalCards) {
        return Math.ceil(totalCards / 9); 
      }
    
      useEffect(() => {
        if (data.length > 0) {
          setTotalPages(calculatePages(data.length));
        }
      }, [data]);
    
      function renderPages() {
      const buttons = [];
      for (let i = 0; i < totalPages; i++) {
        buttons.push(
          <button
            key={i}
            className={`page-btn ${startIdx === i * 9 ? 'active' : ''}`}
            onClick={() => {setStartIndex(i * 9);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >{i + 1}
          </button>
        );
      }
      return buttons;
    }
    
    if (loading) {
      return (
        <div className="nustfruita_main"> 
          <div className="arrow_nustfruita" onClick={() => navigate('/')}> <FaArrowLeft /></div>
          <div className="nustfruita_outer">
            <div className="nustfruita_maintitle">
              <h3>NUSTFruita</h3>
            </div>
            <div style={{ padding: '20px', textAlign: 'center' }}>Loading...</div>
          </div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="nustfruita_main"> 
          <div className="arrow_nustfruita" onClick={() => navigate('/')}> <FaArrowLeft /></div>
          <div className="nustfruita_outer">
            <div className="nustfruita_maintitle">
              <h3>NUSTFruita</h3>
            </div>
            <div style={{ padding: '20px', textAlign: 'center', color: 'red' }}>{error}</div>
          </div>
        </div>
      );
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
                            type={`Per ${item.unit_type || 'kg'}`}
                            type2={item.unit_type || 'kg'}
                            stock={item.stock > 0}
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

function Nustfruita_card({ name, price, type, type2, imgurl, stock }) {
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
                    className="primary-btn">Add To Cart</button>
                </div>
        
              </div>
              
        
          
        
            
              
            </div>
        </>
    );
}
