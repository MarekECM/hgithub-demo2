<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useSidebarStore } from '@/stores/ui/resize';
import { useWindowResize } from '@/composables/global/gl_resizeWindow';
import { useUiStore } from '@/stores/ui/uiStore';
import { useAuthStore } from '@/stores/auth/useAuthStore';
import { useAlarmStore } from '@/stores/ecm-marfy/alarms/useAlarmStore';

// Připojení ke store
const uiStore = useUiStore();
const sidebarStore = useSidebarStore();
const authStore = useAuthStore();
const alarmStore = useAlarmStore();

// Navigační položky
const navbar = ref([
  { to: { name: 'homeView' }, text: 'Můj Marfy' },
  { to: { name: 'data' }, text: 'Data' },
  { to: { name: 'summaries' }, text: 'Souhrny' },
  { to: { name: 'daily-plans' }, text: 'Denní plány' },
  { to: { name: 'alarms' }, text: 'Alarmy' },
  { to: { name: 'komunity-home' }, text: 'Komunity' },
  { to: { name: 'reports' }, text: 'Výkazy' },
  { to: { name: 'statistics' }, text: 'Statistiky' },
  { to: { name: 'scada' }, text: 'Vizualizace' },
  { to: { name: 'publicity' }, text: 'publicita' },
]);

const { dynamicStyles } = useWindowResize();
const isWide = computed(() => sidebarStore.isWide);
const alarms = computed(() => alarmStore.alarms); // Použij alarmy ze store

//const toggleAside = () => uiStore.toggleAside();
const toggleNavBar = () => uiStore.toggleNavBar();
const toggleSidebar = () => uiStore.toggleSidebar();
const toggleNotification = () => uiStore.toggleNotification();
const logout = () => authStore.logout();

const navBarRef = ref<HTMLElement | null>(null);
const notificationBarRef = ref<HTMLElement | null>(null);

function handleClickOutside(event: MouseEvent) {
  if (navBarRef.value && !navBarRef.value.contains(event.target as Node)) {
    uiStore.closeNavBar();
  }
  if (notificationBarRef.value && !notificationBarRef.value.contains(event.target as Node)) {
    uiStore.closeNotification();
  }
}

onMounted(() => {
  document.addEventListener('mousedown', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('mousedown', handleClickOutside);
});
</script>
<template>
  <div class="ecm-navbar" :style="dynamicStyles">
    <div class="ecm-navbar__nav-wrapper">
      <div class="ecm-navbar__container" v-if="!isWide">
        <div class="ecm-navbar__logo">
          <div class="ecm-navbar__logo-hero">
            <RouterLink :to="{ name: 'homeView' }">
              <img src="/src/components/img/logo_ecm.webp" alt="Logo" width="180px" height="auto" />
            </RouterLink>
          </div>
          <div class="ecm-navbar__logo-responsive">
            <RouterLink :to="{ name: 'homeView' }"
              ><img src="/src/components/img/icon-logo.webp" alt="Logo" width="72px" height="auto"
            /></RouterLink>
          </div>
        </div>
        <nav class="ecm-navbar__main-nav">
          <ul ref="navList" class="ecm-navbar__main-nav-list">
            <li v-for="(link, index) in navbar" :key="index" class="ecm-navbar__main-nav-item">
              <RouterLink
                :to="link.to"
                active-class="ecm-navbar__active-link"
                class="ecm-navbar__main-nav-link"
                >{{ link.text }}</RouterLink
              >
              <span
                :class="[
                  index >= navbar.length - 2
                    ? 'ecm-navbar__link-line--alt'
                    : 'ecm-navbar__link-line',
                  link.to?.name && $route.name === link.to.name ? 'ecm-navbar__active-line' : ''
                ]"
              ></span>
            </li>
          </ul>
        </nav>
      </div>
      <div class="ecm-navbar__icons">
        <nav class="ecm-navbar__secondary-nav">
          <ul class="ecm-navbar__secondary-nav-list">
            <!-- Notification item -->
            <li class="ecm-navbar__icon-item ecm-navbar__icon-item--notification" ref="notificationBarRef"  @click="toggleNotification">
                    <span class="ecm-navbar__icon-item--notification-number" v-if="alarms.length > 0">
                    {{ alarms.length }}
                    </span>
              <span class="material-icons">notifications</span>
                <ul v-if="uiStore.isNotificationBar && alarms.length > 0" class="ecm-navbar__dropdown-2">
                  <li v-for="(alarm, index) in alarms" :key="index" class="ecm-navbar__dropdown-item">
                    <router-link
                      :to="{ name: 'alarms' }"
                      class="ecm-navbar__dropdown-link"
                      @click="uiStore.isAsideVisible = false"
                    >
                      {{ alarm.name || alarm.title || alarm.message || 'Neznámý alarm' }}
                    </router-link>
                  </li>
                </ul>
            </li>
            <!-- Arrow item (Sidebar toggle) -->
            <li class="ecm-navbar__icon-item ecm-navbar__icon-item--arrow" @click="toggleSidebar">
              <span class="material-icons">arrow_drop_down</span>
            </li>

            <!-- Settings item -->
            <RouterLink :to="{ name: 'setting', params: { parameter: 'setting' } }">
              <li class="ecm-navbar__icon-item ecm-navbar__icon-item--settings">
                <span class="material-icons">settings</span>
              </li>
            </RouterLink>

            <!-- More item (Navbar toggle) -->
            <li
              class="ecm-navbar__icon-item ecm-navbar__icon-item--more"
              ref="navBarRef"
              @click="toggleNavBar"
            >
              <span class="material-icons">more_vert</span>
              <ul v-if="uiStore.navBarIcon" class="ecm-navbar__dropdown">
                <li class="ecm-logout-container" v-if="authStore.user">
                  <span class="ecm-logout-container__text"
                    >Uživatel:<span class="ecm-logout-container__user">{{
                      authStore.user.name || 'Uživatel'
                    }}</span></span
                  >
                  <span class="material-icons ecm-logout-container__logout" @click="logout"
                    >logout</span
                  >
                </li>
                <!-- Iterování přes navigační položky -->

                <li v-for="(link, index) in navbar" :key="index" class="ecm-navbar__dropdown-item">
                  <RouterLink
                    :to="link.to"
                    active-class="ecm-navbar__active-link"
                    class="ecm-navbar__main-nav-link"
                  >
                    {{ link.text }}
                  </RouterLink>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>

<style setup lang="scss">
.ecm-navbar__dropdown-2 {
  background-color: rgb(255, 252, 252);
  width: 300px;
  height: 100vh;
  position: absolute;
  top: 54px;
  right: -135px;

  & li {
    padding: 0.3rem 0.8rem;
    text-align: left;
  }

  & li a {
    padding: 0px;
    padding-left: 5px;
    border-bottom: 1px solid #ccc;
    height: 50px;
    background-color: rgba(255, 0, 0, 0.089);
  }
}
</style>
