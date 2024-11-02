import { supabase } from '@/lib/utils';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { Database } from 'database.types';

export type SaveSpecialPlantRequest =
    Database['public']['Tables']['special-plants']['Insert'];
export type SpecialPlantResponse =
    Database['public']['Tables']['special-plants']['Row'];

export function useSpecialPlantMutation(
    opts?: UseMutationOptions<
        SpecialPlantResponse,
        Error,
        SaveSpecialPlantRequest
    >,
) {
    return useMutation({
        mutationFn: async (saveSpecialPlant) => {
            const { data: savedData, error } = await supabase
                .from('special-plants')
                .insert(saveSpecialPlant)
                .select()
                .single();
            if (error) {
                throw new Error(error.message);
            }
            return savedData;
        },
        onError: () => {},
        ...opts,
    });
}
