import {useSelectedItemStore} from "@/stores/ui/useSelectedItemStore";
import type {FieldSchema} from "@/interfaces/DynamicFormField";
import {computed, isRef, reactive, ref, watch} from "vue";
import {getComponent} from "@/composables/global/DynamicForm/dynamicFormFunctions";

export function getDynamicFormConstants(props: {
    showDialog: boolean;
    schema: FieldSchema[];
    formData?: Record<string, any>,
    dialogName: string;
    formModelName?: string;
}) {
    const store = useSelectedItemStore();

    const schema = computed(() => props.schema || []);

    const schemaWithKeys = ref<FieldSchema[]>([]);

    watch(schema, (newSchema) => {
        if (newSchema && newSchema.length) {
            schemaWithKeys.value = newSchema.map(field =>
                reactive({
                    ...field,
                    visible: field.visible !== false,
                })
            );
        }
    }, { immediate: true });
    
    const schemaWithComponents = computed(() =>
        schemaWithKeys.value.map(field => ({
            ...field,
            component: getComponent(field.typeStr, field.selectEndpoint)
        }))
    );
    const selectOptions = reactive<Record<string, any[]>>({});

    const showDialog = ref(props.showDialog);
    const formData = isRef(props.formData) ? props.formData : ref(props.formData ?? {});
    const formModelName = props.formModelName;
    
    
    return {
        store,
        schema,
        schemaWithKeys,
        schemaWithComponents,
        selectOptions,
        showDialog,
        formData,
        formModelName,
    }
}