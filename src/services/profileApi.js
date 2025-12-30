import api from './api';

export const profileApi = {
  // Get user profile
  getProfile: async () => {
    return await api.get('/profile');
  },

  // Create user profile
  createProfile: async (profileData) => {
    return await api.post('/profile', profileData);
  },

  // Update user profile
  updateProfile: async (profileData) => {
    return await api.put('/profile', profileData);
  },
};


