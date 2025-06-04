export interface AlarmFormModel {
    Id: number,
    Name: string,
    NodeId: number,
    TemplateId: number,
    GroupIds: number[],
    CustomMessage: boolean,
    MessageSubject: string,
    Message: string,
}