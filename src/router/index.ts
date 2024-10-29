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
import battreryView from '@/views/ecm-marfy/detail-zarizeni/battreryView.vue'
import photovoltaicsView from '@/views/ecm-marfy/detail-zarizeni/photovoltaicsView.vue'
import electricityMeterView from '@/views/ecm-marfy/detail-zarizeni/electricityMeterView.vue'

// ecm komunity
import communityManagementView from '@/views/komunity/communityManagementView.vue'
import communityDataView from '@/views/komunity/communityDataView.vue'
import documentsView from '@/views/komunity/documentsView.vue'
import memberManagementView from '@/views/komunity/memberManagementView.vue'
import userGroupManagementView from '@/views/komunity/userGroupManagementView.vue'

// DynamicWeb
import scadaView from '@/views/vizualizace/scadaView.vue'
import stridaceView from '@/views/vizualizace/stridaceView.vue'
import publicitaView from '@/views/vizualizace/publicitaView.vue'
import kotelnaView from '@/views/vizualizace/kotelnaView.vue'
import kgjView from '@/views/vizualizace/kgjView.vue'
import elektromeryView from '@/views/vizualizace/elektromeryView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Přehledy',
      component: mainOverview
    },
    {
      path: '/alarmy',
      name: 'Alarmy',
      component: alarmsView
    },
    {
      path: '/denni-plany',
      name: 'Denní plány',
      component: dailyPlansView
    },
    {
      path: '/data',
      name: 'Data',
      component: dataView
    },
    {
      path: '/souhrny',
      name: 'Souhrny',
      component: sumamriesView
    },
    {
      path: '/statistiky',
      name: 'Statistiky',
      component: statisticsView
    },
    {
      path: '/vykazy',
      name: 'Vykazy',
      component: reportsView
    },
    {
      path: '/detail-baterie',
      name: 'detail-baterie',
      component: battreryView
    },
    {
      path: '/detail-fotovoltaiky',
      name: 'detail-fotovoltaiky',
      component: photovoltaicsView
    },
    {
      path: '/detail-elektromeru',
      name: 'detail-elektromeru',
      component: electricityMeterView
    },
    {
      path: '/management',
      name: 'management',
      component: communityManagementView
    },
    {
      path: '/komunity/data',
      name: 'data',
      component: communityDataView
    },
    {
      path: '/komunity/dokumenty',
      name: 'dokumenty',
      component: documentsView
    },
    {
      path: '/komunity/sprava-clenu',
      name: 'sprava-clenu',
      component: memberManagementView
    },
    {
      path: '/komunity/sprava-skupin',
      name: 'sprava-skupin',
      component: userGroupManagementView
    },
    {
      path: '/vizualizace/scada',
      name: 'scada',
      component: scadaView
    },
    {
      path: '/vizualizace/stridace',
      name: 'stridace',
      component: stridaceView
    },
    {
      path: '/publicita',
      name: 'publicita',
      component: publicitaView
    },
    {
      path: '/vizualizace/kotelna',
      name: 'kotelna',
      component: kotelnaView
    },
    {
      path: '/vizualizace/kogenerace',
      name: 'kogenerace',
      component: kgjView
    },
    {
      path: '/vizualizace/elektromery',
      name: 'elektromery',
      component: elektromeryView
    }
  ]
})


export default router;
