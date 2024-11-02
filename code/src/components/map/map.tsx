import { MapContainer, TileLayer } from 'react-leaflet';
import {
    AreaOfInterest,
    Collections,
    LocationMarker,
    MapToggle,
} from '@/components/map';
import React, { useState } from 'react';

export function Map() {
    const [mapType, setMapType] = useState<'aoi' | 'collection'>('aoi');

    const collections = [
        {
            id: 0,
            name: 'Sonnenblume',
            lat: 47.54676,
            lng: 7.598758,
        },
        {
            id: 1,
            name: 'Fette Henne',
            lat: 47.547878,
            lng: 7.595827,
        },
    ];

    return (
        <div>
            <MapContainer
                className="h-[90vh] relative"
                center={[47.5601333, 7.5879957]}
                zoom={15}
                scrollWheelZoom={false}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
                />
                <LocationMarker />
                {mapType === 'collection' ? (
                    <Collections collections={collections} />
                ) : null}
                <div>
                    <AreaOfInterest position={[47.5483177, 7.5784675]} />
                </div>
            </MapContainer>
            <MapToggle
                mapType={mapType}
                setMapType={(value) => setMapType(value)}
            />
        </div>
    );
}
