import type {FieldSchema} from "@/interfaces/DynamicFormField";
import axios from "axios";
import InputText from "primevue/inputtext";
import InputNumber from "primevue/inputnumber";
import DatePicker from "primevue/datepicker";
import Checkbox from "primevue/checkbox";
import Select from "primevue/select";
import MultiSelect from "primevue/multiselect";
import type {DynamicFormConstants} from "@/interfaces/DynamicFormConstantsInterface";

export function handleFieldChange(field: FieldSchema, event: any, constants: DynamicFormConstants) {
    let selectedValue = event.value;
    
    if(field.typeStr === 'checkbox') {
        selectedValue = event.target.checked;
    }
    if (field.name === 'TemplateId') {
        const groupField = constants.schemaWithKeys.value.find(f => f.name === 'GroupIds');
        if (groupField) {
            groupField.visible = true;
        }
        return;
    }
    if(field.name === 'CustomMessage'){
        const messageSubject = constants.schemaWithKeys.value.find(f => f.name === 'MessageSubject');
        const message = constants.schemaWithKeys.value.find(f => f.name === 'Message');
        if(messageSubject && message) {
            messageSubject.visible = selectedValue;
            message.visible = selectedValue;
        }
        return;
    }
}
export async function getOptions(endpoint: string | undefined, fieldName: string, constants : DynamicFormConstants,parameters?: string[],) {
    if (!endpoint) return;
    let finalEndpoint = endpoint;
    if (parameters && parameters.length) {
        for (const param of parameters) {
            let value = constants.formData[param];
            if (!value && (param === 'OrgId' || param === "orgId")) {
                value = constants.store.selectedOrgId;
            }
            finalEndpoint = finalEndpoint.replace(`{${param}}`, value ?? '');
            if(value == null){
                return;
            }
        }
    }

    const response = await axios.get(`${import.meta.env.VITE_API_URL}${finalEndpoint}`);


    constants.selectOptions[fieldName] = response.data.map((item: { id: any; name: string }) => ({
        label: item.name,
        value: item.id,
    }));
}

export function getComponent(type: string,endpoint?:string) {
    switch (type) {
        case 'text':
            return InputText;
        case 'number':
            return InputNumber;
        case 'date':
            return DatePicker;
        case 'checkbox':
            return Checkbox;
        case 'select':
            return Select;
        case 'multiSelect':
            return MultiSelect;
        default:
            return InputText;
    }
}

export function handleSubmit(constants: DynamicFormConstants, emit: any) {
    emit('submit', constants.formData);
}