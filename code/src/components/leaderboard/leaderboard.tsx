import React from 'react';
import { H1 } from '@/components/ui/typography';
import { getUserFromLocalStorage } from '@/lib/utils';
import { useSuspenseQuery } from '@tanstack/react-query';
import { getLeaderboard } from '@/lib/api/leaderboard';

export function Leaderboard() {
    const user = getUserFromLocalStorage();
    const { data: leaderboard } = useSuspenseQuery(getLeaderboard());

    return leaderboard ? (
        <div className="pt-24 pb-40 overflow-scroll bg-peach-cream h-screen">
            <H1 className="mx-8 mb-4">Anilog Ranking</H1>
            {leaderboard
                .sort((a, b) =>
                    ((typeof b.points === 'number' && typeof a.points === 'number') ? (b.points - a.points) : 0),
                )
                .map((entry, index: number) => (
                    <div
                        key={entry.user_id}
                        className="leaderboard-entry-box bg-balloon-flower-purple-light mx-8 my-2 p-1"
                    >
                        <div
                            className={
                                (user?.id === entry.user_id
                                    ? 'bg-balloon-flower-purple-light text-white'
                                    : 'bg-peach-cream text-black') +
                                ' leaderboard-entry-box flex justify-between p-4'
                            }
                        >
                            <div>
                                <span
                                    className={
                                        'font-extrabold text-balloon-flower-purple mr-2'
                                    }
                                >
                                    {index + 1}.
                                </span>{' '}
                                {entry.user_name}
                            </div>
                            <div>{entry.points}</div>
                        </div>
                    </div>
                ))}
        </div>
    ) : (
        <div>Leaderboard is empty.</div>
    );
}
