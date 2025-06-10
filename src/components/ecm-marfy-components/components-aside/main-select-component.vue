<script setup lang="ts">
import { computed } from 'vue'
import { useOrganizationSelect } from '@/composables/ecm-marfy/component-aside/useOrganizationSelect'
import { useMainSelect } from '@/stores/ui/useMainSelect'
import { useSelectedItemStore } from '@/stores/ui/useSelectedItemStore'

const props = defineProps({
  filter: {
    type: String,
    default: ''
  }
})

const { orgList, isLoading, handleSelect } = useOrganizationSelect()
const mainSelect = useMainSelect()
const store = useSelectedItemStore()

const filteredList = computed(() => {
  if (!props.filter) return orgList.value
  return orgList.value.filter((item) =>
    item.name.toLowerCase().includes(props.filter.toLowerCase())
  )
})
</script>

<template>
  <div class="ecm-select">
    <nav class="ecm-select__tree-nav">
      <ul class="ecm-select__tree">
        <li class="ecm-select__tree-item">
          <div class="ecm-select__item" @click="mainSelect.toggleStyle">
            <span class="ecm-select__value">{{ store.selectedItem }}</span>
            <span class="ecm-select__icon-container">
              <span class="ecm-select__icon material-icons" style="font-size: 19px"
                >keyboard_arrow_down</span
              >
            </span>
          </div>
          <ul
            class="ecm-select__options"
            :class="{
              'ecm-select__options--active': mainSelect.isActive,
              'ecm-select__options--hidden': !mainSelect.isActive
            }"
          >
            <li v-if="isLoading" class="ecm-select__option">Načítání...</li>
            <li
              v-for="item in filteredList"
              :key="item.id"
              class="ecm-select__option"
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
