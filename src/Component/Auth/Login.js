import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../contexts/AuthContext";
import { authApi } from "../../services/authApi";
import "../../Styles/Auth/login.css";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      // Login API expects username, but we have email
      // Try using email as username first (backend should handle this)
      const loginResponse = await authApi.login(data.email, data.password);
      
      // Get user data after login
      try {
        const userInfo = await authApi.getCurrentUser(loginResponse.access_token);
        const userData = {
          name: userInfo.full_name || userInfo.username || data.email.split('@')[0],
          email: userInfo.email,
          username: userInfo.username,
          credits: 0,
          img: ""
        };
        
        login(loginResponse.access_token, userData);
      } catch (userError) {
        // If getting user info fails, use basic data from email
        const userData = {
          name: data.email.split('@')[0],
          email: data.email,
          username: data.email.split('@')[0],
          credits: 0,
          img: ""
        };
        login(loginResponse.access_token, userData);
      }
      
      toast.success("Login Successful!");
      
      // Check for redirect path
      const redirectPath = sessionStorage.getItem('signupRedirect');
      if (redirectPath) {
        sessionStorage.removeItem('signupRedirect');
        navigate(redirectPath);
      } else {
        navigate('/');
      }
    } catch (error) {
      toast.error(error.message || "Login failed. Please check your credentials.");
    }
  };

  const showError = (message) => {
    toast.error(message, {
      position: "top-right",
    });
  };

  const handleErrors = () => {
    const values = getValues();
    const allEmpty = !values.email && !values.password;

    if (allEmpty) {
      showError("All fields are required");
    } else {
      if (errors.email) showError(errors.email.message);
      if (errors.password) showError(errors.password.message);
    }
  };

  return (
    <div className="login_main">
      <div className="login_box">
        {/* LEFT SIDE FORM */}
        <div className="login_left">
          <h2>Log in to your Account</h2>
          <p className="login_subtitle">Welcome back! Please enter your details.</p>

          <form onSubmit={handleSubmit(onSubmit, handleErrors)}>
            <div className="login_fields">
              <input
                type="email"
                placeholder="Email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Email is invalid",
                  },
                })}
              />

              <input
                type="password"
                placeholder="Password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />
            </div>

            <div className="login_options">
              <label className="remember_me">
                <input type="checkbox" /> Remember me
              </label>
              <a
                href="#"
                className="forgot_link"
                onClick={() => navigate("/forgotpassword")}
              >
                Forgot Password?
              </a>
            </div>

            <div className="login_btn">
              <button className="primary-btn" type="submit">
                Log In
              </button>
            </div>

            <p className="login_signup">
              Don't have an account?{" "}
              <span className="signup_link" onClick={() => navigate("/signup")}>
                Create an account
              </span>
            </p>
          </form>
        </div>

        {/* RIGHT SIDE FULL IMAGE */}
        <div className="login_right">
          <img
            src="https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=900&q=80"
            alt="Login"
          />
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}

export default Login;
