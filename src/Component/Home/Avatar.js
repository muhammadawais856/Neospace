import "../../Styles/Home/Avatar.css";
import logo from "../../assets/user.png";

function Avatar({ imageUrl }){
    return(
        <div className="avatar">
            <img src={imageUrl || logo} className="avatarimg" alt="user" />
        </div>
    )
}

export default Avatar;
