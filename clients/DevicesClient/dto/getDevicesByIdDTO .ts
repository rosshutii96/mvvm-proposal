import type { DeviceModel } from '@src/models/Device';

export type GetDeviceByIdRequest = {
    deviceId: string;
};

export type GetDeviceByIdResponse = {
    device: DeviceModel;
};
