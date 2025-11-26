import { inject, injectable } from 'inversify';
import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import { Identifiers } from '../container/idetrifiers';
import type { LoggerService } from '../services/LoggerService';
import type { DevicesClient } from '@src/clients/DevicesClient/DevicesClient';
import { DeviceViewModel } from '@src/viewModels/DeviceViewModel';

@injectable()
export class DevicesStore {
    @observable
    public isInitialized: boolean = false;

    @observable
    public hasMore: boolean = false;

    @observable
    private devicesMap: Map<string, DeviceViewModel> = new Map();

    @observable
    public selectedDevice: DeviceViewModel | null = null;

    constructor(
        @inject(Identifiers.services.LoggerService)
        private readonly loggerService: LoggerService,

        @inject(Identifiers.clients.DevicesClient)
        private readonly devicesClient: DevicesClient,
    ) {
        makeObservable(this);
    }

    @computed
    public get devices(): DeviceViewModel[] {
        return Array.from(this.devicesMap.values());
    }

    @action
    public selectDevice(device: DeviceViewModel | null) {
        this.selectedDevice = device;
    }

    @action
    public async initialize() {
        if (this.isInitialized) {
            return;
        }

        await this.fetchDevices({ pageNumber: 1, pageSize: 20 });

        runInAction(() => {
            this.isInitialized = true;
        });
    }

    @action
    public fetchDevices = async ({ pageNumber, pageSize }: { pageNumber: number; pageSize: number }) => {
        try {
            const response = await this.devicesClient.getDevices({
                orderBy: 'asc',
                pageNumber: pageNumber,
                pageSize: pageSize,
            });

            runInAction(() => {
                response.devices.forEach((device) => {
                    this.devicesMap.set(device.deviceId, new DeviceViewModel(device));
                });

                this.hasMore = response.devices.length === pageSize;
            });
        } catch (error: unknown) {
            // show alert

            this.loggerService.logError('Failed to fetch devices', error);
        }
    };

    @action
    public fetchDevicesByID = async (deviceId: string) => {
        try {
            const response = await this.devicesClient.getDeviceById({
                deviceId: deviceId,
            });

            runInAction(() => {
                this.devicesMap.set(response.device.deviceId, new DeviceViewModel(response.device));
            });
        } catch (error: unknown) {
            this.loggerService.logError('Failed to fetch device', error);
        }
    };

    @action
    public updateDevicesName = async (device: DeviceViewModel, newName: string) => {
        try {
            device.setIsUpdating(true);
            device.optimisticUpdate({ name: newName });

            const response = await this.devicesClient.updateDeviceById({
                deviceId: device.deviceId,
                name: newName,
            });

            runInAction(() => {
                device.updateViewModel(response.device);
            });
        } catch (error: unknown) {
            device.revertOptimisticUpdate();
            this.loggerService.logError('Failed to update device', error);
        } finally {
            device.setIsUpdating(false);
        }
    };
}

// TODO add provider
// export const deviceStoreProvider = storeProvider(DevicesStore, ({ devicesStore }) => ({ devicesStore }));
