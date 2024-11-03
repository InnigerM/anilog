import { Marker, Popup, useMapEvents } from 'react-leaflet';
import { useEffect, useState } from 'react';
import { icon, LatLng } from 'leaflet';

export function LocationMarker() {
    const [position, setPosition] = useState<LatLng>();

    const map = useMapEvents({
        locationfound(e) {
            console.log(e);
            setPosition(e.latlng);
            map.flyTo(e.latlng, map.getZoom());
        },
    });

    const locationMarker = icon({
        iconUrl: '/LocationMarker.png',
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        popupAnchor: [0, -45],
    });

    useEffect(() => {
        if (map) {
            map.locate();
        }
    }, []);

    return !position ? (
        <div className="absolute text-blossom-pink top-20 left-0 right-0 z-[1000] flex items-center justify-center">
            <span>Loading your location...</span>
        </div>
    ) : (
        <Marker position={position} icon={locationMarker}>
            <Popup>You are here</Popup>
        </Marker>
    );
}
