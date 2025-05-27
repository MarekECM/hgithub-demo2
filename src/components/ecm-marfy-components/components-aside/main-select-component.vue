
<script setup lang="ts">
import { useOrganizationSelect } from '@/composables/ecm-marfy/component-aside-ts/useOrganizationSelect';
import { useMainSelect } from '@/stores/ui/useMainSelect';
import { useSelectedItemStore } from '@/stores/ui/useSelectedItemStore';

const { orgList, isLoading, handleSelect } = useOrganizationSelect();
const mainSelect = useMainSelect();
const store = useSelectedItemStore();
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
          <ul
            class="ecm-select__options"
            :class="{
              'ecm-select__options--active': mainSelect.isActive,
              'ecm-select__options--hidden': !mainSelect.isActive,
            }"
          >
            <li v-if="isLoading" class="ecm-select__option">Načítání...</li>
            <li
              class="ecm-select__option"
              v-for="item in orgList"
              :key="item.id"
              @click="handleSelect(item)"
            >
              {{ item.name }}
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  </div>
</template>
