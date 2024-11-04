import { supabase } from '@/lib/utils';
import { USER_LOCAL_STORAGE_KEY } from './user';
import { queryOptions } from '@tanstack/react-query';

const CORS_HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers':
        'authorization, x-client-info, apikey, content-type',
};

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
): Promise<void> => {
    const userString = localStorage.getItem(USER_LOCAL_STORAGE_KEY);
    if (!userString) {
        return;
    }
    const user = JSON.parse(userString);
    await fetch(
        'https://rgcbaftxplqejgurmxyx.supabase.co/functions/v1/update-leaderboard',
        {
            method: 'POST',
            body: JSON.stringify({ plantId, userId: user.id, isNewPlant }),
        },
    );
};
