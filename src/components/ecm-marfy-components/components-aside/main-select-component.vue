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

onMounted(async () => {
  const response = await axios.get('https://marfy-api-test.ecmsystem.cz/api/Organization/Organizations');
  orgList.value = response.data;
});

function handleSelect(item: { id: number; name: string }) {
  setSelectedItem(item.name);
  mainSelect.toggleStyle();
}
</script>

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
                        <li class="ecm-select__option"
                            v-for="(item, index) in orgList"
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
