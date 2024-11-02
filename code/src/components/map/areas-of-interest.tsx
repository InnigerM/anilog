import { AreaOfInterest } from '@/components/map/area-of-interest';
import { getAreasOfInterest } from '@/lib/api/points-of-interest';
import { useSuspenseQuery } from '@tanstack/react-query';

export function AreasOfInterest() {
    const { data: areas } = useSuspenseQuery(getAreasOfInterest());

    return (
        <div>
            {areas &&
                areas.map((area) => (
                    <AreaOfInterest
                        key={area.name}
                        position={area.center.coordinates}
                        color={area.color ?? undefined}
                    />
                ))}
        </div>
    );
}
