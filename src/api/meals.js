import { apiRequest } from './client';

export const mealApi = {
  search(query, options = {}) {
    const endpoint = `search.php?s=${encodeURIComponent(query)}`;
    return apiRequest(endpoint, options);
  },

  getById(id, options = {}) {
    const endpoint = `lookup.php?i=${encodeURIComponent(id)}`;
    return apiRequest(endpoint, options);
  },

  getCategories(options = {}) {
    return apiRequest('categories.php', options);
  },

  filterByCategory(category, options = {}) {
    const endpoint = `filter.php?c=${encodeURIComponent(category)}`;
    return apiRequest(endpoint, options);
  },

  getRandom(options = {}) {
    return apiRequest('random.php', options);
  },
};
