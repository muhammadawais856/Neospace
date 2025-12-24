import React from "react";
import "../../Styles/Auth/signup.css";
import { useNavigate } from "react-router-dom";

function SignUp() {
    const navigate = useNavigate();
  return (
    <div className="signup_main">
      <div className="signup_box">

        {/* LEFT SIDE FORM */}
        <div className="signup_left">
          <h2>Create your Account</h2>
          <p className="signup_subtitle">
            Welcome! Please fill in your details to sign up.
          </p>

          <div className="signup_fields">
            <input type="text" placeholder="Full Name" />
            <input type="email" placeholder="Email" />
            <input type="text" placeholder="Contact" />
            <input type="password" placeholder="Password" />
            <input type="password" placeholder="Confirm Password" />
          </div>

          <div className="signup_options">
            <label className="agree_terms">
              <input type="checkbox" /> I agree to the Terms & Conditions
            </label>
          </div>

          <button className="primary-btn" >Sign Up</button>

          <p className="signup_login">
            Already have an account? <span className="login_link" onClick={()=>{navigate('/login')}}>Log in</span>
          </p>
        </div>

        {/* RIGHT SIDE FULL IMAGE */}
        <div className="signup_right">
          <img src="https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=900&q=80" alt="Sign Up" />
        </div>

      </div>
    </div>
  );
}

export default SignUp;
