import FramedImage from '@/components/ui/framedImage';
import { getScansForUser } from '@/lib/api/scans';
import { getUserFromLocalStorage } from '@/lib/utils';
import { useSuspenseQueries, useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute, linkOptions } from '@tanstack/react-router';
import { Suspense, useEffect, useState } from 'react';

export const Route = createFileRoute('/collection')({
    component: CollectionComponent,
});

function CollectionComponent() {
    document.body.style.backgroundColor = '#FFEDE8';

    const user = getUserFromLocalStorage();
    const { data: scans } = useSuspenseQuery(getScansForUser(user!.id));

    return (
        <div className="pt-20 pb-40 px-8">
            <div className="grid grid-cols-2 gap-8">
                <Suspense>
                    {scans && scans.length > 0 ? (
                        scans
                            .filter(
                                (scan, index, self) =>
                                    index ===
                                    self.findIndex(
                                        (s) => s.plantId === scan.plantId,
                                    ),
                            )
                            .map((ooi) => (
                                <div
                                    key={ooi.plantId}
                                    className="flex flex-col justify-center"
                                >
                                    <FramedImage
                                        imgUrl={ooi.imageUrl}
                                        linkOptions={linkOptions({
                                            to: '/plants/$plantId',
                                            params: {
                                                plantId: ooi.plantId,
                                            },
                                        })}
                                    />
                                    <span className="mt-4 text-center text-hibiscus-orange">
                                        {ooi.plants?.name_common}
                                    </span>
                                </div>
                            ))
                    ) : (
                        <p className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-hibiscus-orange">
                            No plants scanned yet... {`:)`}
                        </p>
                    )}
                </Suspense>
            </div>
        </div>
    );
}
