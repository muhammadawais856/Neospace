import Avatar from "./Avatar";
import Card from "./Card";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { homeApi } from "../../services/homeApi";
import "../../Styles/Home/inner1.css"
import "../../Styles/Home/inner2.css"
import "../../Styles/Home/outer.css"
import "../../Styles/Home/Card.css"
import logo from "../../assets/stars.png"

function Home(){
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        name: "User",
        email: "",
        credits: 0,
        img: ""
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchHomeData();
    }, []);

    async function fetchHomeData() {
        try {
            setLoading(true);
            const data = await homeApi.getHomeData();
            if (data && data.user) {
                setUserData(data.user);
                // Store user data in localStorage
                localStorage.setItem('userData', JSON.stringify(data.user));
            }
        } catch (err) {
            console.error("Error fetching home data:", err);
            // Try to get from localStorage if API fails
            const storedData = localStorage.getItem('userData');
            if (storedData) {
                setUserData(JSON.parse(storedData));
            }
        } finally {
            setLoading(false);
        }
    }

    return(
        
    <>
<div className="outer">

    <div className="inner1">
        <div className="left">
           
            <div onClick={() => {navigate('/profile')}}>
                <Avatar imageUrl={userData.img} />
            </div> 

            <div className="para" 
            onClick={() => {navigate('/profile')}}>
                <h3 className="name">{loading ? "Loading..." : userData.name}</h3>
                <p className="company">{userData.email}</p>
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

