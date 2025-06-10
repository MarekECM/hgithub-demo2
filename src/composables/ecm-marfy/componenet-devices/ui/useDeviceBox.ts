import { useRouter } from 'vue-router'
import { computed, ref } from 'vue'
import { useSidebarStore } from '@/stores/ui/resize'
import { useConfirm } from 'primevue/useconfirm'
import { useToast } from 'primevue/usetoast'
import {
  DeleteDevice,
  DeleteElement,
  UpdateElement
} from '@/services/ecm-marfy/devices/deviceService'
import { useSelectedItemStore } from '@/stores/ui/useSelectedItemStore'
import { useOrgTree } from '@/composables/ecm-marfy/component-aside/useOrgTree'
import type { DeviceData } from '@/interfaces/ecm-marfy/devices/deviceData'

export function useDeviceBox(props: { parameter?: string; data: DeviceData; variant?: string }) {
  const router = useRouter()
  const sidebarStore = useSidebarStore()
  const confirm = useConfirm()
  const toast = useToast()
  const store = useSelectedItemStore()
  const { fetchOrgTree } = useOrgTree()

  // Stav pro zobrazení dialogu a editaci názvu
  const showDialog = ref(false)
  const editedElementName = ref(props.data.elementName)

  // Ikony pro SpeedDial
  const settingsIcons = ref([
    { label: 'Edit', icon: 'edit', command: () => (showDialog.value = true) },
    {
      label: 'Delete',
      icon: 'delete',
      command: () => delDeviceOrElement(props.data.defaultElementID, props.data.nodeID)
    }
  ])

  // Výpočet třídy pozadí podle typu zařízení
  const backgroundClass = computed(() => {
    switch (props.variant) {
      case 'Bateriové úložiště':
        return 'bg-baterky'
      case 'Plynoměr':
        return 'bg-plynoměr'
      case 'Elektroměr':
        return 'bg-electricity'
      case 'Fotovoltaika':
        return 'bg-pv'
      case 'Lokalita':
        return 'bg-location'
      case 'Jiné':
        return 'bg-jine'
      default:
        return ''
    }
  })


async function navigateToDevice() {
  store.setSelectedItem(props.data.elementName, undefined, props.data.nodeID)
  
  if (!store.orgTree.length || store.idOfLoadedTree !== store.selectedOrgId) {
    await fetchOrgTree(store.selectedOrgId)
  }
  
  store.expandNodePath(props.data.nodeID)

  router.push({ name: 'device-detail', params: { parameter: props.data.nodeID } })
}

  // Mazání zařízení nebo elementu
  function delDeviceOrElement(elementId: number | null | undefined, deviceId: number) {
    const message = `Opravdu chcete smazat ${elementId != null ? 'tenhle element' : 'tohle zařízení'}?`
    confirm.require({
      message,
      header: 'Potvrzení mazání',
      icon: 'pi pi-info-circle',
      rejectLabel: 'Zrušit',
      rejectProps: {
        label: 'Zrušit',
        severity: 'secondary',
        outlined: true
      },
      acceptProps: {
        label: 'Smazat',
        severity: 'danger'
      },
      accept: async () => {
        showDialog.value = false

        const deleteResult =
          elementId != null ? await DeleteElement(elementId) : await DeleteDevice(deviceId)

        console.log(deleteResult)

        toast.add({
          severity: 'success',
          summary: 'Smazáno',
          detail: 'Zařízení bylo smazáno',
          life: 3000
        })
      },
      reject: () => {
        toast.add({
          severity: 'error',
          summary: 'Zamítnuto',
          detail: 'Mazání zrušeno',
          life: 3000
        })
      }
    })
  }

  // Uložení změn názvu
  async function saveElementName(editedElement: DeviceData) {
    if (editedElementName.value.trim() === '') {
      toast.add({
        severity: 'error',
        summary: 'Chyba',
        detail: 'Název nemůže být prázdný',
        life: 3000
      })
      return
    }
    editedElement.elementName = editedElementName.value
    await UpdateElement(editedElement)
    showDialog.value = false
    toast.add({
      severity: 'success',
      summary: 'Uloženo',
      detail: 'Název byl aktualizován',
      life: 3000
    })
  }

  return {
    showDialog,
    editedElementName,
    settingsIcons,
    backgroundClass,
    navigateToDevice,
    delDeviceOrElement,
    saveElementName,
    sidebarStore
  }
}
