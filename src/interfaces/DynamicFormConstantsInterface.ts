import type { FieldSchema } from "@/interfaces/DynamicFormField";
import type { ComputedRef, Ref } from "vue";
import { useSelectedItemStore } from "@/stores/ui/useSelectedItemStore";

export interface FieldSchemaWithComponent extends FieldSchema {
    component: any;
}

export interface DynamicFormConstants {
    store: ReturnType<typeof useSelectedItemStore>;
    schema: ComputedRef<FieldSchema[]>;
    schemaWithKeys: Ref<FieldSchema[]>;
    schemaWithComponents: ComputedRef<FieldSchemaWithComponent[]>;
    selectOptions: Record<string, any[]>;
    showDialog: Ref<boolean>;
    formData: Record<string, any>;
}
