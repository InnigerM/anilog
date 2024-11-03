import { H2 } from '@/components/ui/typography';
import { LatLngExpression } from 'leaflet';
import { Circle, Popup } from 'react-leaflet';

type AreaOfInterestProps = {
    position: LatLngExpression;
    color?: string;
    radius?: number;
    hint?: string | null;
};

export function AreaOfInterest({
    position,
    color = '#abcd12',
    radius = 500,
    hint,
}: AreaOfInterestProps) {
    return (
        <>
            <Circle center={position} radius={radius} color={color}>
                {hint && (
                    <Popup>
                        <H2>Plant Family: {hint}</H2>
                    </Popup>
                )}
            </Circle>
        </>
    );
}
