import { supabase } from '@/lib/utils';
import { queryOptions } from '@tanstack/react-query';

export const getPlantByIdForUser = (id: string, userId: number) =>
    queryOptions({
        queryKey: ['plant', id, userId],
        queryFn: async () => {
            const { data } = await supabase
                .from('plants')
                .select('*, scans!inner(userId, imageUrl, created_at)')
                .eq('id', id)
                .eq('scans.userId', userId)
                .single();

            return data ?? null;
        },
    });
