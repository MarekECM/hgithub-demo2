import type {FieldSchema} from "@/interfaces/DynamicFormField";
import axios from "axios";
import InputText from "primevue/inputtext";
import InputNumber from "primevue/inputnumber";
import DatePicker from "primevue/datepicker";
import Checkbox from "primevue/checkbox";
import Select from "primevue/select";
import MultiSelect from "primevue/multiselect";
import type {DynamicFormConstants} from "@/interfaces/DynamicFormConstantsInterface";

export async function handleFieldChange(field: FieldSchema, event: any, constants: DynamicFormConstants) {
    let selectedValue = event.value;
    if(field.typeStr === 'checkbox') {
        selectedValue = event.target.checked;
    }
    if(field.name === 'CustomMessage') {
        const messageSubject = constants.schemaWithKeys.value.find(f => f.name === 'MessageSubject');
        const message = constants.schemaWithKeys.value.find(f => f.name === 'Message');

        if(messageSubject && message) {
            messageSubject.visible = selectedValue;
            message.visible = selectedValue;
        }
    }
    switch (field.name) {
        case 'TemplateId':
            showGroups(constants);
            break;
        case 'CustomMessage':
            showMessageFields(constants,selectedValue);
            break;
        case 'DeviceId':
            await updateVariables(constants,selectedValue);
            break;
        case 'MinMaxVariable':
            showMinMaxVariable(constants,selectedValue);
            break;
    }
}

const optionsCache = new Map();
export function resetOptionsCache() {
    optionsCache.clear();
}
export async function getOptions(endpoint: string | undefined, fieldName: string, constants : DynamicFormConstants,parameters?: string[],) {
    if (!endpoint) return;
    let finalEndpoint = endpoint;
    if (parameters && parameters.length) {
        for (const param of parameters) {
            let value = constants.formData[param];
            if (!value){
                value = getValueFromParam(param,constants);
            }
            finalEndpoint = finalEndpoint.replace(`{${param}}`, value ?? '');
            if(value == null || value == ''){
                return;
            }
        }
    }

    if (optionsCache.has(finalEndpoint)) {
        constants.selectOptions[fieldName] = optionsCache.get(finalEndpoint);
        return;
    }

    const response = await axios.get(`${import.meta.env.VITE_API_URL}${finalEndpoint}`);
    const options = response.data.map((item: { id: any; name: string }) => ({
        label: item.name,
        value: item.id,
    }));

    optionsCache.set(finalEndpoint, options);
    
    constants.selectOptions[fieldName] = options;
}

export function normalizeEmptyStrings(obj: Record<string, any>) {
    const normalized: Record<string, any> = {};
    for (const key in obj) {
        if (obj[key] === '') {
            normalized[key] = null;
        } else {
            normalized[key] = obj[key];
        }
    }
    return normalized;
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
function getValueFromParam(param : string, constants: DynamicFormConstants){
    switch(param){
        case 'OrgId':
        case 'orgId':
            return constants.store.selectedOrgId;
        case 'deviceId':
            return constants.formData.DeviceId;
    }
}

async function updateVariables(constants: DynamicFormConstants,deviceId: number){
    const endpoint = "Form/GetVariablesFromDevice/{deviceId}";
    const dependentFields = [
        'VariableValueId',
        'VariableTimeId',
        'VariableAttenuationId',
        'VariableAttenuationValueId',
        'VariableMin',
        'VariableMax',
    ];
    
    for (const fieldName of dependentFields) {
        await getOptions(endpoint, fieldName, constants, ['deviceId']);
    }
}


function showGroups(constants: DynamicFormConstants){
    const groupField = constants.schemaWithKeys.value.find(f => f.name === 'GroupIds');
    if (groupField) {
        groupField.visible = true;
    }
    return;
}

function showMessageFields(constants: DynamicFormConstants,selectedValue: boolean){
    const messageSubject = constants.schemaWithKeys.value.find(f => f.name === 'MessageSubject');
    const message = constants.schemaWithKeys.value.find(f => f.name === 'Message');
    if(messageSubject && message) {
        messageSubject.visible = selectedValue;
        message.visible = selectedValue;
    }
    return;
}

function showMinMaxVariable(constants: DynamicFormConstants,selectedValue: boolean){
    const minField = constants.schemaWithKeys.value.find(f => f.name === 'MinValue');
    const maxField = constants.schemaWithKeys.value.find(f => f.name === 'MaxValue');
    const variableMin = constants.schemaWithKeys.value.find(f => f.name === 'VariableMin');
    const variableMax = constants.schemaWithKeys.value.find(f => f.name === 'VariableMax');
    
    
    if(minField && maxField && variableMin && variableMax) {
        minField.visible = !selectedValue;
        maxField.visible = !selectedValue;
        variableMin.visible = selectedValue;
        variableMax.visible = selectedValue;
    }
    return;
}

