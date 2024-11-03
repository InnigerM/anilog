import { CollectionMarker } from '@/components/map/collection-marker';
import { getScansByUserId } from '@/lib/api/scans';
import { UserResponse } from '@/lib/api/user';
import { getUserFromLocalStorage } from '@/lib/utils';
import { useSuspenseQuery } from '@tanstack/react-query';

type CollectionsProps = {
    user: UserResponse;
};

export function Collections({ user }: CollectionsProps) {
    const {
        data: scans,
        isPending,
        isError,
    } = useSuspenseQuery(getScansByUserId(user.id));

    return (
        <div>
            {!isPending &&
                !isError &&
                scans &&
                scans.map((scan) => <CollectionMarker {...scan} />)}
        </div>
    );
}
