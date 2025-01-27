<script setup lang="ts">
import { computed } from 'vue';
import { useSidebarStore } from '@/stores/resize'; 
import { useWindowResize } from '@/composables/gl_resizeWindow';
import { useUiStore } from '@/stores/uiStore';

// import { mdiAccountSearch } from '@mdi/js';
import { ref } from 'vue';

// Univerzální funkce pro přepínání tříd
const toggleClasses = (element: HTMLElement | null, classes: string[]) => {
  if (element) {
    classes.forEach((className) => {
      element.classList.toggle(className);
    });
  }
};

// Navbar
const navBarIcon = ref<HTMLElement | null>(null);
const navBarClick = () => {
  toggleClasses(navBarIcon.value, ['active', 'noneActive']);
};

// Sidebar
const sidebar = ref<HTMLElement | null>(null);
const sidebarClick = () => {
  toggleClasses(sidebar.value, ['active', 'noneActive']);
  alert('click');
};

const { dynamicStyles } = useWindowResize();
const sidebarStore = useSidebarStore();

// Sledování stavu isWide z Pinia store odebraní navigace
const isWide = computed(() => sidebarStore.isWide);

let navbar = ref([
    { to: { name: 'homeView' }, text: "Můj Marfy" },
    { to: { name: 'data' }, text: "Data" },
    { to: { name: 'summaries' }, text: "Souhrny" },
    { to: { name: 'daily-plans' }, text: "Denní plány" },
    { to: { name: 'alarms' }, text: "Alarmy" },
    { to: { name: 'komunity-home' }, text: "Komunity"},
    { to: { name: 'reports' }, text: "Výkazy" },
    { to: { name: 'statistics' }, text: "Statistiky" },
    { to: { name: 'scada' }, text: "Publicita"},
    { to: { name: 'publicity' }, text: "Vizualizace"}
]);

// Připojení ke store
const uiStore = useUiStore();

// Funkce pro přepnutí viditelnosti aside
const toggleAside = () => {
  uiStore.toggleAside();
};

</script>



<template>

<div class="ecm-navbar" :style="dynamicStyles">
    <div class="ecm-navbar__nav-wrapper">
        <div class="ecm-navbar__container" v-if="!isWide" >
            <div class="ecm-navbar__logo">
                <div class="ecm-navbar__logo-hero">
                    <RouterLink :to="{ name: 'homeView' }">
                    <img src="/src/components/img/logo_ecm.webp" alt="Logo" width="180px" height="auto" />
                    </RouterLink>
                </div>
                <div class="ecm-navbar__logo-responsive">
                <RouterLink :to="{ name: 'homeView' }"><img src="/src/components/img/icon-logo.webp" alt="Logo" width="72px" height="auto" /></RouterLink>

                </div>
            </div>
            <nav class="ecm-navbar__main-nav">
                <ul ref="navList" class="ecm-navbar__main-nav-list">
                    <li v-for="(link, index) in navbar" :key="index" class="ecm-navbar__main-nav-item">
                        <RouterLink :to="link.to" active-class="ecm-navbar__active-link" class="ecm-navbar__main-nav-link">{{ link.text }}</RouterLink>
                        <span :class="[index >= navbar.length - 2 ? 'ecm-navbar__link-line--alt':'ecm-navbar__link-line', (link.to?.name && $route.name === link.to.name) ? 'ecm-navbar__active-line' : '']"></span>
                    </li>
                </ul>
            </nav>
        </div>
        <div class="ecm-navbar__icons">
            <nav class="ecm-navbar__secondary-nav">
                <ul class="ecm-navbar__secondary-nav-list">
                    <li class="ecm-navbar__icon-item ecm-navbar__icon-item--notification"   @click="toggleAside">
                        <span class="ecm-navbar__icon-item--notification-number">1</span>
                        <span class="material-icons" style="font-size: 26px;">notifications</span>
                        <ul ref="navBarIcon" class="ecm-navbar__dropdown ecm-navbar__dropdown--hidden">
                            <li v-for="(link, index) in navbar" :key="index" class="ecm-navbar__dropdown-item">
                                <span class="ecm-navbar__dropdown-text">
                                <div style="width: 300px; height: 300px; background-color: black;"></div>
                                </span>
                            </li>
                        </ul>
                    </li>
                    <li class="ecm-navbar__icon-item ecm-navbar__icon-item--arrow"  @click="sidebarClick">
                        <span class="material-icons" style="font-size: 26px;">arrow_drop_down</span>
                    </li>
                    <RouterLink :to="{ name: 'setting', params: { parameter: 'setting' } }">
                        <li class="ecm-navbar__icon-item ecm-navbar__icon-item--settings">
                            <span class="material-icons" style="font-size: 26px;">settings</span>
                        </li>
                    </RouterLink>
                    <li class="ecm-navbar__icon-item ecm-navbar__icon-item--more" @click="navBarClick">
                        <span class="material-icons" style="font-size: 26px;">more_vert</span>
                        <ul ref="navBarIcon" class="ecm-navbar__dropdown ecm-navbar__dropdown--hidden">
                            <li v-for="(link, index) in navbar" :key="index" class="ecm-navbar__dropdown-item">
                                <span class="ecm-navbar__dropdown-text">
                                    <RouterLink :to="link.to">{{ link.text }}</RouterLink>
                                </span>
                            </li>
                        </ul>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
</div>

</template>


