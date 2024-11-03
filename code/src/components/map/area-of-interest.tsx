import { LatLngExpression } from 'leaflet';
import { Circle } from 'react-leaflet';

type AreaOfInterestProps = {
    position: LatLngExpression;
    color?: string;
};

export function AreaOfInterest({
    position,
    color = '#abcd12',
}: AreaOfInterestProps) {
    return (
        <>
            <Circle center={position} radius={500} color={color} />
        </>
    );
}
