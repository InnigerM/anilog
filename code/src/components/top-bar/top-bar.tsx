import { View } from '@/lib/types';
import { cn } from '@/lib/utils';
import React from 'react';
import {H1} from "@/components/ui/typography";

type TopBarProps = {
    variant: View;
};
export default function TopBar({ variant }: TopBarProps) {
    return (
        <div
            id="top-bar"
            className={cn(
                'px-4 pb-5 pt-3 gap-2 text-lg fixed top-0 w-full transition-colors duration-300 text-white z-[1000]',
                variant === 'MAP' && 'bg-blossom-pink',
                variant === 'CAMERA' && 'bg-mint-green',
                variant === 'COLLECTION' && 'bg-hibiscus-orange',
                variant === 'PLANTS' && 'bg-hibiscus-orange',
                variant === 'LEADERBOARD' && 'bg-balloon-flower-purple',
            )}
        >
            <div className="absolute left-4">
                <img src="/logo/logo-mini.svg" alt="" />
            </div>
            <H1 className="text-honeysuckle-yellow !mb-0 w-full text-center"><i className="icon-leaderboard mr-2"></i>Rank 5</H1>
        </div>
    );
}
