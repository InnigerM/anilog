import { Map } from '@/components/map';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/map')({
    component: MapComponent,
});

function MapComponent() {
    return <Map />;
}
