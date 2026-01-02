import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import '../../Styles/Common/SignupModal.css';

function SignupModal({ isOpen, onClose, providerName, redirectPath = null }) {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showSignup, setShowSignup] = useState(false);

  if (!isOpen) return null;

  const handleSignupClick = () => {
    // Store redirect path if provided
    if (redirectPath) {
      sessionStorage.setItem('signupRedirect', redirectPath);
    }
    navigate('/signup');
    onClose();
  };

  const handleLoginClick = () => {
    // Store redirect path if provided
    if (redirectPath) {
      sessionStorage.setItem('signupRedirect', redirectPath);
    }
    navigate('/login');
    onClose();
  };

  return (
    <div className="signup-modal-overlay" onClick={onClose}>
      <div className="signup-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="signup-modal-close" onClick={onClose}>×</button>
        <div className="signup-modal-body">
          <h2>Sign Up Required</h2>
          <p>
            {providerName 
              ? `Sign up to chat with ${providerName}`
              : 'Sign up to continue'}
          </p>
          <div className="signup-modal-buttons">
            <button className="primary-btn" onClick={handleSignupClick}>
              Sign Up
            </button>
            <button className="secondary-btn" onClick={handleLoginClick}>
              Log In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupModal;

