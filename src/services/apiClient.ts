import axios, { InternalAxiosRequestConfig } from 'axios';
import { STUDENT } from '../constants/student';

export const apiClient = axios.create({
    baseURL: 'https://651c36b33513a2260b45070f.mockapi.io/api/v1',
    timeout: 10000,
});

apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    config.headers['X-Student-Id'] = STUDENT.mssv; // Interceptor gắn MSSV
    return config;
});
