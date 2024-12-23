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
                'px-3 pb-3 pt-6 flex gap-2 text-lg fixed bottom-0 w-full justify-around transition-colors duration-300  text-white z-[1000]',
                variant === 'MAP' && 'bg-blossom-pink',
                variant === 'CAMERA' && 'bg-mint-green',
                variant === 'COLLECTION' && 'bg-hibiscus-orange',
                variant === 'PLANTS' && 'bg-hibiscus-orange',
                variant === 'REGISTRATION' && 'bg-cornflower-blue',
                variant === 'LEADERBOARD' && 'bg-balloon-flower-purple',
            )}
        >
            {variant !== 'REGISTRATION' && variant !== 'SPLASH' && (
                <>
                    <Link to="/">
                        <i className="icon-map text-4xl text-honeysuckle-yellow" />
                        {router.location.pathname === '/map' && (
                            <img src="/img/underline.svg" alt="" />
                        )}
                    </Link>
                    {router.location.pathname === '/camera' ? (
                        <div>
                            <i
                                onClick={handleScreenshot}
                                className="icon-shutter text-4xl  text-honeysuckle-yellow cursor-pointer"
                            />
                            <img
                                src="/img/underline.svg"
                                className="opacity-0"
                                alt=""
                            />
                        </div>
                    ) : (
                        <Link to="/camera">
                            <i className="icon-camera text-4xl text-honeysuckle-yellow" />
                        </Link>
                    )}
                    <Link to="/collection" activeOptions={{ exact: true }}>
                        <i className="icon-little-plant text-4xl text-honeysuckle-yellow" />
                        {(router.location.pathname === '/collection' ||
                            router.location.pathname.startsWith(
                                '/plants/',
                            )) && <img src="/img/underline.svg" alt="" />}
                    </Link>
                    {router.location.pathname !== '/camera' ? (
                        <Link to="/leaderboard" activeOptions={{ exact: true }}>
                            <i className="icon-leaderboard text-4xl text-honeysuckle-yellow" />
                            {router.location.pathname === '/leaderboard' && (
                                <img src="/img/underline.svg" alt="" />
                            )}
                        </Link>
                    ) : (
                        ''
                    )}
                </>
            )}
        </nav>
    );
}
