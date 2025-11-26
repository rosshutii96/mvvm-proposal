import type { DevicesStore } from '@src/stores/DevicesStore';
import { observer } from 'mobx-react';
import { useEffect } from 'react';

type DevicesScreenProps = {
    devicesStore: DevicesStore;
};

const DevicesScreenComponent: React.FC<DevicesScreenProps> = ({ devicesStore }) => {
    useEffect(() => {
        devicesStore.initialize();
    }, []);

    return (
        <div data-loader={!devicesStore.isInitialized}>
            {devicesStore.devices.map((device) => (
                <div key={device.deviceId}>
                    <h3 style={{ color: device.isDraft ? 'gray' : 'black' }}>{device.name}</h3>
                    <button onClick={() => devicesStore.selectDevice(device)}>Select</button>
                    <button
                        onClick={() => devicesStore.updateDevicesName(device, 'newName')}
                        disabled={device.isUpdating}>
                        Update Name
                    </button>
                </div>
            ))}
        </div>
    );
};

// Add store provider
export const DevicesScreen = observer(DevicesScreenComponent);
