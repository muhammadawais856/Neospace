import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../Styles/Auth/forgot_password.css";

function ForgotPassword() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const { 
    register, 
    handleSubmit, 
    setValue, 
    watch 
  } = useForm({
    defaultValues: {
      otp: ["", "", "", "", "", ""]
    }
  });

  const otp = watch("otp");
  const password = watch("password");

  // Step 1: Send OTP
  const onSendOtp = (data) => {
    if (!data.email) return toast.error("Email is required");
    const emailPattern = /\S+@\S+\.\S+/;
    if (!emailPattern.test(data.email)) return toast.error("Email is invalid");

    setStep(2);
    toast.success("OTP sent to your email!");
  };

  // Step 2: Verify OTP
  const onVerifyOtp = (data) => {
    if (data.otp.some((digit) => digit === "")) {
      return toast.error("Please enter complete OTP");
    }
    setStep(3);
    toast.success("OTP verified!");
  };

  // Step 3: Reset Password
  const onResetPassword = (data) => {
    if (!data.password) return toast.error("Password is required");
    if (data.password.length < 6) return toast.error("Password must be at least 6 characters");
    if (!data.confirmPassword) return toast.error("Confirm Password is required");
    if (data.password !== data.confirmPassword) return toast.error("Passwords do not match");

    toast.success("Password reset successful!");
    navigate("/login");
  };

  const handleOtpChange = (e, index) => {
    const value = e.target.value;
    if (/^\d?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setValue("otp", newOtp); // update form value
      if (value && index < 5) {
        document.getElementById(`otp-${index + 1}`).focus();
      }
    }
  };

  return (
    <div className="forgot_password_main">
      <div className="forgot_password_box">

        <div className="forgot_password_left">

          {step === 1 && (
            <form onSubmit={handleSubmit(onSendOtp)}>
              <h2>Forgot Password</h2>
              <p className="forgot_password_subtitle">
                Enter your registered email to receive OTP.
              </p>
              <input
                type="email"
                placeholder="Email"
                {...register("email")}
              />
              <button className="primary-btn" type="submit">Send OTP</button>

              <p
                className="forgot_password_signup"
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/login")}
              >
                Back to Login
              </p>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleSubmit(onVerifyOtp)}>
              <h2>Enter OTP</h2>
              <p className="forgot_password_subtitle">
                Enter the 6-digit code sent to your email.
              </p>
              <div className="otp_container" style={{ display: "flex", gap: "10px" }}>
                {otp.map((num, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    maxLength="1"
                    {...register(`otp.${index}`)}
                    value={num}
                    onChange={(e) => handleOtpChange(e, index)}
                    className="otp_input"
                  />
                ))}
              </div>
              <button className="primary-btn" type="submit" style={{ marginTop: "20px" }}>
                Verify OTP
              </button>
            </form>
          )}

          {step === 3 && (
            <form onSubmit={handleSubmit(onResetPassword)}>
              <h2>Reset Password</h2>
              <p className="forgot_password_subtitle">
                Set a new password for your account.
              </p>
              <input
                type="password"
                placeholder="New Password"
                {...register("password")}
              />

              <input
                type="password"
                placeholder="Confirm Password"
                {...register("confirmPassword")}
              />

              <button className="primary-btn" type="submit">Reset Password</button>
            </form>
          )}

        </div>

        <div className="forgot_password_right">
          <img
            src="https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=900&q=80"
            alt="Forgot password"
          />
        </div>

      </div>

      <ToastContainer />
    </div>
  );
}

export default ForgotPassword;
