<script lang="ts">
import { defineComponent } from 'vue'
import { useLogin } from '@/composables/auth/useLogin'

export default defineComponent({
  setup() {
    const { email, password, mode, showPassword, isLoading, togglePasswordVisibility, login } = useLogin()

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
})
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
  <div>
    
  </div>

      <div v-if="isLoading" class="loading-overlay">
         <img class="ecm-login__loading-img" src="/src/components/img/logo_loading.png" alt="logo" />
         <div class="loader"></div> 
      </div>

</template>


<style scoped>
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--body-backgroundColor);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 1.5rem;
  z-index: 1000;
}

.loader {
  width: 280px;
  height: 150px;
  padding: 3px;
  border-radius: 20px;
  box-sizing: border-box;
  position: relative;
   mask: conic-gradient(#000 0 0) content-box exclude,conic-gradient(#000 0 0);
  filter: blur(12px);
}

.loader:before {
  content: "";
  position: absolute;
  inset: 0;
  background: repeating-conic-gradient(#0000 0 5%,#EB3443,#0000 20% 50%);
  animation: l3 1.5s linear infinite;
}
@keyframes l3 {
  to {rotate: 1turn}
}

.ecm-login__loading-img {
  width: 250px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>

