<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/useAuthStore'

const email = ref('')
const password = ref('')
const mode = ref<'demo' | 'api'>('demo')

const router = useRouter()
const authStore = useAuthStore()

const login = async () => {
  try {
    authStore.setMode(mode.value)
    await authStore.login(email.value, password.value)
    router.push('/home')
  } catch (err) {
    alert('Přihlášení selhalo')
  }
}
</script>

<template>
  <form @submit.prevent="login">
    <input v-model="email" type="email" placeholder="E-mail" required />
    <input v-model="password" type="password" placeholder="Heslo" required />
    
    <label>
      <input type="radio" value="demo" v-model="mode" />
      Demo režim
    </label>
    <label>
      <input type="radio" value="api" v-model="mode" />
      API režim
    </label>

    <button type="submit">Přihlásit se</button>
  </form>
</template>
