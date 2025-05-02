// // src/stores/useAuthStore.ts
// import { defineStore } from 'pinia'
// // Předpoklad: login z API je v @/services/authService
// import { login as apiLogin, logout as apiLogout, getToken } from '@/services/authService'
// import { jwtDecode } from 'jwt-decode'

// interface User {
//   email: string
//   role?: string
// }

// export const useAuthStore = defineStore('auth', {
//   state: () => ({
//     isAuthenticated: false,
//     user: null as User | null,
//     mode: 'api' as 'demo' | 'api' // Přepínání mezi módy
//   }),

//   actions: {
//     async login(email: string, password: string) {
//       if (this.mode === 'demo') {
//         if (email === 'demo@example.com' && password === 'demo') {
//           this.user = { email }
//           this.isAuthenticated = true
//           localStorage.setItem('demoUser', JSON.stringify(this.user))
//         } else {
//           throw new Error('Demo přihlášení selhalo')
//         }
//       } else {
//         const token = await apiLogin(email, password)
//         const decoded = jwtDecode<User & { exp?: number }>(token)
//         this.user = { email: decoded.email, role: decoded.role }
//         this.isAuthenticated = true
//         localStorage.setItem('token', token)
//       }
//     },

//     logout() {
//       if (this.mode === 'demo') {
//         localStorage.removeItem('demoUser')
//       } else {
//         apiLogout()
//         localStorage.removeItem('token')
//       }
//       this.isAuthenticated = false
//       this.user = null
//     },

//     loadUser() {
//       if (this.mode === 'demo') {
//         const demoUser = localStorage.getItem('demoUser')
//         if (demoUser) {
//           this.user = JSON.parse(demoUser)
//           this.isAuthenticated = true
//         }
//       } else {
//         const token = getToken()
//         if (token) {
//           try {
//             const decoded = jwtDecode<User>(token)
//             this.user = { email: decoded.email, role: decoded.role }
//             this.isAuthenticated = true
//           } catch {
//             this.logout()
//           }
//         }
//       }
//     },

//     setMode(mode: 'demo' | 'api') {
//       this.mode = mode
//     }
//   }
// })




// src/stores/useAuthStore.ts
// import { defineStore } from 'pinia';
// import { loginService, logoutService, getToken } from '@/services/authService';
// import { jwtDecode } from 'jwt-decode';

// interface UserPayload {
//   email: string;
//   role?: string;
//   exp?: number;
//   [key: string]: any;
// }

// export const useAuthStore = defineStore('auth', {
//   state: () => ({
//     isAuthenticated: false,
//     user: null as UserPayload | null,
//   }),

//   actions: {
//     async login(email: string, password: string) {
//       try {
//         const token = await loginService(email, password); // Zavoláme login service
//         localStorage.setItem('authToken', token); // Uložíme token do localStorage
//         this.loadUserFromToken(); // Načteme data uživatele z tokenu
//       } catch (error) {
//         console.error('Login failed:', error);
//       }
//     },

//     logout() {
//       logoutService(); // Zavoláme logout service
//       this.isAuthenticated = false;
//       this.user = null;
//     },

//     loadUserFromToken() {
//       const token = getToken();
//       if (token) {
//         try {
//           const decoded = jwtDecode<UserPayload>(token);
//           this.user = decoded;
//           this.isAuthenticated = true;
//         } catch (err) {
//           this.logout(); // Pokud je problém s dekódováním tokenu, odhlásíme uživatele
//         }
//       } else {
//         this.isAuthenticated = false;
//       }
//     },
//   },
// });


// src/stores/useAuthStore.ts

import { defineStore } from 'pinia'
import { loginService, logoutService, getToken } from '@/services/authService'
import { jwtDecode } from 'jwt-decode';


interface UserPayload {
  email: string
  role?: string
  exp?: number
  [key: string]: any
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false,
    user: null as UserPayload | null,
    mode: 'demo' as 'demo' | 'api' // Režim přihlášení
  }),

  actions: {
    setMode(mode: 'demo' | 'api') {
      this.mode = mode
    },

    async login(email: string, password: string) {
      if (this.mode === 'api') {
        // Reálné přihlášení přes API
        try {
          const token = await loginService(email, password)
          localStorage.setItem('authToken', token)
          this.loadUserFromToken()
        } catch (err) {
          throw new Error('Přihlášení selhalo')
        }
      } else {
        // Demo režim – jednoduchá validace
        const demoEmail = 'admin@example.com'
        const demoPassword = 'password'

        if (email === demoEmail && password === demoPassword) {
          // Pokud je přihlášení úspěšné v demo režimu, nastavíme token
          localStorage.setItem('authToken', 'simulovany-token-jwt')
          this.loadUserFromToken()
        } else {
          throw new Error('Neplatné přihlašovací údaje')
        }
      }
    },

    logout() {
      logoutService()
      this.isAuthenticated = false
      this.user = null
    },

    loadUserFromToken() {
      const token = getToken()
      if (!token) return
      try {
        const decoded = jwtDecode<UserPayload>(token)
        this.user = decoded
        this.isAuthenticated = true
      } catch (err) {
        this.logout()
      }
    }
  }
})
