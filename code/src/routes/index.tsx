import * as React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { Map } from '@/components/map';

export const Route = createFileRoute('/')({
    component: RouteComponent,
});

function RouteComponent() {
    return <Map />;
}
