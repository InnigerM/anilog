import {
    queryOptions,
    useMutation,
    UseMutationOptions,
    useQueryClient,
} from '@tanstack/react-query';
import { supabase } from '../utils';
import { Database } from 'database.types';
import { LatLng } from 'leaflet';

export type PlantResponse = Database['public']['Tables']['plants']['Row'];
export type ScannedPlant = ScanResponse & {
    location: LatLng | null;
    plant: PlantResponse;
};

export const getScansByUserId = (userId: number) =>
    queryOptions({
        queryKey: ['scans', userId],
        queryFn: async () => {
            try {
                const { data, error } = await supabase
                    .from('scans')
                    .select('*')
                    .eq('userId', userId);

                if (!data || error) throw new Error(`Scans couldn't be loaded`);

                const scans: ScannedPlant[] = [];
                for (const scan of data) {
                    if (scan.location) {
                        const { data } = await supabase
                            .from('plants')
                            .select('*')
                            .eq('id', scan.plantId)
                            .single();

                        if (data) {
                            const plant = {
                                ...scan,
                                location: scan.location
                                    ? new LatLng(
                                          (scan.location as any).coordinates[0],
                                          (scan.location as any).coordinates[1],
                                      )
                                    : null,
                                plant: data,
                            };

                            scans.push(plant);
                        }
                    }
                }

                return scans;
            } catch (e) {
                console.error(e);
                return [];
            }
        },
    });

export type CreateScanRequest = Database['public']['Tables']['scans']['Insert'];
export type ScanResponse = Database['public']['Tables']['scans']['Row'];

export function useCreateScanMutation(
    opts?: UseMutationOptions<ScanResponse, Error, CreateScanRequest>,
) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (scan) => {
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

export const getScansForUser = (userId: number) =>
    queryOptions({
        queryKey: ['scans', userId],
        queryFn: async () => {
            const { data } = await supabase
                .from('scans')
                .select('*, plants(*)')
                .eq('userId', userId)
                .order('created_at', { ascending: false });

            return data ?? null;
        },
    });
