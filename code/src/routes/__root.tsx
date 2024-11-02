import * as React from 'react';
import {
    Link,
    Outlet,
    createRootRoute,
    useRouterState,
} from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import '../index.css';
import Navigation from '@/components/navigation/navigation';
import { View } from '@/lib/types';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export const Route = createRootRoute({
    component: RootComponent,
});

function RootComponent() {
    const router = useRouterState();

    const view =
        router.location.pathname === '/'
            ? 'MAP'
            : (router.location.pathname
                  .replace(/^\/+/, '')
                  .toUpperCase() as View);

    return (
        <>
            <QueryClientProvider client={queryClient}>
                <Outlet />
                <Navigation variant={view} />
            </QueryClientProvider>
        </>
    );
}
