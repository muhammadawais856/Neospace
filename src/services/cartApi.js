import api from './api';

export const cartApi = {
  // Create cart order
  createCart: async (cartData) => {
    return await api.post('/cart', cartData);
  },

  // Get user cart
  getUserCart: async (userId) => {
    return await api.get(`/cart/${userId}`);
  },

  // Delete cart item
  deleteCartItem: async (cartId, itemId) => {
    return await api.delete(`/cart/${cartId}/item/${itemId}`);
  },
};


