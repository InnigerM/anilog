import {
    useMutation,
    UseMutationOptions,
    useQueryClient,
} from '@tanstack/react-query';
import { supabase } from '../utils';
import { Database } from 'database.types';

export type CreateScanRequest = Database['public']['Tables']['scans']['Insert'];
export type ScanResponse = Database['public']['Tables']['scans']['Row'];

export function useCreateScanMutation(
    opts?: UseMutationOptions<ScanResponse, Error, CreateScanRequest>,
) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (scan) => {
            console.log(scan);
            const { data, error } = await supabase
                .from('scans')
                .insert([
                    {
                        ...scan,
                        location: scan.location
                            ? `POINT(${(scan.location as any).lat} ${(scan.location as any).lng})`
                            : undefined,
                    },
                ])
                .select()
                .single();

            if (!data) throw new Error(`Scan couldn't be created`);

            return data;
        },
        onSuccess: ({ id }) => {
            queryClient.invalidateQueries({ queryKey: ['scans', id] });
        },
        onError: (error) => {
            console.error(error);
        },
        ...opts,
    });
}
