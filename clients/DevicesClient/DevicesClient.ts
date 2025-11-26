import { inject, injectable } from 'inversify';
import type { SmartFactoryApiClient } from '../apiClients/SmartFactoryApiClient';
import { Identifiers } from '../../container/idetrifiers';
import type { LoggerService } from '../../services/LoggerService';

import type { GetDevicesRequest, GetDevicesResponse } from './dto/getDevicesDTO';
import type { GetDeviceByIdRequest, GetDeviceByIdResponse } from './dto/getDevicesByIdDTO ';
import type { UpdateDeviceByIdRequest } from './dto/updateDevicesByIdDTO';

@injectable()
export class DevicesClient {
    constructor(
        @inject(Identifiers.apiClients.SmartFactoryApiClient)
        private readonly smartFactoryApiClient: SmartFactoryApiClient,

        @inject(Identifiers.services.LoggerService)
        private readonly loggerService: LoggerService,
    ) {}

    public async getDevices(request: GetDevicesRequest): Promise<GetDevicesResponse> {
        this.loggerService.logRequest('getDevices');

        const response = await this.smartFactoryApiClient.get<GetDevicesRequest, GetDevicesResponse>(
            'v1/devices',
            request,
        );

        this.loggerService.logSuccess('getDevices');
        return response;
    }

    public async getDeviceById(request: GetDeviceByIdRequest): Promise<GetDeviceByIdResponse> {
        this.loggerService.logRequest('getDeviceById');

        const response = await this.smartFactoryApiClient.get<GetDeviceByIdRequest, GetDeviceByIdResponse>(
            `v1/devices/${request.deviceId}`,
            request,
        );

        this.loggerService.logSuccess('getDeviceById');
        return response;
    }

    public async updateDeviceById(request: UpdateDeviceByIdRequest): Promise<GetDeviceByIdResponse> {
        this.loggerService.logRequest('updateDeviceById');

        const response = await this.smartFactoryApiClient.post<UpdateDeviceByIdRequest, GetDeviceByIdResponse>(
            `v1/devices/${request.deviceId}`,
            request,
        );

        this.loggerService.logSuccess('updateDeviceById');
        return response;
    }
}
