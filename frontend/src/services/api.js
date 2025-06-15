import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    console.log(`Requesting: ${config.baseURL}${config.url}`);
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'ECONNREFUSED' || error.code === 'ERR_NETWORK') {
      console.error('⚠️ Backend not running at http://localhost:5000');
    }
    return Promise.reject(error);
  }
);

export const fetchDashboardData = async (filters = {}) => {
  try {
    const params = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value && value !== '') {
        if (Array.isArray(value)) {
          value.forEach((v) => params.append(key, v));
        } else {
          params.append(key, value.toString());
        }
      }
    });

    const query = params.toString();
    const url = query ? `/data?${query}` : '/data';
    const response = await api.get(url);

    // ✅ Ensure you always return an array
    return Array.isArray(response.data) ? response.data : response.data.message;
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    throw error;
  }
};

export default api;
