import NewPlantFoundDialog from '@/components/plant-detail/new-plant-found-dialog';
import PlantDetail from '@/components/plant-detail/plant-detail';
import { createFileRoute } from '@tanstack/react-router';
import { Suspense } from 'react';
import { z } from 'zod';
interface SearchParams {
    isNew?: boolean; // or boolean if it's a true/false value
}

export const Route = createFileRoute('/plants/$plantId')({
    component: PlantDetailComponents,
});

function PlantDetailComponents() {
    const { plantId } = Route.useParams();
    const { isNew } = Route.useSearch<SearchParams>();

    return (
        <>
            {isNew && <NewPlantFoundDialog />}

            <Suspense>
                <PlantDetail plantId={plantId} />
            </Suspense>
        </>
    );
}
