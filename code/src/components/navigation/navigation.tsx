import React from 'react';
import {
    Link,
    Outlet,
    createRootRoute,
    useRouterState,
} from '@tanstack/react-router';
import { Button } from '../ui/button';

export default function Navigation() {
    const router = useRouterState();

    return (
        <nav className="p-2 flex gap-2 text-lg fixed bottom-0 w-full justify-evenly bg-gray-800 text-white z-50">
            <Link
                to="/"
                activeProps={{
                    className: 'font-bold',
                }}
            >
                Map
            </Link>
            {router.location.pathname === '/camera' ? (
                <Button onClick={() => console.log('picture taken!')}>
                    Take Pic
                </Button>
            ) : (
                <Link
                    to="/camera"
                    activeProps={{
                        className: 'font-bold',
                    }}
                >
                    Camera
                </Link>
            )}
            <Link
                to="/collection"
                activeProps={{
                    className: 'font-bold',
                }}
                activeOptions={{ exact: true }}
            >
                Collection
            </Link>
        </nav>
    );
}
