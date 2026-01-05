import api from './api';

export const birthdaysApi = {
  // Get all birthday freelancers
  getFreelancers: async () => {
    return await api.get('/Birthdays/freelancers');
  },

  // Get birthday freelancer profile
  getProfile: async (freelancerId) => {
    return await api.get(`/Birthdays/visit_profile/${freelancerId}`);
  },

  // Offer birthday service
  offerService: async (serviceData) => {
    return await api.post('/Birthdays/offer_services', serviceData);
  },

  // Get offer service form data (user info)
  getOfferServiceFormData: async () => {
    return await api.get('/Birthdays/offer_services');
  },

  // Get birthday reviews
  getBirthdayReviews: async (freelancerId) => {
    return await api.get(`/Birthdays/birthdayreviews?freelancer_id=${freelancerId}`);
  },

  // Get my service
  getMyService: async () => {
    return await api.get('/Birthdays/my_service');
  },

  // Update my service
  updateMyService: async (serviceData) => {
    return await api.put('/Birthdays/my_service', serviceData);
  },

  // Delete my service
  deleteMyService: async () => {
    return await api.delete('/Birthdays/my_service');
  },
};


