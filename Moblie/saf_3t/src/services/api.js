import axios from 'axios';

const api = axios.create({
    baseURL: 'http://(IpSeuNote):5000/api' 
});

export default api;