import api from './api';

export const reviewsApi = {
  // Get reviews for a provider
  getReviews: async (providerId, providerType) => {
    return await api.get(`/reviews/${providerId}?provider_type=${providerType}`);
  },

  // Submit a review
  submitReview: async (reviewData) => {
    return await api.post('/reviews', reviewData);
  },
};


