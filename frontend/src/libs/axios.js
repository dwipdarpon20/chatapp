import axios from 'axios';

export const axiosInstance = axios.create ({
    baseURL : import.meta.env.MODE === 'production' ? 'https://chatapp-backend-y94n.onrender.com' : 'http://localhost:3000/api',
    withCredentials: true,
    
})
