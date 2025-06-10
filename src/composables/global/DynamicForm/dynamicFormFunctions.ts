import type {FieldSchema} from "@/interfaces/ecm-marfy/forms/DynamicFormField";
import axios from "axios";
import InputText from "primevue/inputtext";
import InputNumber from "primevue/inputnumber";
import DatePicker from "primevue/datepicker";
import Checkbox from "primevue/checkbox";
import Select from "primevue/select";
import MultiSelect from "primevue/multiselect";
import type {DynamicFormConstants} from "@/interfaces/ecm-marfy/forms/DynamicFormConstantsInterface";
import {useDynamicFieldChanges} from "@/composables/global/DynamicForm/dynamicFieldChanges";

export async function handleFieldChange(field: FieldSchema, event: any, constants: DynamicFormConstants) {
    let selectedValue = event.value;
    if (selectedValue === undefined && event?.target?.checked === undefined) return;
    const dynamicFieldChanges = useDynamicFieldChanges(constants);
    const selectedOption = constants.selectOptions[field.name]?.find(
        opt => opt.value === selectedValue
    );
    if (field.typeStr === 'checkbox' && event.value != true && event.target != undefined) {
        selectedValue = event.target.checked;
    }
    switch (field.name) {
        case 'TemplateId':
            dynamicFieldChanges.templateIdFieldUpdate()
            break;
        case 'CustomMessage':
            dynamicFieldChanges.customMessageFieldUpdate(selectedValue);
            break;
        case 'DeviceId':
            await dynamicFieldChanges.deviceIdFieldUpdate(getUnitDependentFields(constants.formModelName));
            break;
        case 'MinMaxVariable':
            dynamicFieldChanges.minMaxVariableFieldUpdate(selectedValue);
            break;
        case 'MeasurementId':
            await dynamicFieldChanges.measurementIdFieldUpdate(selectedOption.unitTypeId);
            break;
        case 'UnitId':
            dynamicFieldChanges.unitFieldUpdate();
            break;
        case "AutomaticRead":
            dynamicFieldChanges.automaticReadFieldUpdate(selectedValue);
            break;
        case "ManualWrite":
            dynamicFieldChanges.manualWriteFieldUpdate(selectedValue);
            break;
        case "Expression":
            dynamicFieldChanges.expressionFieldUpdate(selectedValue);
            break;
        case "UnitExpression":
            dynamicFieldChanges.unitExpressionFieldUpdate(selectedValue);
            break;
        case "Prediction":
            dynamicFieldChanges.predictionFieldChange(selectedValue);
            break;
        case "SpotPrices":
            dynamicFieldChanges.spotPricesFieldChange(selectedValue);
            break;
    }
}

const optionsCache = new Map();

export function resetOptionsCache() {
    optionsCache.clear();
}

export async function getOptions(endpoint: string | undefined, fieldName: string, constants: DynamicFormConstants, parameters?: string[],) {
    if (!endpoint) return;
    let finalEndpoint = endpoint;
    if (parameters && parameters.length) {
        for (const param of parameters) {
            let value = constants.formData[param];
            if (!value) {
                value = getValueFromParam(param, constants);
            }
            finalEndpoint = finalEndpoint.replace(`{${param}}`, value ?? '');
            if (value == null || value == '') {
                return;
            }
        }
    }

    if (optionsCache.has(finalEndpoint)) {
        constants.selectOptions[fieldName] = optionsCache.get(finalEndpoint);
        return;
    }

    const response = await axios.get(`${import.meta.env.VITE_API_URL}${finalEndpoint}`);
    const options = response.data.map((item: { id: any; name: string, unitTypeId: number | null }) => ({
        label: item.name,
        value: item.id,
        unitTypeId: item.unitTypeId ?? null
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
export function getComponent(type: string, endpoint?: string) {
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
export function parseDefaultValue(field: FieldSchema): any {
    const val = field.defaultValue;
    if (val === undefined || val === null) return undefined;
    switch (field.typeStr) {
        case 'number':
            return Number(val);
        case 'checkbox':
            return val === 'true';
        case 'date':
            return new Date(val);
        case 'text':
        default:
            return val;
    }
}
function getUnitDependentFields(modelName : string | undefined){
    switch (modelName) {
        case "AddDayPlanFormModel":
            return [
                'VariableValueId',
                'VariableTimeId',
                'VariableAttenuationId',
                'VariableAttenuationValueId',
                'VariableMin',
                'VariableMax',
            ];
        default:
            return ["VariableId"];
    }
}
export function handleSubmit(constants: DynamicFormConstants, emit: any) {
    emit('submit', constants.formData);
}

function getValueFromParam(param: string, constants: DynamicFormConstants) {
    switch (param) {
        case 'OrgId':
        case 'orgId':
            return constants.store.selectedOrgId;
        case 'deviceId':
            return constants.formData.DeviceId;
        case 'measurementId':
            return constants.formData.MeasurementId;
    }
}
