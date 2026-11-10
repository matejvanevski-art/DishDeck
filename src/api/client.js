const API_BASE_URL =
  import.meta.env.VITE_MEALDB_BASE_URL ||
  'https://www.themealdb.com/api/json/v1/1';

export class ApiError extends Error {
  constructor(message, status = null) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

export async function apiRequest(endpoint, { signal } = {}) {
  let response;

  try {
    response = await fetch(`${API_BASE_URL}/${endpoint}`, { signal });
  } catch (error) {
    if (error.name === 'AbortError') {
      throw error;
    }

    throw new ApiError(
      'Unable to connect to the recipe service. Check your internet connection and try again.'
    );
  }

  if (!response.ok) {
    throw new ApiError(
      `The recipe service returned an error (${response.status}). Please try again.`,
      response.status
    );
  }

  return response.json();
}
