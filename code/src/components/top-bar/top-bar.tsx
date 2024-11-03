import { View } from '@/lib/types';
import { cn, getUserFromLocalStorage } from '@/lib/utils';
import React from 'react';
import { H1 } from '@/components/ui/typography';
import { useSuspenseQuery } from '@tanstack/react-query';
import { getLeaderboard } from '@/lib/api/leaderboard';

type TopBarProps = {
    variant: View;
};
export default function TopBar({ variant }: TopBarProps) {
    const user = getUserFromLocalStorage();
    const { data: leaderboard } = useSuspenseQuery(getLeaderboard());
    const myRank = leaderboard
        ? leaderboard
              .sort((a, b) =>
                  typeof b.points === 'number' && typeof a.points === 'number'
                      ? b.points - a.points
                      : 0,
              )
              .map((entry, index: number) => ({ ...entry, rank: index }))
              .find((entry) => entry.user_id === user?.id)
        : '';

    return (
        <div
            id="top-bar"
            className={cn(
                'px-4 pb-5 pt-3 gap-2 text-lg fixed top-0 w-full transition-colors duration-300 text-white z-[1000]',
                variant === 'MAP' && 'bg-blossom-pink',
                variant === 'CAMERA' && 'bg-mint-green',
                variant === 'COLLECTION' && 'bg-hibiscus-orange',
                variant === 'PLANTS' && 'bg-hibiscus-orange',
                variant === 'REGISTER' && 'bg-cornflower-blue',
                variant === 'LEADERBOARD' && 'bg-balloon-flower-purple',
            )}
        >
            <div className="absolute left-4">
                <img src="/logo/logo-mini.svg" alt="" />
            </div>

            <H1 className="text-honeysuckle-yellow !mb-0 w-full text-center">
                {myRank?.rank ? (
                    <span>
                        <i className="icon-leaderboard mr-2"></i>Rank{' '}
                        {myRank?.rank}
                    </span>
                ) : (
                    'Not ranked yet'
                )}
            </H1>
        </div>
    );
}
