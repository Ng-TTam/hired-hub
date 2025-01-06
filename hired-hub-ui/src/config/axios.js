import axios from 'axios';

export const baseURL = 'http://localhost:8888/api/v1/';

const instance = axios.create({
    baseURL: baseURL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

let isRefreshing = false;
let failedQueue = [];

instance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem('token');
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error),
);

instance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                })
                    .then((token) => {
                        originalRequest.headers.Authorization = `Bearer ${token}`;
                        return instance(originalRequest);
                    })
                    .catch((err) => {
                        localStorage.clear();
                        sessionStorage.clear();
                        window.location.replace('/login');
                        return Promise.reject(err);
                    });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            const refreshToken = localStorage.getItem('refresh-token');
            if (refreshToken) {
                try {
                    const response = await axios.post(`${baseURL}auth/refresh-token`, {
                        refreshToken,
                    });
                    const newAccessToken = response.data.data.token;

                    localStorage.setItem('token', newAccessToken);
                    processQueue(null, newAccessToken);

                    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                    return instance(originalRequest);
                } catch (refreshError) {
                    processQueue(refreshError, null);
                    localStorage.clear();
                    sessionStorage.clear();
                    window.location.replace('/login');
                    return Promise.reject(refreshError);
                } finally {
                    isRefreshing = false;
                }
            } else {
                localStorage.clear();
                sessionStorage.clear();
                window.location.replace('/login');
            }
        }
        if (error.response && error.response.status !== 401) {
            localStorage.clear();
            sessionStorage.clear();
            window.location.replace('/login');
        }

        return Promise.reject(error);
    },
);

const processQueue = (error, token = null) => {
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });
    failedQueue = [];
};

export default instance;
