import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5001',
  // other config options if needed
});

export default axiosInstance;
