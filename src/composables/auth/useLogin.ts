import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth/useAuthStore'

export function useLogin() {

  const email = ref<string>('')
  const password = ref<string>('')
  const mode = ref<'demo' | 'api'>('demo')
  const showPassword = ref(false)
  const router = useRouter()
  const authStore = useAuthStore()
  const isLoading = ref(false) 

  const togglePasswordVisibility = () => {
    showPassword.value = !showPassword.value
  }

  const login = async (): Promise<void> => {
    try {
      isLoading.value = true
      authStore.setMode(mode.value)

      await authStore.login(email.value, password.value)

      isLoading.value = false
      router.push('/home')
    } catch (err: any) {
      isLoading.value = false
      alert('Přihlášení selhalo: ' + err.message)
    }
  }

  return {
    email,
    password,
    mode,
    showPassword,
    isLoading,
    togglePasswordVisibility,
    login
  }
}