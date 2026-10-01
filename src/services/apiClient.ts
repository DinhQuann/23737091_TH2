import axios, { InternalAxiosRequestConfig } from 'axios';
import { STUDENT } from '../constants/student';

export const apiClient = axios.create({
    baseURL: 'https://fakestoreapi.com',
    timeout: 10000,
});

apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    config.headers['X-Student-Id'] = STUDENT.mssv; // Interceptor gắn MSSV
    return config;
});
