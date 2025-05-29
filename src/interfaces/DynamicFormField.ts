export interface FieldSchema {
    name: string;
    label: string;
    typeStr: string;
    required: boolean;
    selectEndpoint: string;
    visible? : boolean;
    endpointParameters?: string[];
    validation: {
        email: boolean;
        range: { minimum: number; maximum: number } | null;
        minLength: number | null;
        maxLength: number | null;
        ignore: boolean;
    };
}