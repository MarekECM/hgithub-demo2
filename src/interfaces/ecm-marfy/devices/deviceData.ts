export interface DeviceData {
  id?: number; 
  name: string;
  nodeID: number;
  nodeName: string;
  lastValue: string;
  unit: string;
  manualUnit: string;
  lastInsert: string;
  elementName: string;
  timerID: number;
  timerSeconds: number;
  defaultElementID: number;
  deviceType: {
    oid: number;
    name: string;
    description: string | null;
  };
}

export interface ApiResponse {
  data: DeviceData[];
  status: number;
  statusText: string;
  headers: Record<string, string>;
  config: any;
  request: any;
}