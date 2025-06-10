import type {Ref} from "vue";

export interface DynamicFormData {
    formModelName? : string,
    showEditDialog : Ref<boolean>,
}