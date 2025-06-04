export interface OrgNode {
    id: number;
    name: string;
    children?: OrgNode[];
    [key: string]: any;
}