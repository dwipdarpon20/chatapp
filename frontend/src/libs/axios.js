import axios from 'axios';

export const axiosInstance = axios.create ({
    baseURL : import.meta.env.MODE === 'production' ? 'https://chatapp-backend-y94n.onrender.com/api' : 'http://localhost:8080/api',
    withCredentials: true,
    
});
