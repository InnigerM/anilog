import React from 'react';
import { Link, useRouterState } from '@tanstack/react-router';
import { View } from '@/lib/types';
import { cn } from '@/lib/utils';
import '../../index.css';
import { useCamera } from '@/lib/providers/camera-provider';

type NavigationProps = {
    variant: View;
};
export default function Navigation({ variant }: NavigationProps) {
    const router = useRouterState();
    const { takeScreenshot } = useCamera();

    const handleScreenshot = async () => {
        if (takeScreenshot) await takeScreenshot();
    };

    return (
        <nav
            className={cn(
                'px-5 pb-5 pt-10 flex gap-2 text-lg fixed bottom-0 w-full justify-around transition-colors duration-300 bg-gray-800 text-white z-[1000]',
                variant === 'MAP' && 'bg-blossom-pink',
                variant === 'CAMERA' && 'bg-mint-green',
                variant === 'COLLECTION' && 'bg-hibiscus-orange',
            )}
        >
            <Link to="/">
                <i className="icon-map text-3xl" />
            </Link>
            {router.location.pathname === '/camera' ? (
                <i
                    onClick={handleScreenshot}
                    className="icon-shutter text-3xl cursor-pointer"
                />
            ) : (
                <Link to="/camera">
                    <i className="icon-camera text-3xl" />
                </Link>
            )}
            <Link to="/collection" activeOptions={{ exact: true }}>
                <i className="icon-plant text-3xl" />
            </Link>
        </nav>
    );
}
