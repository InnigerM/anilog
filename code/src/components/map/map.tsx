import { MapContainer, TileLayer } from 'react-leaflet';
import {
    AreaOfInterest,
    AreasOfInterest,
    LocationMarker,
} from '@/components/map';
import React, { Suspense, useState } from 'react';
import { Collections } from '@/components/map/collections';
import { MapToggle } from '@/components/map/map-toggle';

export function Map() {
    const [mapType, setMapType] = useState<'aoi' | 'collection'>('aoi');

    const collections: Collection[] = [
        {
            id: 0,
            name: 'Eiche',
            lat: 47.54676,
            lng: 7.598758,
            category: 'tree'
        },
        {
            id: 1,
            name: 'Sonnenblume',
            lat: 47.547878,
            lng: 7.595827,
            category: 'flower'
        },
        {
            id: 2,
            name: 'Monstera',
            lat: 47.547578,
            lng: 7.593327,
            category: 'plant'
        },
        {
            id: 3,
            name: 'Buche',
            lat: 47.52676,
            lng: 7.598758,
            category: 'tree'
        },
        {
            id: 4,
            name: 'Gänseblümchen',
            lat: 47.547878,
            lng: 7.599827,
            category: 'flower'
        },
        {
            id: 5,
            name: 'Goldfruchtpalme',
            lat: 47.537578,
            lng: 7.593327,
            category: 'plant'
        },
        {
            id: 6,
            name: 'Ahorn',
            lat: 47.54676,
            lng: 7.598758,
            category: 'tree'
        },
        {
            id: 7,
            name: 'Löwenzahn',
            lat: 47.541878,
            lng: 7.595827,
            category: 'flower'
        },
        {
            id: 8,
            name: 'Strelizie',
            lat: 47.547578,
            lng: 7.563327,
            category: 'plant'
        },
        {
            id: 9,
            name: 'Seerose',
            lat: 47.556173,
            lng: 7.598185,
            category: 'flower'
        }
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
                ) : (
                    <Suspense>
                        <AreasOfInterest />
                    </Suspense>
                )}
            </MapContainer>
            <MapToggle
                mapType={mapType}
                setMapType={(value) => setMapType(value)}
            />
        </div>
    );
}
