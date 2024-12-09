import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

export const upload = axios.create({
    baseURL: 'http://localhost:3000/upload',
    headers: {
        'Content-Type': 'multipart/form-data' // Necessary for file uploads
    }
});

export const download = axios.create({
    baseURL: 'http://localhost:3000/download'
});

export default api;
