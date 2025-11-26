import type { DeviceModel } from "@src/models/Device";
import type { PaginationParams } from "@src/types/pagination";

export type GetDevicesRequest = PaginationParams;

export type GetDevicesResponse = {
  devices: DeviceModel[];
};
