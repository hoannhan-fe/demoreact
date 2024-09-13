import { useEffect, useState } from 'react';

export function useDeviceUUID(): string {
  const [deviceUUID, setDeviceUUID] = useState<string>('');

  useEffect(() => {
    const deviceUUID = localStorage.getItem('DeviceUUID');
    if (!deviceUUID) {
      const newUUID = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
        /[xy]/g,
        function (c) {
          const r = (Math.random() * 16) | 0,
            v = c == 'x' ? r : (r & 0x3) | 0x8;
          return v.toString(16);
        },
      );
      localStorage.setItem('DeviceUUID', newUUID);
      setDeviceUUID(newUUID);
    } else {
      setDeviceUUID(deviceUUID);
    }
  }, []);

  return deviceUUID;
}
