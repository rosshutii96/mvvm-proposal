import type { DeviceModel } from '@src/models/Device';

export type UpdateDeviceByIdRequest = Partial<DeviceModel> & {
    deviceId: string;
}

export type UpdateDeviceByIdResponse = {
    device: DeviceModel;
};
