import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/plants/$plantId')({
    component: PlantDetailComponents,
});

function PlantDetailComponents() {
    const { plantId } = Route.useParams();
    return <div>Plant {plantId}</div>;
}
