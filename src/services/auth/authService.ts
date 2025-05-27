// src/services/authService.ts
import axios from 'axios';
// Simulace přihlašovací služby (tato funkce vrací token)
export const loginService = async (email: string, password: string): Promise<void> => {
    await axios.post(`${import.meta.env.VITE_API_URL}Auth/LoginViaCookies`, {
        username: email,
        password: password,
        applicationId: '3d7cde1d-5deb-4107-a8a4-8e438a08c9df'
    })
        .catch(error => {
            console.error("Login failed:", error.response?.data || error.message);
        });
}

// Funkce pro odhlášení
export const logoutService = async (): Promise<void> => {
    await axios.post(`${import.meta.env.VITE_API_URL}Auth/Logout`, null, {
        withCredentials: true
    });
};

