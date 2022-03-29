export enum DeviceStatus {
  Online,
  Offline,
}

export interface Device {
  uid: number;
  vendor: string;
  createdAt: Date;
  status: DeviceStatus;
}
