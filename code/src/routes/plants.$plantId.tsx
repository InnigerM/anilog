import PlantDetail from '@/components/plant-detail/plant-detail';
import { getPlantById } from '@/lib/api/plant';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { Suspense } from 'react';

export const Route = createFileRoute('/plants/$plantId')({
    component: PlantDetailComponents,
});

function PlantDetailComponents() {
    const { plantId } = Route.useParams();

    return (
        <Suspense>
            <PlantDetail plantId={plantId} />
        </Suspense>
    );
}
