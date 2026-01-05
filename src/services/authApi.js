import api from './api';
import API_BASE_URL from '../config/api';

export const authApi = {
  // Signup - initiate signup process and get OTP
  signup: async (signupData) => {
    return await api.post('/api/auth/signup', {
      email: signupData.email,
      username: signupData.username || signupData.email.split('@')[0],
      password: signupData.password,
      full_name: signupData.fullName,
      contact: signupData.contact || "",
      address: signupData.address || ""
    });
  },

  // Verify OTP and complete signup
  verifyOtp: async (email, otp) => {
    return await api.post('/api/auth/verify-otp', {
      email: email,
      otp: otp
    });
  },

  // Login
  login: async (username, password) => {
    // Using FormData for OAuth2PasswordRequestForm
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ detail: 'Login failed' }));
      throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  },

  // Get current user info
  getCurrentUser: async (token) => {
    const response = await fetch(`${API_BASE_URL}/api/auth/me`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ detail: 'Failed to get user info' }));
      throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  },
};

