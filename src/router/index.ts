// ecm marfy
import { createRouter, createWebHistory } from 'vue-router'
import sumamriesView from '@/views/ecm-marfy/summariesView.vue'
import alarmsView from '@/views/ecm-marfy/alarmsView.vue'
import dailyPlansView from '@/views/ecm-marfy/dailyPlansView.vue'
import dataView from '@/views/ecm-marfy/dataView.vue'
import mainOverview from '@/views/ecm-marfy/mainOverview.vue'
import statisticsView from '@/views/ecm-marfy/statisticsView.vue'
import reportsView from '@/views/ecm-marfy/reportsView.vue'

// ecm Marfy detaily zarizeni 
import battreryDetailView from '@/views/ecm-marfy/device-detail/battreryDetailView.vue'
import photovoltaicsDetailView from '@/views/ecm-marfy/device-detail/photovoltaicsDetailView.vue'
import electricityMeterDetailView from '@/views/ecm-marfy/device-detail/electricityMeterDetailView.vue'

// ecm komunity
import communityManagementView from '@/views/community-marfy/communityManagementView.vue'
import communityDataView from '@/views/community-marfy/communityDataView.vue'
import documentsView from '@/views/community-marfy/documentsView.vue'
import memberManagementView from '@/views/community-marfy/memberManagementView.vue'
import userGroupManagementView from '@/views/community-marfy/userGroupManagementView.vue'

// DynamicWeb
import scadaView from '@/views/dynamicWeb/scadaView.vue'
import invertersView from '@/views/dynamicWeb/invertersView.vue'
import publicityView from '@/views/dynamicWeb/publicityView.vue'
import boilerRoomView from '@/views/dynamicWeb/boilerRoomView.vue'
import cogenerationView from '@/views/dynamicWeb/cogenerationView.vue'
import electricityMetersView from '@/views/dynamicWeb/electricityMetersView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'overview',
      component: mainOverview
    },
    {
      path: '/alarmy',
      name: 'alarms',
      component: alarmsView
    },
    {
      path: '/denni-plany',
      name: 'daily-plans',
      component: dailyPlansView
    },
    {
      path: '/data',
      name: 'data',
      component: dataView
    },
    {
      path: '/souhrny',
      name: 'summaries',
      component: sumamriesView
    },
    {
      path: '/statistiky',
      name: 'statistics',
      component: statisticsView
    },
    {
      path: '/vykazy',
      name: 'reports',
      component: reportsView
    },
    {
      path: '/detail-baterie',
      name: 'battery-detail',
      component: battreryDetailView
    },
    {
      path: '/detail-fotovoltaiky',
      name: 'photovoltaics-detail',
      component: photovoltaicsDetailView
    },
    {
      path: '/detail-elektromeru',
      name: 'electricitymeter-detail',
      component: electricityMeterDetailView
    },
    {
      path: '/komunity/management',
      name: 'community-management',
      component: communityManagementView
    },
    {
      path: '/komunity/data',
      name: 'community-data',
      component: communityDataView
    },
    {
      path: '/komunity/dokumenty',
      name: 'community-documents',
      component: documentsView
    },
    {
      path: '/komunity/sprava-clenu',
      name: 'members-management',
      component: memberManagementView
    },
    {
      path: '/komunity/sprava-skupin',
      name: 'users-group-management',
      component: userGroupManagementView
    },
    {
      path: '/vizualizace/scada',
      name: 'scada',
      component: scadaView
    },
    {
      path: '/vizualizace/stridace',
      name: 'inverters',
      component: invertersView
    },
    {
      path: '/publicita',
      name: 'publicity',
      component: publicityView
    },
    {
      path: '/vizualizace/kotelna',
      name: 'boiler-room',
      component: boilerRoomView
    },
    {
      path: '/vizualizace/kogenerace',
      name: 'cogeneration',
      component: cogenerationView
    },
    {
      path: '/vizualizace/elektromery',
      name: 'electricityMeters',
      component: electricityMetersView
    }
  ]
})


export default router;
