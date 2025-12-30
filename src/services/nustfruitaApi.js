import api from './api';

export const nustfruitaApi = {
  // Get all NustFruita products
  getProducts: async () => {
    return await api.get('/nustfruita');
  },
};


