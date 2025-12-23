import Avatar from "./Avatar";
import Card from "./Card";
import "../../Styles/Home/inner1.css"
import "../../Styles/Home/inner2.css"
import "../../Styles/Home/outer.css"
import "../../Styles/Home/Card.css"
import logo from "../../assets/stars.png"
import { useNavigate } from "react-router-dom";

function Home(){
     const navigate = useNavigate();
    return(
        
    <>
<div className="outer">

    <div className="inner1">
        <div className="left">
           
            <div onClick={() => {navigate('/profile')}}>
                <Avatar />
            </div> 

            <div className="para" 
            onClick={() => {navigate('/profile')}}>
                <h3 className="name">Awais Lateef</h3>
                <p className="company">Neosyss</p>
            </div>
        </div>

        <div className="right">
            <img src={logo} className="logo2" alt="logo" />
            <div className="para2">
                <p>4 credits</p>
            </div>
        </div>
    </div>
   

    <div className="inner2"> 
        <div className="top">
            <div className="col1">
                <Card heading_name={"Birthdays"}  redirect={"/birthdays"} image_={"https://images.unsplash.com/photo-1527529482837-4698179dc6ce"}  />
                <Card heading_name={"Carpool"}  redirect={"/carpool"} image_={"https://images.unsplash.com/photo-1503376780353-7e6692767b70"} />
                 
            </div>

            <div 
            onClick={() => {navigate('/smallbusiness')}}
            className="col2">
                <Card2> </Card2> 
            </div>
        </div>
            
            <div 
            onClick={() => {navigate('/nustfruita')}}
            className="row1">
                <Card3></Card3>
            </div>

       </div>
    
    
    

            


</div>
            
    </>
    )
}

export default Home;

function Card3(){
    return(
        <div className="card3">
            <h3 className="card3-text">NUSTFruita</h3>
        </div>
    )
}


function Card2(){
    return(
        <div className="card2">
            <h3 className="card2-text">Small Business</h3>
        </div>
    )
}

