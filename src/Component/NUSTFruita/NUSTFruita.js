import { FaArrowLeft } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../../utils/cartUtils";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
                            id={item.id}
                            imgurl={item.image}
                            name={item.name}
                            price={item.price}
                            type={`Per ${item.unit_type || 'kg'}`}
                            type2={item.unit_type || 'kg'}
                            stock={item.stock > 0}
                            unit_type={item.unit_type || 'kg'}
                         />
                        ))}

                </div>
                
        
        
        
        
        <div className="page-buttons">
          {renderPages()}
        </div>

            </div>
            

        </div>
        <ToastContainer />
        </>
    )
}

export default NUSTFruita;

function Nustfruita_card({ id, name, price, type, type2, imgurl, stock, unit_type }) {
    const [quantity, setQuantity] = useState(1);
    
    const increment = () => setQuantity((prev) => prev + 0.5);
    const decrement = () => setQuantity((prev) => (prev > 0.5 ? prev - 0.5 : 0.5));

    const handleAddToCart = () => {
        if (!stock) {
            toast.error("Product is out of stock");
            return;
        }
        
        // Get user data from localStorage
        const userData = localStorage.getItem('userData');
        const userInfo = userData ? JSON.parse(userData) : { name: 'default_user' };
        
        addToCart({
            business_name: 'NUSTFruita',
            product_id: id,
            product_name: name,
            price: price,
            quantity: quantity,
            user_id: userInfo.name || 'default_user',
            image: imgurl || '',
            store_type: 'nustfruita',
            description: `${name} - ${type}`,
            unit_type: unit_type || 'kg'
        });
        
        toast.success(`${name} added to cart!`);
    };

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
                    <div className="counter_box2">
                        <button className="counter_btn2" onClick={decrement}>−</button>
                        <span className="counter_value2">{quantity}</span>
                        <button className="counter_btn2" onClick={increment}>+</button>
                    </div>
                    <div className="nustfruita_price_kg">
                        <p className="nustfruita_price_kg">{type2}</p>
                    </div>
                </div>
        
                <div className="nustfruita_btn">
                    <button 
                    onClick={handleAddToCart}
                    className="primary-btn"
                    disabled={!stock}
                    >Add To Cart</button>
                </div>
        
              </div>
              
        
          
        
            
              
            </div>
        </>
    );
}
