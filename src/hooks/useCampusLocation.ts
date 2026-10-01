import { useState } from 'react';
import { BASE_SHIP_FEE } from '../constants/student';

export const useCampusLocation = () => {
    const [status, setStatus] = useState<'idle' | 'granted' | 'denied' | 'blocked'>('idle');
    const [distanceKm, setDistanceKm] = useState<number | null>(null);
    const [shipFee, setShipFee] = useState<number | null>(null);

    const requestLocation = async () => {
        setStatus('granted');
        const mockKm = 1.2;
        setDistanceKm(mockKm);
        const fee = BASE_SHIP_FEE + Math.round(mockKm * 1500) + 2000;
        setShipFee(fee);
    };

    return { status, distanceKm, shipFee, requestLocation };
};