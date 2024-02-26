import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://medflow.onrender.com',
  // other config options if needed
});

export default axiosInstance;
