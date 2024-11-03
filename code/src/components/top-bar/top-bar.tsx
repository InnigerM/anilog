import { View } from '@/lib/types';
import { cn } from '@/lib/utils';
import React from 'react';

type TopBarProps = {
    variant: View;
};
export default function TopBar({ variant }: TopBarProps) {
    return (
        <div
            id="top-bar"
            className={cn(
                'pl-16 pr-3 pb-5 pt-3 gap-2 text-lg fixed top-0 w-full transition-colors duration-300  text-white z-[1000]',
                variant === 'MAP' && 'bg-blossom-pink',
                variant === 'CAMERA' && 'bg-mint-green',
                variant === 'COLLECTION' && 'bg-hibiscus-orange',
                variant === 'PLANTS' && 'bg-hibiscus-orange',
            )}
        >
            <img src="/logo/logo-mini.svg" alt="" />
        </div>
    );
}
