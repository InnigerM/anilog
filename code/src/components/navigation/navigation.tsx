import React from 'react';
import { Link, Outlet, createRootRoute } from '@tanstack/react-router';

export default function Navigation() {
    return (
        <nav className="p-2 flex gap-2 text-lg fixed bottom-0 w-full justify-around">
            <Link
                to="/"
                activeProps={{
                    className: 'font-bold',
                }}
            >
                Map
            </Link>
            <Link
                to="/camera"
                activeProps={{
                    className: 'font-bold',
                }}
            >
                Camera
            </Link>{' '}
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
