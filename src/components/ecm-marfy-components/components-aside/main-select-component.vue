<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useSelectedItemStore } from '@/stores/useSelectedItemStore';
import { useMainSelect } from '@/stores/useMainSelect';
import axios from 'axios';

const optionList = ref<HTMLElement | null>(null);

const store = useSelectedItemStore();
const setSelectedItem = store.setSelectedItem;

const mainSelect = useMainSelect();

const orgList = ref<{ id: number; name: string }[]>([]);
const isLoading = ref(false);

interface Organization {
      id: number;
      name: string;
    }

    interface OrganizationResponse {
      data: Organization[];
    }

function saveSelectedOrgToStorage(orgId: number, orgName: string) {
    localStorage.setItem('selectedOrgId', orgId.toString());
    localStorage.setItem('selectedOrgName', orgName);
}

function getSelectedOrgFromStorage() {
    const orgId = localStorage.getItem('selectedOrgId');
    const orgName = localStorage.getItem('selectedOrgName');
    
    return orgId && orgName ? {
        id: parseInt(orgId),
        name: orgName
    } : null;
}

onMounted(async () => {
    isLoading.value = true; 
    try {
        const response: OrganizationResponse = await axios.get<Organization[]>(`${import.meta.env.VITE_API_URL}Organization/Organizations`);
        orgList.value = response.data
            .slice()
            .sort((a, b) => (a.name || '').localeCompare(b.name || '', 'cs', { sensitivity: 'accent', caseFirst: 'upper' }));

        const savedOrg = getSelectedOrgFromStorage();
        
        if (savedOrg) {
            setSelectedItem(savedOrg.name, savedOrg.id);
        } else if (!store.selectedOrgId && orgList.value.length > 0) {
            const firstOrg = orgList.value[0];
            setSelectedItem(firstOrg.name, firstOrg.id);
            saveSelectedOrgToStorage(firstOrg.id, firstOrg.name);
        }
    } finally {
        isLoading.value = false;
    }
});

function handleSelect(item: { id: number; name: string }) {
  setSelectedItem(item.name, item.id);
  saveSelectedOrgToStorage(item.id, item.name);
  mainSelect.toggleStyle();
}
</script>

<!-- <script setup lang="ts">
import { onMounted } from 'vue';
import { useSelectedItemStore } from '@/stores/useSelectedItemStore';
import { useMainSelect } from '@/stores/useMainSelect';
import { useOrganizations } from '@/composables/ecm-marfy/componenets-aside-ts/useSelect'; // tvoje cesta

const store = useSelectedItemStore();
const mainSelect = useMainSelect();
const { setSelectedItem } = store;

const {
  orgList,
  selectedOrg,
  orgDetails,
  isLoading,
  fetchOrganizations,
  handleSelect, // volat handleSelect z composable pro zajištění načtení detailů
} = useOrganizations();

// Při načtení komponenty načti seznam organizací a nastav první (nebo uloženou)
onMounted(async () => {
  await fetchOrganizations();

  if (selectedOrg.value) {
    setSelectedItem(selectedOrg.value.name, selectedOrg.value.id);
  }
});

// Tuto funkci můžeš dál používat např. při kliknutí v UI
function selectOrgFromUI(item: { id: number; name: string }) {
  handleSelect(item); // nastaví do composable + načte detaily
  setSelectedItem(item.name, item.id); // nastaví do globálního store
  mainSelect.toggleStyle(); // UI animace
}
</script> -->


<template>
    <div class="ecm-select">
        <nav class="ecm-select__tree-nav">
            <ul class="ecm-select__tree">
                <li class="ecm-select__tree-item">
                    <div class="ecm-select__item" @click="mainSelect.toggleStyle">
                        <span class="ecm-select__value">{{ store.selectedItem }}</span>
                        <span class="ecm-select__icon-container">
                            <span class="ecm-select__icon material-icons" style="font-size: 19px;">keyboard_arrow_down</span>
                        </span>
                    </div>
                    <ul ref="optionList"
                        class="ecm-select__options"
                        :class="{ 'ecm-select__options--active': mainSelect.isActive, 'ecm-select__options--hidden': !mainSelect.isActive }">
                        <li v-if="isLoading" class="ecm-select__option">
                            Načítání...
                        </li>
                        <li class="ecm-select__option"
                            v-for="(item) in orgList"
                            :key="item.id"
                            @click="handleSelect(item)">
                            {{ item.name }}
                        </li>
                    </ul>
                </li>
            </ul>
        </nav>
    </div>
</template>
