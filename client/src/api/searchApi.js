import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  timeout: 60000,
  headers: { 'Content-Type': 'application/json' },
});

export async function searchPrices(query) {
  try {
    const response = await api.get('/search', {
      params: { q: query },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      const msg = error.response.data?.error || 'Server error. Please try again.';
      throw new Error(msg);
    } else if (error.code === 'ECONNABORTED') {
      throw new Error('The search took too long. The retailers may be slow — please try again.');
    } else if (error.message === 'Network Error') {
      throw new Error('Cannot connect to the server. Make sure the backend is running on port 5000.');
    }
    throw new Error(error.message || 'Unknown error occurred.');
  }
}
