import api from './api';

export const carpoolApi = {
  // Get all carpool freelancers
  getFreelancers: async () => {
    return await api.get('/Carpool/freelauncers');
  },

  // Get carpool freelancer profile
  getProfile: async (freelancerId) => {
    return await api.get(`/Carpool/visit_profile/${freelancerId}`);
  },

  // Offer carpool service
  offerService: async (serviceData) => {
    return await api.post('/Carpool/offer_services', serviceData);
  },

  // Get offer service form data (user info)
  getOfferServiceFormData: async () => {
    return await api.get('/Carpool/offer_services');
  },

  // Get my service
  getMyService: async () => {
    return await api.get('/Carpool/my_service');
  },

  // Update my service
  updateMyService: async (serviceData) => {
    return await api.put('/Carpool/my_service', serviceData);
  },

  // Delete my service
  deleteMyService: async () => {
    return await api.delete('/Carpool/my_service');
  },
};


