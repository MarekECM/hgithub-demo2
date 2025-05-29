// import {defineStore} from 'pinia'
// import {loginService, logoutService} from '@/services/auth/authService'
// import {jwtDecode} from 'jwt-decode'
// import axios from 'axios'
// import router from '../../router'

// interface UserPayload {
//     email: string
//     role?: string
//     exp?: number

//     [key: string]: any
// }

// type AuthMode = 'demo' | 'api'

// export const useAuthStore = defineStore('auth', {
//     state: () => ({
//         isAuthenticated: false,
//         user: null as UserPayload | null,
//         mode: 'demo' as AuthMode,
//         isLoggingOut: false
//     }),

//     actions: {
//         setMode(mode: AuthMode) {
//             this.mode = mode
//         },

//         async login(email: string, password: string) {
//             if (!email || !password) {
//                 throw new Error('E-mail a heslo jsou povinné')
//             }

//             if (this.mode === 'api') {
//                 try {
//                     await loginService(email, password)
//                     this.loadUserFromToken()
//                 } catch (err) {
//                     console.log(err);
//                     throw new Error('Přihlášení přes API selhalo')
//                 }
//             } else {
//                 // Demo přihlášení (lokálně bez API)
//                 const demoEmail = 'demo@example.com'
//                 const demoPassword = 'demo'

//                 if (email === demoEmail && password === demoPassword) {
//                     localStorage.setItem('authToken', 'demo-token')
//                     this.user = {email: demoEmail}
//                     this.isAuthenticated = true
//                 } else {
//                     throw new Error('Neplatné demo přihlašovací údaje')
//                 }
//             }
//         },

//         logout() {
//             this.isLoggingOut = true;
//             logoutService()
//             this.isAuthenticated = false
//             this.user = null
//             router.push("/login");
//         },

//         async loadUserFromToken() {
//             if (this.isLoggingOut) {
//                 this.isLoggingOut = false;
//                 return;
//             }
//             try {
//                 const response = await axios.get(`${import.meta.env.VITE_API_URL}Auth/Me`, {
//                     withCredentials: true
//                 })
//                 if (response.data == "") {
//                     return;
//                 }
//                 this.user = response.data
//                 this.isAuthenticated = true
//             } catch (err) {
//                 console.warn('Nelze načíst uživatele z cookie:', err)
//                 this.logout()
//             }
//         }


//     }
// })


import { defineStore } from 'pinia'
import { loginService, logoutService } from '@/services/auth/authService'
import axios from 'axios'
import router from '../../router'

interface UserPayload {
    email: string
    role?: string
    exp?: number

    [key: string]: any
}

type AuthMode = 'demo' | 'api'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        isAuthenticated: false,
        user: null as UserPayload | null,
        mode: 'demo' as AuthMode,
        isLoggingOut: false,
        token: null as string | null,    // <-- tady přidáno
    }),

    actions: {
        setMode(mode: AuthMode) {
            this.mode = mode
        },

        setToken(token: string | null) {   // <-- nová akce na nastavení tokenu
            this.token = token
        },

        async login(email: string, password: string) {
            if (!email || !password) {
                throw new Error('E-mail a heslo jsou povinné')
            }

            if (this.mode === 'api') {
                try {
                    await loginService(email, password)
                    await this.loadUserFromToken()
                } catch (err) {
                    console.log(err);
                    throw new Error('Přihlášení přes API selhalo')
                }
            } else {
                // Demo přihlášení (lokálně bez API)
                const demoEmail = 'demo@example.com'
                const demoPassword = 'demo'

                if (email === demoEmail && password === demoPassword) {
                    localStorage.setItem('authToken', 'demo-token')
                    this.user = { email: demoEmail }
                    this.isAuthenticated = true
                    this.setToken('demo-token')  // uložení tokenu i zde
                } else {
                    throw new Error('Neplatné demo přihlašovací údaje')
                }
            }
        },

        logout() {
            this.isLoggingOut = true;
            logoutService()
            this.isAuthenticated = false
            this.user = null
            this.setToken(null)  // reset tokenu při logoutu
            router.push("/login");
        },

        async loadUserFromToken() {
            if (this.isLoggingOut) {
                this.isLoggingOut = false;
                return;
            }
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}Auth/Me`, {
                    withCredentials: true
                })
                if (response.data == "") {
                    return;
                }
                this.user = response.data
                this.isAuthenticated = true
                // Pokud bys chtěl token z response uložit, můžeš to udělat tady
                // např. this.setToken(response.data.token)
            } catch (err) {
                console.warn('Nelze načíst uživatele z cookie:', err)
                this.logout()
            }
        }
    }
})

