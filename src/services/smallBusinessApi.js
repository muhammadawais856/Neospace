import api from './api';

export const smallBusinessApi = {
  // Get all small businesses
  getBusinesses: async (businessType = null) => {
    const query = businessType ? `?business_type=${encodeURIComponent(businessType)}` : '';
    return await api.get(`/Small_business/freelauncers${query}`);
  },

  // Get business profile with products
  getProfile: async (businessId) => {
    return await api.get(`/Small_business/visit_profile/${businessId}`);
  },

  // Get product detail
  getProductDetail: async (productId) => {
    return await api.get(`/Small_business/visit_profile/product/${productId}`);
  },

  // Offer small business service
  offerService: async (serviceData) => {
    return await api.post('/Small_business/offer_services', serviceData);
  },

  // Get small business item by ID
  getBusinessItem: async (productId) => {
    return await api.get(`/Small_business/Smallbusinessitem/${productId}`);
  },
};


