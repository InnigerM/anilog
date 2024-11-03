import { supabase } from '@/lib/utils';
import { queryOptions } from '@tanstack/react-query';

export const getPlantByIdForUser = (id: string, userId: number) =>
    queryOptions({
        queryKey: ['plant', id],
        queryFn: async () => {
            const { data } = await supabase
                .from('plants')
                .select('*, scans!inner(userId, imageUrl)')
                .eq('id', id)
                .eq('scans.userId', userId)
                .single();

            return data ?? null;
        },
    });
