import {nextTick, watch} from "vue";
import type {DynamicFormConstants} from "@/interfaces/ecm-marfy/forms/DynamicFormConstantsInterface";
import {getOptions, resetOptionsCache} from "@/composables/global/DynamicForm/dynamicFormFunctions";
import { handleFieldChange } from "@/composables/global/DynamicForm/dynamicFormFunctions";

export function dynamicFormWatcher(props: any,constants: DynamicFormConstants ,emit: any) {
    watch(() => props.showDialog, val => (constants.showDialog.value = val));
    watch(constants.showDialog, val => emit('update:showDialog', val));
    watch(
        constants.schema,
        async (newSchema) => {
            resetOptionsCache();
            for (const field of newSchema) {
                if (constants.formData[field.name] === undefined) {
                    constants.formData[field.name] = field.typeStr === 'checkbox' ? false : '';
                }

                if (field.typeStr === 'select' || field.typeStr === "multiSelect") {
                    await getOptions(field.selectEndpoint, field.name, constants, field.endpointParameters);
                }
            }
        },
        { immediate: true }
    );

    watch(
        () => props.formData?.value,
        async (newFormData) => {
            if (newFormData) {
                const priorityKeys = ['DeviceId'];
                const keys = Object.keys(newFormData);
                keys.sort((a, b) => {
                    const aIndex = priorityKeys.indexOf(a);
                    const bIndex = priorityKeys.indexOf(b);
                    return (aIndex === -1 ? 999 : aIndex) - (bIndex === -1 ? 999 : bIndex);
                });

                for (const key of keys) {
                    const field = constants.schemaWithKeys.value.find(f => f.name === key);
                    if (field) {
                        constants.formData[key] = newFormData[key];
                        await handleFieldChange(field, { value: newFormData[key] }, constants);
                        if (
                            (field.typeStr === 'select' || field.typeStr === 'multiSelect') &&
                            field.selectEndpoint
                        ) {
                            constants.formData[key] = newFormData[key];
                        }
                    }
                }
            }
        },
        { immediate: true, deep: true }
    );

}