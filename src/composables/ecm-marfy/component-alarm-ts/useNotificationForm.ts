// src/composables/ecm-marfy/component-alarm-ts/useNotificationForm.ts
import { ref } from 'vue';
import { fetchNotificationSchema } from '@/services/ecm-marfy//dashboard/dashboardService';

export function useNotificationForm() {
  const editSchema = ref([]);
  const formName = ref('Upravit alarm');
  const showEditDialog = ref(false);

  // Načtení schématu formuláře
  async function loadSchema() {
    editSchema.value = await fetchNotificationSchema();
  }

  // Logika pro odeslání formuláře
  function handleSubmit(updatedData: Record<string, any>) {
    console.log('Updated alarm:', updatedData);
    showEditDialog.value = false;
  }

  // Spuštění načítání při inicializaci
  loadSchema();

  return {
    editSchema,
    formName,
    showEditDialog,
    handleSubmit,
  };
}