import axios from 'axios';

const api = axios.create({
    baseURL: 'https://backend-saf-api.azurewebsites.net/api' 
});

export default api;