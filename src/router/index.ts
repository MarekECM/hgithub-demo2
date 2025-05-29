import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth/useAuthStore'
import { useSelectedItemStore } from '@/stores/ui/useSelectedItemStore'

import sumamriesView from '@/views/ecm-marfy/summariesView.vue'
import alarmsView from '@/views/ecm-marfy/alarmsView.vue'
import dailyPlansView from '@/views/ecm-marfy/dailyPlansView.vue'
import dataView from '@/views/ecm-marfy/dataView.vue'
import homeView from '@/views/ecm-marfy/homeView.vue'
import statisticsView from '@/views/ecm-marfy/statisticsView.vue'
import reportsView from '@/views/ecm-marfy/reportsView.vue'
import settingView from '@/views/ecm-marfy/settingView.vue'

// ecm Marfy detaily zarizeni 
// import battreryDetailView from '@/views/ecm-marfy/devices-detail/battreryDetailView.vue'
// import photovoltaicsDetailView from '@/views/ecm-marfy/devices-detail/photovoltaicsDetailView.vue'
import electricityMeterDetailView from '@/views/ecm-marfy/devices-detail/electricityMeterDetailView.vue'

// ecm komunity
import communityHomeView from '@/views/community/community-homeView.vue'

// DynamicWeb
import scadaView from '@/views/dynamic-web/scadaView.vue'
import publicityView from '@/views/dynamic-web/publicityView.vue'

// Login
import loginView from '@/views/loginView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: () => {
          const authStore = useAuthStore();
        return authStore.isAuthenticated ? '/home' : '/login';
      }
    },
    {
      path: '/login',
      name: 'login',
      component: loginView,
      meta: { requiresAuth: false }
    },
    {
      path: '/home',
      name: 'homeView',
      component: homeView
    },
    {
      path: '/alarmy/:parameter?',
      name: 'alarms',
      component: alarmsView
    },
    {
      path: '/denni-plany/:parameter?',
      name: 'daily-plans',
      component: dailyPlansView
    },
    {
      path: '/data/:parameter?',
      name: 'data',
      component: dataView
    },
    {
      path: '/souhrny/:parameter?',
      name: 'summaries',
      component: sumamriesView
    },
    {
      path: '/statistiky/:parameter?',
      name: 'statistics',
      component: statisticsView
    },
    {
      path: '/vykazy/:parameter?',
      name: 'reports',
      component: reportsView
    },
    {
      path: '/nastaveni/:parameter?',
      name: 'setting',
      component: settingView
    },
    {
      path: '/detail-elektromeru/:parameter?',
      name: 'electricitymeter-detail',
      component: electricityMeterDetailView
    },
    {
      path: '/komunity-home/:parameter?',
      name: 'komunity-home',
      component: communityHomeView
    },    
    {
      path: '/scada/:parameter?',
      name: 'scada',
      component: scadaView
    },    
    {
      path: '/publicity/:parameter?',
      name: 'publicity',
      component: publicityView
    },
    {
      path: '/login',
      component: () => import('@/views/loginView.vue')
    },
    {
      path: '/dashboard',
      component: () => import('@/views/ecm-marfy/homeView.vue'),
    }
  ]
})

router.beforeEach(async (to, _, next) => {
    const authStore = useAuthStore()

    if (!authStore.isAuthenticated) {
        await authStore.loadUserFromToken();
    }
    console.log(to.path);
    if (authStore.isAuthenticated) {
        if (to.path === '/login') {
            next('/home');
        } else {
          const store = useSelectedItemStore();
          store.setSelectedSection(to.path);
          next();
        }
    } else {
        if (to.path !== '/login') {
            next('/login');
        } else {
            next();
        }
    }
});

export default router;
