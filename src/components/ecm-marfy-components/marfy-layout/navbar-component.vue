<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useSidebarStore } from '@/stores/ui/resize';
import { useWindowResize } from '@/composables/global/gl_resizeWindow';
import { useUiStore } from '@/stores/ui/uiStore';
import { useAuthStore } from '@/stores/auth/useAuthStore';
import { useAlarmStore } from '@/stores/ecm-marfy/alarms/useAlarmStore';
import { useRoute, useRouter } from 'vue-router';

const uiStore = useUiStore();
const sidebarStore = useSidebarStore();
const authStore = useAuthStore();
const alarmStore = useAlarmStore();

const route = useRoute();
const router = useRouter();

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
const alarms = computed(() => alarmStore.alarms);

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

function isActiveLink(to: any) {
  const resolved = router.resolve(to);
  const path = route.path;

  if (path.startsWith('/detail-elektromeru')) {
    return to.name === 'data';
  }

  return path.startsWith(resolved.path);
}

function onAlarmNotificationClick(alarmId: string | number) {
  alarmStore.selectAlarm(alarmId);
  uiStore.closeNotification();
  router.push({ name: 'alarms' });
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
            <RouterLink :to="{ name: 'homeView' }">
              <img src="/src/components/img/icon-logo.webp" alt="Logo" width="72px" height="auto" />
            </RouterLink>
          </div>
        </div>

        <nav class="ecm-navbar__main-nav">
          <ul ref="navList" class="ecm-navbar__main-nav-list">
            <li v-for="(link, index) in navbar" :key="index" class="ecm-navbar__main-nav-item">
              <RouterLink
                :to="link.to"
                :class="['ecm-navbar__main-nav-link', isActiveLink(link.to) ? 'ecm-navbar__active-link' : '']"
              >
                {{ link.text }}
              </RouterLink>
              <span
                :class="[index >= navbar.length - 2 ? 'ecm-navbar__link-line--alt' : 'ecm-navbar__link-line', isActiveLink(link.to) ? 'ecm-navbar__active-line' : '']"
              ></span>
            </li>
          </ul>
        </nav>
      </div>

      <div class="ecm-navbar__icons">
        <nav class="ecm-navbar__secondary-nav">
          <ul class="ecm-navbar__secondary-nav-list">
            <li class="ecm-navbar__icon-item ecm-navbar__icon-item--notification" ref="notificationBarRef" @click="toggleNotification">
              <span class="ecm-navbar__icon-item--notification-number" v-if="alarms.length > 0">
                {{ alarms.length }}
              </span>
              <span class="material-icons">notifications</span>
              <ul v-if="uiStore.isNotificationBar && alarms.length > 0" class="ecm-navbar__dropdown-notification">
                <li
                  v-for="(alarm, index) in alarms"
                  :key="index"
                  class="ecm-navbar__dropdown-item"
                >
                  <a href="#" @click.prevent="onAlarmNotificationClick(alarm.id)">
                    {{ alarm.message }}
                  </a>
                </li>
              </ul>
            </li>

            <li class="ecm-navbar__icon-item ecm-navbar__icon-item--arrow" @click="toggleSidebar">
              <span class="material-icons">arrow_drop_down</span>
            </li>

            <RouterLink :to="{ name: 'setting', params: { parameter: 'setting' } }">
              <li class="ecm-navbar__icon-item ecm-navbar__icon-item--settings">
                <span class="material-icons">settings</span>
              </li>
            </RouterLink>

            <li class="ecm-navbar__icon-item ecm-navbar__icon-item--more" ref="navBarRef" @click="toggleNavBar">
              <span class="material-icons">more_vert</span>
              <ul v-if="uiStore.navBarIcon" class="ecm-navbar__dropdown-menu">
                <li class="ecm-navbar__dropdown-menu-logout-item" v-if="authStore.user">
                  <span class="ecm-navbar__dropdown-menu-logout-item-text">
                    Uživatel:
                    <span class="ecm-navbar__dropdown-menu-logout-item-user">
                      {{ authStore.user.name || 'Uživatel' }}
                    </span>
                  </span>
                  <span class="material-icons ecm-navbar__dropdown-menu-logout-item-icon" @click="logout">logout</span>
                </li>

                <li v-for="(link, index) in navbar" :key="index" class="ecm-navbar__dropdown-menu-item">
                  <RouterLink
                    :to="link.to"
                    :class="['ecm-navbar__main-nav-link', isActiveLink(link.to) ? 'ecm-navbar__active-link' : '']"
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