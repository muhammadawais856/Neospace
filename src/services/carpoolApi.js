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
};


