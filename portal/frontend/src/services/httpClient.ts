import axios from 'axios';

const ACCESS_TOKEN_KEY = 'wellnest.accessToken';
const REFRESH_TOKEN_KEY = 'wellnest.refreshToken';

const httpClient = axios.create({
  baseURL: '/api',
  withCredentials: true
});

httpClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
      if (!refreshToken) {
        return Promise.reject(error);
      }
      try {
        const { data } = await axios.post(
          '/api/auth/refresh',
          {
            access_token: localStorage.getItem(ACCESS_TOKEN_KEY),
            refresh_token: refreshToken
          },
          { withCredentials: true }
        );
        localStorage.setItem(ACCESS_TOKEN_KEY, data.access_token);
        axios.defaults.headers.common.Authorization = `Bearer ${data.access_token}`;
        originalRequest.headers.Authorization = `Bearer ${data.access_token}`;
        return httpClient(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem(ACCESS_TOKEN_KEY);
        localStorage.removeItem(REFRESH_TOKEN_KEY);
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default httpClient;
