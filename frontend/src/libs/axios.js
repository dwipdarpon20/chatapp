import axios from 'axios';

export const axiosInstance = axios.create ({
    baseURL : import.meta.env.MODE === 'production' ? 'https://yourdomain.com/api' : 'http://localhost:3000/api',
    withCredentials: true,
    
})