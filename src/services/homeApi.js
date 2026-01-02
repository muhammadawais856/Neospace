import api from './api';

export const homeApi = {
  // Get home page data with user info
  getHomeData: async () => {
    return await api.get('/home');
  },
};

