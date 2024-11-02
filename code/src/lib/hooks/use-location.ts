import { LatLng } from 'leaflet';
import { useEffect, useState } from 'react';

export function useLocation() {
    const [location, setLocation] = useState<LatLng | null>(null);

    useEffect(() => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                console.log(position);
                if (position) {
                    setLocation(
                        new LatLng(
                            position.coords.latitude,
                            position.coords.longitude,
                        ),
                    );
                }
            });
        } else {
            console.log('no access to geolocation');
        }
    }, [navigator.geolocation]);

    return location;
}
