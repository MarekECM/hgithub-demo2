<!-- <script setup>
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
    <div class="ecm-login">
      <div class="ecm-login__container">
        <div class="ecm-login__header">
          <img class="ecm-login__header-img" src="/src/components/img/logo_ecm.webp" alt="logo" />
        </div>
        <div class="ecm-login__main">
          <p>Přihlaste se do svého účtu</p>
          <form class="ecm-login__form" @submit.prevent="login">
            <input type="email" v-model="email" placeholder="E-mail" required />
            <input type="password" v-model="password" placeholder="Heslo" required />
            <button type="submit">Přihlásit se</button>
          </form>
        </div>
        <div class="ecm-login__footer">
          <p>Zapomněli jste heslo?</p>
          <p>Znovu odeslat autorzační email</p>
        </div>
      </div>
    </div>
  </template> -->
  
<!-- <script setup>
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
</template> -->


<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/useAuthStore'

const email = ref<string>('') // Typujeme jako string
const password = ref<string>('') // Typujeme jako string
const mode = ref<'demo' | 'api'>('demo') // Režim přihlášení, může být 'demo' nebo 'api'

const router = useRouter()
const authStore = useAuthStore()

// Typujeme chybu jako Error
const login = async (): Promise<void> => {
  try {
    // Nastavíme režim přihlášení podle volby
    authStore.setMode(mode.value)
    
    // Pokusíme se přihlásit
    await authStore.login(email.value, password.value)
    
    // Po úspěšném přihlášení přesměrujeme na domovskou stránku
    router.push('/home')
  } catch (err: any) {
    // Pokud nastane chyba, zobrazíme hlášku s chybou
    alert('Přihlášení selhalo: ' + err.message)
  }
}

const showPassword = ref(false)

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}
</script>

<template>
  <div class="ecm-login">
    <div class="ecm-login__container">
      <div class="ecm-login__header">
        <img class="ecm-login__header-img" src="/src/components/img/logo_ecm.png" alt="logo" />
      </div>
      <div class="ecm-login__main">
        <p>Přihlaste se do svého účtu</p>
        <form class="ecm-login__form" @submit.prevent="login">
          <input type="email" name="email" v-model="email" placeholder="E-mail" autocomplete="username" required  />
          <span class="ecm-login__password-input">
            <input :type="showPassword ? 'text' : 'password'" name="password" v-model="password" placeholder="Heslo" autocomplete="current-password" required/>
          <button type="button" @click="togglePasswordVisibility">
            <span  v-if="showPassword" class="material-icons" style="font-size: 26px;">visibility_off</span>
            <span  v-else class="material-icons" style="font-size: 26px;">visibility</span>
          </button>

          </span>

          
       
          <div>
            <label>
              <input type="radio" v-model="mode" value="demo" /> Demo
            </label>
            <label>
              <input type="radio" v-model="mode" value="api" /> API
            </label>
          </div>

          <button class="ecm-login__submit-button" type="submit">Přihlásit se</button>
        </form>
      </div>
      <div class="ecm-login__footer">
        <p>Zapomněli jste heslo?</p>
        <p>Znovu odeslat autorzační email</p>
      </div>
    </div>
  </div>
</template>

