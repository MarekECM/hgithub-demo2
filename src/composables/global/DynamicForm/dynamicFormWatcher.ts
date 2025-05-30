import {watch} from "vue";
import type {DynamicFormConstants} from "@/interfaces/DynamicFormConstantsInterface";
import {getOptions, resetOptionsCache} from "@/composables/global/DynamicForm/dynamicFormFunctions"; 

export function dynamicFormWatcher(props: any,constants: DynamicFormConstants ,emit: any) {
    watch(() => props.showDialog, val => (constants.showDialog.value = val));
    watch(constants.showDialog, val => emit('update:showDialog', val));
    watch(
        constants.schema,
        async (newSchema) => {
            resetOptionsCache();
            for (const field of newSchema) {
                console.log("");
                if (!field.validation.ignore) {
                    constants.formData[field.name] = field.typeStr === 'checkbox' ? false : '';
                }
                if (field.typeStr === 'select' || field.typeStr === "multiSelect") {
                    await getOptions(field.selectEndpoint, field.name, constants, field.endpointParameters);
                }
            }
        },
        { immediate: true }
    );
    
}