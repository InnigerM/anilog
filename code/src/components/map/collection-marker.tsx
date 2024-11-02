import { Marker, Popup } from 'react-leaflet';
import { Button } from '@/components/ui/button';
import { H2 } from '@/components/ui/typography';
import { icon } from 'leaflet';

export function CollectionMarker({ lat, lng, name, id, category }: Collection) {
    function goToObject() {
        console.log(
            'TODO: implement navigation to object detail with id ' + id,
        );
    }

    const collectionIcon = icon({
        iconUrl: '/' + category + '.svg',
        iconSize: [40, 70],
        iconAnchor: [15, 50],
        popupAnchor: [5, -40],
    });

    return lat === null || lng === null ? null : (
        <Marker position={[lat, lng]} icon={collectionIcon}>
            <Popup>
                <H2>{name}</H2>
                <Button onClick={goToObject}>View in collection</Button>
            </Popup>
        </Marker>
    );
}
