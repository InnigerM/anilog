import { supabase } from '@/lib/utils';
import { USER_LOCAL_STORAGE_KEY } from './user';
import { getScansForUser, ScanResponse } from './scans';
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';

export const getLeaderboard = () =>
    queryOptions({
        queryKey: ['leaderboard'],
        queryFn: async () => {
            const { data } = await supabase
                .from('leaderboard')
                .select();

            return data ?? null;
        },
    });

export const updateLeaderboard = async (
    plantId: string,
    isNewPlant: boolean,
) => {
    const userString = localStorage.getItem(USER_LOCAL_STORAGE_KEY);
    if (!userString) {
        return;
    }
    const user = JSON.parse(userString);

    const isFirstScanForUser = isFirstScan(user.id, plantId);
    if (!isFirstScanForUser) {
        return;
    }

    const points = getPointsForPlant(plantId, isNewPlant);
    return updateLeaderboardDatabase(points);
};

const isFirstScan = (userId: number, plantId: string) => {
    const { data: userScans } = useSuspenseQuery(getScansForUser(userId));
    if (!userScans) {
        return true;
    }
    return userScans.some((scan) => scan.plantId === plantId);
};

const getPointsForPlant = (plantId: string, isNewPlant: boolean) => {
    switch (plantId) {
        case 'Camellia sinensis':
            return 10;
        case 'Cannabis':
        case 'Cannabis sativa':
        case 'Cannabis indica':
            return 420;
        default:
            return 50;
    }
};

const updateLeaderboardDatabase = async (pointsToAdd: number) => {
    const { data: leaderboard, error } = await supabase
        .from('leaderboard')
        .select()
        .single();
    if (error) {
        throw new Error(error.message);
    }

    const updatedLeaderboard = leaderboard;
    updatedLeaderboard.points = (leaderboard.points ?? 0) + pointsToAdd;

    const { data: savedData, error: saveError } = await supabase
        .from('leaderboard')
        .upsert(updatedLeaderboard)
        .select()
        .single();
    if (saveError) {
        throw new Error(saveError.message);
    }

    return savedData;
};
