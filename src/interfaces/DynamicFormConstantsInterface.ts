import type { ComputedRef, Ref } from "vue";
import type { FieldSchema } from "@/interfaces/DynamicFormField";
import { useSelectedItemStore } from "@/stores/useSelectedItemStore";
interface FieldSchemaWithComponent extends FieldSchema {
    component: any;
}
export interface DynamicFormConstants {
    store: ReturnType<typeof useSelectedItemStore>;
    schema: ComputedRef<FieldSchema[]>;
    schemaWithKeys: FieldSchema[];
    schemaWithComponents: ComputedRef<FieldSchemaWithComponent[]>;
    selectOptions: Record<string, any[]>;
    showDialog: Ref<boolean>;
    formData: Record<string, any>;
}