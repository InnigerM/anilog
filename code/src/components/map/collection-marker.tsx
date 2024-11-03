import { Marker, Popup } from 'react-leaflet';
import { Button } from '@/components/ui/button';
import { H2 } from '@/components/ui/typography';
import { icon } from 'leaflet';
import { Link } from '@tanstack/react-router';
import { ScannedPlant } from '@/lib/api/scans';

export function CollectionMarker({ location, plant }: ScannedPlant) {
    if (!location) return null;

    const collectionIcon = icon({
        iconUrl: '/' + plant.type + '.svg',
        iconSize: [25, 50],
        iconAnchor: [15, 50],
        popupAnchor: [5, -40],
    });

    return location?.lat === null || location?.lng === null ? null : (
        <Marker position={[location.lat, location.lng]} icon={collectionIcon}>
            <Popup>
                <H2>{plant.name_common}</H2>
                <Button>
                    <Link to="/plants/$plantId" params={{ plantId: plant.id }}>
                        View in collection
                    </Link>
                </Button>
            </Popup>
        </Marker>
    );
}
