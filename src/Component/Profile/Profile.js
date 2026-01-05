import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/stars.png";
import logo2 from "../../assets/user2.jpg";
import { FaRegEdit } from "react-icons/fa";
import "../../Styles/Profile/Profile.css";
import { profileApi } from "../../services/profileApi";
import { useAuth } from "../../contexts/AuthContext";
import SignupModal from "../Common/SignupModal";

function Profile() {
  const navigate = useNavigate();
  const { isAuthenticated, user: authUser, updateUser } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [department, setDepartment] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState(logo2);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [showSignupModal, setShowSignupModal] = useState(false);

  useEffect(() => {
    // Only fetch profile if user is authenticated
    if (isAuthenticated && authUser) {
      // Initialize with authenticated user data
      setName(authUser.name || authUser.full_name || "");
      setEmail(authUser.email || "");
      if (authUser.img || authUser.profile_image) {
        setProfileImage(authUser.img || authUser.profile_image);
      }
      // Fetch profile from API
      fetchProfile();
    } else {
      setLoading(false);
    }
  }, [isAuthenticated, authUser]);

  async function fetchProfile() {
    try {
      setLoading(true);
      setError(null);
      const profile = await profileApi.getProfile();
      // Update with profile data if available, otherwise keep auth user data
      if (profile.email) setEmail(profile.email);
      if (profile.contact) setContact(profile.contact);
      if (profile.address) setAddress(profile.address);
      if (profile.department) setDepartment(profile.department);
      if (profile.img) {
        setProfileImage(profile.img);
      }
      if (profile.name) {
        setName(profile.name);
      }
    } catch (err) {
      console.error("Error fetching profile:", err);
      // If profile API fails, use auth user data as fallback
      if (isAuthenticated && authUser) {
        if (!name && (authUser.name || authUser.full_name)) {
          setName(authUser.name || authUser.full_name);
        }
        if (!email && authUser.email) {
          setEmail(authUser.email);
        }
      }
      // Don't show error if we have auth user data to fall back on
      if (!isAuthenticated || !authUser) {
        setError("Failed to load profile. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleSave() {
    try {
      setSaving(true);
      setError(null);
      const updatedProfile =       await profileApi.updateProfile({
        img: profileImage,
        email: email,
        contact: contact,
        address: address,
        department: department
      });
      setIsEditing(false);
      
      // Update AuthContext with new profile image
      if (isAuthenticated && authUser && updateUser) {
        const updatedUser = {
          ...authUser,
          img: updatedProfile.img || profileImage,
          name: updatedProfile.name || authUser.name,
          email: updatedProfile.email || authUser.email
        };
        updateUser(updatedUser);
      }
    } catch (err) {
      console.error("Error updating profile:", err);
      setError("Failed to save profile. Please try again.");
    } finally {
      setSaving(false);
    }
  }

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

  // Show login/signup message if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="profile_main">
        <div className="profile_outer">
          <div style={{ 
            textAlign: 'center', 
            padding: '60px 20px',
            maxWidth: '500px',
            margin: '0 auto'
          }}>
            <h2 style={{ marginBottom: '15px', fontSize: '24px', color: '#333' }}>
              Login or Sign up Required
            </h2>
            <p style={{ 
              marginBottom: '30px', 
              fontSize: '16px', 
              color: '#666',
              lineHeight: '1.6'
            }}>
              Please login or sign up to view and manage your profile.
            </p>
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '12px',
              maxWidth: '300px',
              margin: '0 auto'
            }}>
              <button 
                className="primary-btn" 
                onClick={() => navigate('/signup')}
                style={{ width: '100%', padding: '12px 24px', fontSize: '16px' }}
              >
                Sign Up
              </button>
              <button 
                onClick={() => navigate('/login')}
                style={{ 
                  width: '100%', 
                  padding: '12px 24px', 
                  fontSize: '16px',
                  fontWeight: '600',
                  background: 'transparent',
                  border: '2px solid var(--color5, #0571ff)',
                  color: 'var(--color5, #0571ff)',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'var(--color5, #0571ff)';
                  e.target.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'transparent';
                  e.target.style.color = 'var(--color5, #0571ff)';
                }}
              >
                Log In
              </button>
            </div>
          </div>
        </div>
        <SignupModal 
          isOpen={showSignupModal}
          onClose={() => setShowSignupModal(false)}
        />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="profile_main">
        <div className="profile_outer">
          <div style={{ padding: '20px', textAlign: 'center' }}>Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="profile_main">
      {error && <div style={{ color: 'red', padding: '10px', textAlign: 'center' }}>{error}</div>}
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

          <div className="profile_contactfield">
            <p className="profiletitle">School</p>
            <input
              type="text"
              className="profile_titleinput"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              disabled={!isEditing}
              maxLength={100}
            />
          </div>

           </div>
            

          <div className="profile_btn">
            <button 
              className="primary-btn" 
              onClick={handleSave}
              disabled={saving || !isEditing}
            >
              {saving ? "Saving..." : "Save"}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Profile;
