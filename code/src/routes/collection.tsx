import FramedImage from '@/components/ui/framedImage';
import { getScansForUser } from '@/lib/api/scans';
import { getUserFromLocalStorage } from '@/lib/utils';
import { useSuspenseQueries, useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute, linkOptions } from '@tanstack/react-router';
import { Suspense, useEffect, useState } from 'react';
import { H1, H2 } from '@/components/ui/typography';

export const Route = createFileRoute('/collection')({
    component: CollectionComponent
});

function CollectionComponent() {
    const user = getUserFromLocalStorage();
    const { data: scans } = useSuspenseQuery(getScansForUser(user!.id));

    document.body.style.backgroundColor = '#FFEDE8';

    return (
        <div className="pt-24 pb-32 px-8 flex flex-col max-w-[500px] mx-auto">
            <H1 className="mb-4">{scans?.length ? `Your Collection: ${scans.length}🪴` : 'No 🪴 collected yet'}</H1>
            <div className="grid grid-cols-2 gap-1">
                <Suspense>
                    {scans &&
                        scans.length > 0 && (
                            <>
                            <div className="gap-8 flex flex-col">
                                {scans?.filter((_, i) => i % 2 === 0).map((ooi, index) => {
                                    return (
                                        <div className="flex flex-col">
                                            <FramedImage
                                                imgUrl={ooi.imageUrl}
                                                linkOptions={linkOptions({
                                                    to: '/plants/$plantId',
                                                    params: {
                                                        plantId: ooi.plantId
                                                    }
                                                })}
                                            />
                                            <span className="mt-2 text-center text-hibiscus-orange">
                                                {ooi.plants?.name_common}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                            <div className="gap-8 flex flex-col mt-14">
                                {scans?.filter((_, i) => i % 2 === 1).map((ooi, index) => {
                                    return (
                                        <div className="flex flex-col">
                                            <FramedImage
                                                imgUrl={ooi.imageUrl}
                                                linkOptions={linkOptions({
                                                    to: '/plants/$plantId',
                                                    params: {
                                                        plantId: ooi.plantId
                                                    }
                                                })}
                                            />
                                            <span className="mt-2 text-center text-hibiscus-orange">
                                                {ooi.plants?.name_common}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                            </>
                        )
                    }
                    {(!scans || scans.length === 0) && (
                        <p className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-hibiscus-orange">
                            No plants scanned yet... {`:)`}
                        </p>
                    )}
                </Suspense>
            </div>
        </div>
    );
}
