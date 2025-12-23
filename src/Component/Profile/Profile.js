import { useState } from "react";
import logo from "../../assets/stars.png";
import logo2 from "../../assets/user2.jpg";
import { FaRegEdit } from "react-icons/fa";
import "../../Styles/Profile/Profile.css";

function Profile() {
  const [name, setName] = useState("Muhammad Awais Lateef");
  const [email, setEmail] = useState("awais@gmail.com");
  const [contact, setContact] = useState("+92 123 4567890");
  const [address, setAddress] = useState("123 Main Street, City");
  const [credits] = useState(150);
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState(logo2);

  // Handle image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfileImage(reader.result); // set preview of image
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="profile_main">
      <div className="profile_outer">

        {/*---------------- Profile Left Section ----------------*/}
        <div className="profile_left">
          <div className="profile_image">
            <img
                src={profileImage}
                className="profile_base_img"
                alt="user"
                style={{ cursor: isEditing ? "pointer" : "default" }}
                onClick={() => {
                if (isEditing) {
                  document.getElementById("fileInput").click();
                }
                }}
            />
            
            {/* Hidden file input */}
            <input
              type="file"
              id="fileInput"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleImageChange}
            />
          </div>
        </div>

        {/*---------------- Profile Right Section ----------------*/}
        <div className="profile_right">
          <div className="profile_header">
            <div className="profile_name">
              <h3>{name}</h3>
            </div>
            <div className="profile_edit">
              <FaRegEdit
                style={{ cursor: "pointer" }}
                onClick={() => setIsEditing(!isEditing)}
              />
            </div>
          </div>

          <div className="profile_credits">
            <img src={logo} className="logo2" alt="logo" />
            <p className="credits_value">{credits}</p>
            <p className="credits">Credits Remaining</p>
          </div>

          <div className="profile_details">
            <div className="profile_namefield">
                <p className="profiletitle">Name</p>
                <input
                  type="text"
                  className="profile_titleinput"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={!isEditing}
                  maxLength={20}
                />
            </div>

            <div className="profile_emailfield">
                <p className="profiletitle">Email</p>
                <input
                  type="text"
                  className="profile_titleinput"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={!isEditing}
                  maxLength={50}
                />
            </div>

           <div className="profile_contactfield">
            <p className="profiletitle">Contact</p>
            <input
              type="text"
              className="profile_titleinput"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              disabled={!isEditing}
              maxLength={20}
            />
          </div>

          <div className="profile_contactfield">
            <p className="profiletitle">Address</p>
            <input
              type="text"
              className="profile_titleinput"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              disabled={!isEditing}
              maxLength={100}
            />
          </div>

           </div>
            

          <div className="profile_btn">
            <button className="primary-btn" onClick={() => setIsEditing(false)} >
              Save
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Profile;
