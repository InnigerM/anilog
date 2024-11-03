import { MapContainer, TileLayer } from 'react-leaflet';
import { AreasOfInterest, Collections, LocationMarker } from '@/components/map';
import { Suspense, useState } from 'react';
import { MapToggle } from '@/components/map/map-toggle';
import { Loading } from '@/components/loading';
import { getUserFromLocalStorage } from '@/lib/utils';
import { useSuspenseQuery } from '@tanstack/react-query';
import { getUserByEmail } from '@/lib/api/user';

export function Map() {
    const localUser = getUserFromLocalStorage();
    // @ts-expect-error We know that users can only access this right logged in, thus the user object is defined
    const { data: user } = useSuspenseQuery(getUserByEmail(localUser.email));
    const [mapType, setMapType] = useState<'aoi' | 'collection'>('aoi');

    return (
        <div>
            <MapContainer
                className="h-[93vh] relative"
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
                    <Suspense fallback={<Loading />}>
                        <Collections user={user} />
                    </Suspense>
                ) : (
                    <Suspense fallback={<Loading />}>
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
