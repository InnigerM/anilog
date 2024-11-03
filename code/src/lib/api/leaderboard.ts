import { supabase } from '@/lib/utils';
import { USER_LOCAL_STORAGE_KEY } from './user';
import { queryOptions } from '@tanstack/react-query';
import { ScanResponse } from './scans';

export const getLeaderboard = () =>
    queryOptions({
        queryKey: ['leaderboard'],
        queryFn: async () => {
            const { data } = await supabase.from('leaderboard').select();

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

    const points = await getPointsForPlant(plantId, user.id, isNewPlant);
    return updateLeaderboardDatabase(points, user);
};

const getScansForUser = async (userId: number): Promise<ScanResponse[]> => {
    const { data, error } = await supabase
        .from('scans')
        .select('*')
        .eq('userId', userId);

    if (error) {
        throw new Error('Error fetching scans');
    }

    return data;
};

const isFirstScan = async (
    userId: number,
    plantId: string,
): Promise<boolean> => {
    const userScans = await getScansForUser(userId);
    if (!userScans) {
        return true;
    }
    return !userScans.some((scan) => scan.plantId !== plantId);
};

const getPointsForPlant = async (
    plantId: string,
    userId: number,
    isNewPlant: boolean,
): Promise<number> => {
    if (isNewPlant) {
        return 100;
    }
    const isFirstScanForUser = await isFirstScan(userId, plantId);
    if (isFirstScanForUser) {
        if (plantId === 'camellia_sinensis') {
            return 418;
        }
        if (plantId === 'cannabis_sativa' || plantId === 'cannabis_indica') {
            return 420;
        }
        return 50;
    }

    return 0;
};

const updateLeaderboardDatabase = async (pointsToAdd: number, user: any) => {
    const { data: leaderboard, error } = await supabase
        .from('leaderboard')
        .select()
        .eq('user_id', user.id)
        .single();
    if (error) {
        throw new Error(error.message);
    }

    const updatedLeaderboard = leaderboard;
    updatedLeaderboard.points = (leaderboard.points ?? 0) + pointsToAdd;
    updatedLeaderboard.user_name = user['firstName'] ?? 'We are Anonymous';
    if (user['lastName']) {
        updatedLeaderboard.user_name += ` ${user['lastName']}`;
    }

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
