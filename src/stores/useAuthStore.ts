import { defineStore } from 'pinia'
import { loginService, logoutService, getToken } from '@/services/authService'
import { jwtDecode } from 'jwt-decode'

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
    mode: 'demo' as AuthMode
  }),

  actions: {
    setMode(mode: AuthMode) {
      this.mode = mode
    },

    async login(email: string, password: string) {
      if (!email || !password) {
        throw new Error('E-mail a heslo jsou povinné')
      }

      if (this.mode === 'api') {
        try {
          const token = await loginService(email, password)
          localStorage.setItem('authToken', token)
          this.loadUserFromToken()
        } catch (err) {
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
        } else {
          throw new Error('Neplatné demo přihlašovací údaje')
        }
      }
    },

    logout() {
      logoutService()
      this.isAuthenticated = false
      this.user = null
      localStorage.removeItem('authToken')
    },

    loadUserFromToken() {
      const token = getToken()
      if (!token) return

      try {
        const decoded = jwtDecode<UserPayload>(token)
        this.user = decoded
        this.isAuthenticated = true
      } catch (err) {
        console.warn('Neplatný token:', err)
        this.logout()
      }
    }
  }
})
