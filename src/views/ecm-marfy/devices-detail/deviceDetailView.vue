<script setup lang="ts">
import { useRoute } from 'vue-router'; //, useRouter
import { onMounted, ref } from 'vue';
import { useSelectedItemStore } from '@/stores/ui/useSelectedItemStore';
import { getDashboards } from '@/services/ecm-marfy/dashboard/dashboardService';
import Header from '@/components/ecm-marfy-components/marfy-layout/header-component.vue';
import NavtreeMarfy from '@/components/ecm-marfy-components/marfy-layout/aside-marfy-component.vue';

const store = useSelectedItemStore();
const route = useRoute();
//const router = useRouter();
const dashboardData = ref<any>(null);

onMounted(async () => {
  const param = route.params.parameter;
  if (param) {
    store.setSelectedItem(String(param), undefined, Number(param));
    try {
      const dashboards = await getDashboards(Number(param), store.selectedOrgId ?? 0, true);
      dashboardData.value = dashboards.data;
      console.log('Dashboard data:', dashboards.data);
    } catch (error) {
      console.error('Chyba při načítání dat:', error);
    }
  }
});

// function goBack() {
//   router.push({ name: 'homeView' });
// }
</script>

<template>
  <Header />
  <main class="ecm-main">
    <section class="ecm-main__wrap">
      <div class="ecm-main__container--primary">
        <div class="ecm-main__titleDevices">
          <span>Detail zařízení: {{ store.selectedItem }}</span>
          <!-- <button @click="goBack" class="ecm-back-button">Zpět</button> -->
        </div>
        <div v-if="dashboardData">
          <h2>Data zařízení</h2>
          <pre>{{ JSON.stringify(dashboardData, null, 2) }}</pre>
        </div>
        <div v-else>
          <p>Načítání dat... nebo žádná data k dispozici.</p>
        </div>
      </div>
    </section>
  </main>
  <NavtreeMarfy />
</template>

<style scoped>
.ecm-back-button {
  margin-left: 20px;
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.ecm-back-button:hover {
  background-color: #0056b3;
}
</style>