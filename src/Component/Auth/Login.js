import React from "react";
import "../../Styles/Auth/login.css";
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();
  return (
    <div className="login_main">
      <div className="login_box">

        {/* LEFT SIDE FORM */}
        <div className="login_left">
          <h2>Log in to your Account</h2>
          <p className="login_subtitle">
            Welcome back! Please enter your details.
          </p>

          <div className="login_fields">
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
          </div>

          <div className="login_options">
            <label className="remember_me">
              <input type="checkbox" /> Remember me
            </label>
            <a href="#" className="forgot_link">Forgot Password?</a>
          </div>

          <button className="primary-btn" >Log In</button>

          <p className="login_signup">
            Don't have an account? <span className="signup_link" onClick={()=>{navigate('/signup')}}>Create an account</span>
          </p>
        </div>

        {/* RIGHT SIDE FULL IMAGE */}
        <div className="login_right"   >
            <img src="https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=900&q=80"></img>

        </div>

      </div>
    </div>
  );
}

export default Login;
