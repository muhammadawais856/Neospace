import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../Styles/Auth/signup.css";

function SignUp() {
  const navigate = useNavigate();
  const [step, setStep] = useState("signup"); // "signup" or "otp"
  const [otpValues, setOtpValues] = useState(["", "", "", "", "", ""]);
  const inputsRef = useRef([]);

  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { errors },
  } = useForm();

  const password = watch("password", "");

  const showError = (message) => {
    toast.error(message, { position: "top-right" });
  };

  // Handle signup form submission
  const onSubmit = (data) => {
    console.log("SignUp data:", data);
    toast.success("Account created successfully! Enter OTP sent to your email.");
    setStep("otp");
  };

  // Handle validation for signup form
  const handleErrors = () => {
    const values = getValues();
    const allEmpty =
      !values.fullName ||
      !values.email ||
      !values.contact ||
      !values.password ||
      !values.confirmPassword ||
      !values.terms;

    if (allEmpty) {
      showError("All fields are required");
    } else {
      Object.values(errors).forEach((err) => showError(err.message));
    }
  };

  // Handle OTP input change
  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return; // only allow digits
    const newOtp = [...otpValues];
    newOtp[index] = value;
    setOtpValues(newOtp);

    // move focus to next input
    if (value && index < 5) {
      inputsRef.current[index + 1].focus();
    }
  };

  // Handle OTP backspace navigation
  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otpValues[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  // Handle OTP submission
  const handleOtpSubmit = (e) => {
    e.preventDefault();
    if (otpValues.some((val) => val === "")) {
      showError("Please enter all 6 digits of OTP");
      return;
    }

    const enteredOtp = otpValues.join("");
    if (enteredOtp === "123456") { // replace with real OTP logic
      toast.success("OTP verified successfully!");
      navigate("/login");
    } else {
      showError("Invalid OTP, please try again");
    }
  };

  return (
    <div className="signup_main">
      <div className="signup_box">
        {step === "signup" && (
          <div className="signup_left">
            <h2>Create your Account</h2>
            <p className="signup_subtitle">Welcome! Please fill in your details to sign up.</p>

            <form onSubmit={handleSubmit(onSubmit, handleErrors)}>
              <div className="signup_fields">
                <input
                  type="text"
                  placeholder="Full Name"
                  {...register("fullName", {
                    required: "Full Name is required",
                    minLength: { value: 3, message: "Name must be at least 3 characters" },
                  })}
                />

                <input
                  type="email"
                  placeholder="Email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: { value: /\S+@\S+\.\S+/, message: "Email is invalid" },
                  })}
                />

                <input
                  type="number"
                  placeholder="Contact"
                  {...register("contact", {
                    required: "Contact is required",
                    pattern: { value: /^[0-9]{10,15}$/, message: "Contact is invalid" },
                  })}
                />

                <input
                  type="password"
                  placeholder="Password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: { value: 6, message: "Password must be at least 6 characters" },
                  })}
                />

                <input
                  type="password"
                  placeholder="Confirm Password"
                  {...register("confirmPassword", {
                    required: "Confirm Password is required",
                    validate: (value) => value === password || "Passwords do not match",
                  })}
                />
              </div>

              <div className="signup_options">
                <label className="agree_terms">
                  <input
                    type="checkbox"
                    {...register("terms", {
                      required: "You must agree to the Terms & Conditions",
                    })}
                  />{" "}
                  I agree to the Terms & Conditions
                </label>
              </div>

              <button className="primary-btn" type="submit">Sign Up</button>

              <p className="signup_login">
                Already have an account?{" "}
                <span className="login_link" onClick={() => navigate("/login")}>Log in</span>
              </p>
            </form>
          </div>
        )}

        {step === "otp" && (
          <div className="signup_left">
            <h2>Verify OTP</h2>
            <p className="signup_subtitle">Enter the 6-digit OTP sent to your email.</p>

            <form onSubmit={handleOtpSubmit}>
              <div className="otp_container" style={{ display: "flex", gap: "10px" }}>
                {otpValues.map((val, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength="1"
                    value={val}
                    ref={(el) => (inputsRef.current[index] = el)}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(index, e)}
                    className="otp_input"
                  />
                ))}
              </div>

              <button className="primary-btn" type="submit" style={{ marginTop: "20px" }}>
                Verify OTP
              </button>

              <p className="signup_login">
                Didn't receive OTP?{" "}
                <span className="login_link">
                  Resend OTP
                </span>
              </p>

              <p className="signup_login">
                Already have an account?{" "}
                <span className="login_link" onClick={() => navigate("/login")}>Log in</span>
              </p>
            </form>
          </div>
        )}

        <div className="signup_right">
          <img
            src="https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=900&q=80"
            alt="Sign Up"
          />
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}

export default SignUp;
