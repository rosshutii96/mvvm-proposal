import { action, computed, makeObservable, observable } from 'mobx';
import type { DeviceModel } from '../models/Device';
import { BaseViewModel } from './base';

export class DeviceViewModel extends BaseViewModel<DeviceModel> {
    @observable
    public isDeleting: boolean = false;

    @observable
    public isUpdating: boolean = false;

    constructor(model: DeviceModel) {
        super(model);

        makeObservable(this);
    }

    @action
    public setIsDeleting(isDeleting: boolean): void {
        this.isDeleting = isDeleting;
    }

    @action
    public setIsUpdating(isUpdating: boolean): void {
        this.isUpdating = isUpdating;
    }

    @computed
    public get name(): string {
        return this.model.name;
    }

    @computed
    public get deviceId(): string {
        return this.model.deviceId;
    }

    @computed
    public get deviceType(): string {
        return this.model.deviceType;
    }

    @computed
    public get deviceModel(): string {
        return this.model.model;
    }
}
