<script setup lang="ts">
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import {dynamicFormWatcher} from "@/composables/global/DynamicForm/dynamicFormWatcher";
import {getDynamicFormConstants} from "@/composables/global/DynamicForm/dynamicFormConstants";
import type {DynamicFormConstants} from "@/interfaces/DynamicFormConstantsInterface";
import {handleFieldChange, handleSubmit} from "@/composables/global/DynamicForm/dynamicFormFunctions"
import type {FieldSchema} from "@/interfaces/DynamicFormField";
import {onMounted} from "vue";
import Toast from "primevue/toast"

const props = defineProps<{
  showDialog: boolean;
  schema: FieldSchema[];
  dialogName: string;
  formData?: Record<string, any>,
}>();

const emit = defineEmits<{
  (e: 'update:showDialog', value: boolean): void;
  (e: 'submit', formData: Record<string, any>): void;
}>();

const constants : DynamicFormConstants = getDynamicFormConstants(props);


onMounted(() => {
  dynamicFormWatcher(props, constants, emit);
});


</script>


<template>
  <Dialog
      v-model:visible="constants.showDialog.value"
      :header=props.dialogName
      :modal="true"
      :style="{ width: '400px' }"
  >
    <template v-for="field in constants.schemaWithComponents.value" :key="field.name">
      <div v-if="field.visible !== false" class="p-field mb-4">
        <label :for="field.name" class="block mb-2">{{ field.label }}: </label>
        
        <component
            :is="field.component"
            :id="field.name"
            v-model="constants.formData[field.name]"
            class="w-full"
            :binary="field.typeStr === 'checkbox'"
            :type="field.typeStr === 'text' ? 'text' : undefined"
            :inputId="field.name"
            :min="field.validation?.range?.minimum"
            :max="field.validation?.range?.maximum"
            :placeholder="field.placeHolder"
            :multiple="field.typeStr === 'multiSelect' && field.typeStr.startsWith('List') ? true : undefined"
            :options="field.typeStr.toLowerCase().includes('select') ? constants.selectOptions[field.name] : undefined"
            :optionLabel="field.typeStr.toLowerCase().includes('select') ? 'label' : undefined"
            :optionValue="field.typeStr.toLowerCase().includes('select') ? 'value' : undefined"
            :virtualScrollerOptions="field.typeStr.toLowerCase().includes('select') ? { itemSize: 40 }:undefined"
            @change="(e: any) => handleFieldChange(field, e,constants)"
        />
      </div>
    </template>

    <template #footer>
  <Button class="p-button p-button-danger" @click="constants.showDialog.value = false">
    <span class="material-icons">cancel</span> Zrušit
  </Button>
  <Button class="p-button p-button-success" @click="handleSubmit(constants, emit)">
    <span class="material-icons">save</span> Uložit
  </Button>
    </template>
    <Toast />
  </Dialog>
</template>

