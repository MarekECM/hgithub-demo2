// src/services/authService.ts
import axios from 'axios';
// Simulace přihlašovací služby (tato funkce vrací token)
export const loginService = async (email: string, password: string): Promise<string> => {
    return axios.post(`${import.meta.env.VITE_API_URL}Auth/Login`, {
      username: email,
      password: password,
      applicationId: '3d7cde1d-5deb-4107-a8a4-8e438a08c9df'
    })
    .then(response => {
      return response.data.accessToken;
      // Optional: Save token to localStorage or Vuex
    })
    .catch(error => {
      console.error("Login failed:", error.response?.data || error.message);
    });

    if (email === 'admin@example.com' && password === 'password') {
      return 'simulovany-token-jwt' // Vracíme simulovaný JWT token
    } else {
      throw new Error('Invalid credentials')
    }
  }

  // Funkce pro odhlášení
  export const logoutService = () => {
    // Tato funkce jen smaže token z localStorage
    localStorage.removeItem('authToken')
  }
  
  // Funkce pro získání tokenu z localStorage
  export const getToken = (): string | null => {
    return localStorage.getItem('authToken')
  }
  