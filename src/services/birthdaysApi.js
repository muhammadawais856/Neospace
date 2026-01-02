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
};


