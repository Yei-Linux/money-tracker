import { getCorrectDevice } from '@moneytrack/web/lib/dom';
import { TDevices } from '@moneytrack/web/types/@shared/dimensions';
import { useEffect, useState } from 'react';

const getWidthSite = () => document?.documentElement?.clientWidth;

export const useDimensions = () => {
  const [device, setDevice] = useState<TDevices>('desktop');

  const handleEvent = () => {
    const width = getWidthSite();
    const deviceRecognized = getCorrectDevice(width);
    setDevice(deviceRecognized);
  };

  useEffect(() => {
    window.addEventListener('resize', handleEvent);

    return () => window.removeEventListener('resize', handleEvent);
  }, []);

  useEffect(() => {
    handleEvent();
  }, []);

  return { device };
};
