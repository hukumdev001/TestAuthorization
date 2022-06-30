import axios from 'axios';

const GuestAPI = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const API = axios.create({
  baseURL: process.env.REACT_APP_ARTICLE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// request header
API.interceptors.request.use(
  async (config: any) => {
    const token = await localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

API.interceptors.response.use(
  (response) => {
    return response;
  },
  (err) =>
    new Promise(async (resolve, reject) => {
      if (
        err.response &&
        err.response.status === 401 &&
        err.config &&
        !err.config._retry
      ) {
      }
      reject(err);
    })
);

export { API, GuestAPI };
