import axios from 'axios';

axios.defaults.withCredentials = true;

axios.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                await refreshAccessToken();
                return axios(originalRequest); // Retry the failed request
            } catch (refreshError) {
                // Redirect to login or show error
                console.error("Session expired");
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);


export const refreshAccessToken = async (): Promise<RenewedAccessTokenModel> => {
    try {
        const response = await axios.post<RenewedAccessTokenModel>(
            `${import.meta.env.VITE_API_URL}Auth/RefreshTokenViaCookies`,
            null,
            { withCredentials: true }
        );
        return response.data;
    } catch (error) {
        console.error("Failed to refresh token:", error);
        throw error;
    }
};

