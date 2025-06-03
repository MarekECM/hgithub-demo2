export interface DayPlanModel {
    Id: number;
    Name: string;
    DeviceId: number;
    DayPlanTypeId: number;
    UnitId: number;
    NodeId: number;
    MinValue: number;
    MaxValue: number;
    MinMaxVariable: boolean;
    VariableMax: number;
    VariableMin: number;
    VariableValueId: number;
    VariableTimeId: number;
    VariableAttenuationId: number;
    VariableAttenuationValueId: number;
}