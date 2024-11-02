import { supabase } from '@/lib/utils';
import { queryOptions } from '@tanstack/react-query';

export const getPlantById = (id: string) =>
    queryOptions({
        queryKey: ['plant', id],
        queryFn: async () => {
            const { data } = await supabase
                .from('plants')
                .select()
                .eq('id', id)
                .single();

            return data ?? null;
        },
    });
