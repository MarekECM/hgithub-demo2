// import axios from 'axios';
// import { useAuthStore } from '@/stores/auth/useAuthStore';
// import type { RenewedAccessTokenModel } from '@/interfaces/global/RenewedAccessTokenModel';

// axios.defaults.withCredentials = true;

// axios.interceptors.response.use(
//     response => response,
//     async error => {
//         const originalRequest = error.config;
//         if (error.response?.status === 401 && !originalRequest._retry) {
//             originalRequest._retry = true;

//             try {
//                 await refreshAccessToken();
//                 return axios(originalRequest); // Retry the failed request
//             } catch (refreshError) {
//                 const authStore = useAuthStore();
//                 console.error("Session expired");
//                 authStore.logout();
//                 return Promise.reject(refreshError);
//             }
//         }

//         return Promise.reject(error);
//     }
// );


// export const refreshAccessToken = async (): Promise<RenewedAccessTokenModel> => {
//     try {
//         const response = await axios.post<RenewedAccessTokenModel>(
//             `${import.meta.env.VITE_API_URL}Auth/RefreshTokenViaCookies`,
//             null,
//             { withCredentials: true }
//         );
//         return response.data;
//     } catch (error) {
//         console.error("Failed to refresh token:", error);
//         throw error;
//     }
// };

import axios from 'axios'
import { useAuthStore } from '@/stores/auth/useAuthStore'
import type { RenewedAccessTokenModel } from '@/interfaces/global/RenewedAccessTokenModel'

axios.defaults.withCredentials = true

// Request interceptor: přidá token do Authorization hlavičky
axios.interceptors.request.use(config => {
  const authStore = useAuthStore()
  const token = authStore.token

  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
}, error => {
  return Promise.reject(error)
})

// Response interceptor: při 401 zkusí refresh token, pak retry původní request
axios.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config
    const authStore = useAuthStore()

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        // Refreshni access token
        const refreshed = await refreshAccessToken()
        // Ulož nový token do store
        authStore.token = refreshed.accessToken

        // Opakuj původní request s novým tokenem
        originalRequest.headers.Authorization = `Bearer ${refreshed.accessToken}`
        return axios(originalRequest)
      } catch (refreshError) {
        console.error('Session expired, logging out')
        authStore.logout()
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  }
)

// Funkce na refresh access tokenu pomocí cookies
export const refreshAccessToken = async (): Promise<RenewedAccessTokenModel> => {
  try {
    const response = await axios.post<RenewedAccessTokenModel>(
      `${import.meta.env.VITE_API_URL}Auth/RefreshTokenViaCookies`,
      null,
      { withCredentials: true }
    )
    return response.data
  } catch (error) {
    console.error('Failed to refresh token:', error)
    throw error
  }
}
