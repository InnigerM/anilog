import { CollectionMarker } from '@/components/map';
import React from 'react';
import { LeaderboardEntry } from 'model/leaderboard-entry.model';
import { H1 } from '@/components/ui/typography';

export function Leaderboard() {
    const test: LeaderboardEntry[] = [
        {
            username: 'Hans',
            points: 120,
        },
        {
            username: 'Fritz',
            points: 370,
        },
    ];

    return (
        <div className="mt-24 pb-40 overflow-scroll">
            <H1 className="mx-8 mb-4">Anilog Ranking</H1>
            {test
                .sort((a, b) => b.points - a.points)
                .map((entry: LeaderboardEntry, index: number) => (
                <div className="leaderboard-entry-box bg-balloon-flower-purple-light mx-8 my-2 p-1">
                    <div className="leaderboard-entry-box bg-peach-cream flex justify-between p-4">
                        <div>
                            <span className="font-extrabold text-balloon-flower-purple mr-2">
                                { index + 1 }.
                            </span>{' '}
                            {entry.username}
                        </div>
                        <div>{entry.points}</div>
                    </div>
                </div>
            ))}
        </div>
    );
}
