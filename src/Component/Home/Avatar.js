import "../../Styles/Home/Avatar.css";
import logo from "../../assets/user.png";

function Avatar(){
    return(
        <div className="avatar">
            <img src={logo} className="avatarimg" alt="user" />
        </div>
    )
}

export default Avatar;
