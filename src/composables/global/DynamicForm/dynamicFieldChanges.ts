import type {DynamicFormConstants} from "@/interfaces/ecm-marfy/forms/DynamicFormConstantsInterface";
import {getOptions} from "@/composables/global/DynamicForm/dynamicFormFunctions";

export function showFields(constants: DynamicFormConstants, fieldNames: string[], value: boolean) {
    for (const fieldName of fieldNames) {
        const field = constants.schemaWithKeys.value.find(f => f.name === fieldName);
        if (field) {
            field.visible = value;
            console.log(field);
        }
    }
}
export function useDynamicFieldChanges(constants: DynamicFormConstants) {
    function automaticReadFieldUpdate(selectedValue: boolean){
        if(constants.formModelName == "AddMeasurementFormModel") {
            showFields(constants, ["Expression", "DeviceId", "VariableId", "ManualWrite", "DeviceUnitId", "UnitExpression"], selectedValue);
            showFields(constants, ["ManualWriteUnitId"], !selectedValue);
            constants.formData["ManualWrite"] = !selectedValue;
        }
    }
    function manualWriteFieldUpdate(selectedValue: boolean){
        if(constants.formModelName == "AddMeasurementFormModel") {
            showFields(constants, ["ManualWriteUnitId"], selectedValue);
        }
    }
    function unitFieldUpdate(){
        if(constants.formModelName == "AddMeasurementFormModel") {
            showFields(constants, ["DynamicChangeUnit", "ManualWriteUnitId"], true);
        }
    }

    function expressionFieldUpdate(selectedValue: boolean){
        showFields(constants, ["ExpressionValue"], selectedValue);
        showFields(constants, ["DeviceId", "VariableId"], !selectedValue);
    }
    function unitExpressionFieldUpdate(selectedValue: boolean){
        showFields(constants, ["UnitExpressionValue"], selectedValue);
        showFields(constants, ["DeviceUnitId"], !selectedValue);
    }
    
    function templateIdFieldUpdate(){
        showFields(constants, ["GroupIds"], true);
    }
    
    function customMessageFieldUpdate(selectedValue: boolean){
        showFields(constants, ["MessageSubject","Message"], selectedValue);
    }
    
    function minMaxVariableFieldUpdate(selectedValue: boolean){
        showFields(constants, ["VariableMin","VariableMax"], selectedValue);
        showFields(constants, ["MinValue","MaxValue"], !selectedValue);
    }
    
    async function measurementIdFieldUpdate(unitTypeId : number){
        const endpoint = unitTypeId == 1 ? "Form/GetMeasurementUnits/{measurementId}" : null;
        if(endpoint != null) {
            const unitFields = ["UnitId", "ManualWriteUnitId", "DeviceUnitId"];
            for (const fieldName of unitFields) {
                await getOptions(endpoint, fieldName, constants, ['measurementId']);
            }
        }
        
        const allFields = [
            'UnitId',
            'PercentFormatId',
            'CurrencyId',
        ]
        const dependentFields = getMeasurementUnitsDependedField(unitTypeId);
        showFields(constants, allFields, false);
        showFields(constants, dependentFields, true);
    }
    
    async function deviceIdFieldUpdate(dependentFields: string[]){
        const endpoint = "Form/GetVariablesFromDevice/{deviceId}";

        for (const fieldName of dependentFields) {
            await getOptions(endpoint, fieldName, constants, ['deviceId']);
        }
    }
    
    function predictionFieldChange(selectedValue: boolean){
        showFields(constants, ["PredictionModeId","PredictionPeriodId"], selectedValue);
    }
    
    function spotPricesFieldChange(selectedValue: boolean){
        showFields(constants, ["SpotPricesGraphTypeId"], selectedValue);
    }
    
    
    return {
        unitFieldUpdate,
        expressionFieldUpdate,
        unitExpressionFieldUpdate,
        automaticReadFieldUpdate,
        manualWriteFieldUpdate,
        templateIdFieldUpdate,
        customMessageFieldUpdate,
        minMaxVariableFieldUpdate,
        measurementIdFieldUpdate,
        deviceIdFieldUpdate,
        predictionFieldChange,
        spotPricesFieldChange,
    };
}


function getMeasurementUnitsDependedField(unitTypeId: number) {
    switch (unitTypeId) {
        case 0:
            return [];
        case 2:
            return ['PercentFormatId']
        case 3:
            return ['CurrencyId',];
        default:
            return [
                'UnitId',
            ];
    }
}
