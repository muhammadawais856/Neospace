import { useNavigate } from "react-router-dom";
function Card({heading_name, image_, redirect}) {
    const navigate = useNavigate();
    return(
        <>
        <div 
        onClick={()=>{navigate(redirect)}}
        className="Card"  style={{
        backgroundImage: image_ ? `url(${image_})` : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}>
            <h3 className="Card-text" > 
                {heading_name} 
            </h3>
        </div>
        </>
    )
}

export default Card;
