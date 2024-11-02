import React from 'react';
import { Link, useRouterState } from '@tanstack/react-router';
import { Button } from '../ui/button';
import { View } from '@/lib/types';
import { cn } from '@/lib/utils';
import '../../index.css';

type NavigationProps = {
    variant: View;
};
export default function Navigation({ variant }: NavigationProps) {
    const router = useRouterState();

    return (
        <nav
            className={cn(
                'px-5 pb-5 pt-10  flex gap-2 text-lg fixed bottom-0 w-full justify-evenly bg-gray-800 text-white z-[1000]',
                variant === 'MAP' && 'bg-blossom-pink',
                variant === 'CAMERA' && 'bg-mint-green',
                variant === 'COLLECTION' && 'bg-hibiscus-orange',
            )}
        >
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
