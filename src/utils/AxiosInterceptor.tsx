import axios from "axios";

export const baseUrl = process.env.REACT_APP_API_URL;

export const axiosInstance = axios.create({
    baseURL: baseUrl,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});