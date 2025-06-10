export interface FieldSchema {
    name: string;
    label: string;
    typeStr: string;
    required: boolean;
    placeHolder: string;
    selectEndpoint: string;
    visible? : boolean;
    defaultValue? : string,
    endpointParameters?: string[];
    validation: {
        email: boolean;
        range: { minimum: number; maximum: number } | null;
        minLength: number | null;
        maxLength: number | null;
        ignore: boolean;
    };
}