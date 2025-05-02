// src/services/authService.ts

// Simulace přihlašovací služby (tato funkce vrací token)
export const loginService = async (email: string, password: string): Promise<string> => {
    // Tady bys měl provést volání na API a získat token
    // Pro účely tohoto příkladu simulujeme odpověď
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
  